import { Admin } from "../models/admin.model.js";
import { generateToken } from "../utils/jwt.js";
import { User } from "../models/user.model.js";
import { Booking } from "../models/booking.model.js";

export const registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }

        const isAdminExist = await Admin.findOne({ email })

        if (isAdminExist) {
            return res.status(400).json({
                success: false,
                message: 'Admin already exists'
            })
        }

        const admin = await Admin.create({
            name,
            email,
            password,
        })

        if (!admin) {
            return res.status(400).json({
                success: false,
                message: 'Admin not created'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Admin created successfully',
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                phone: admin.phone,
                accessToken: generateToken(admin)
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}

export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }

        const isAdminExist = await Admin.findOne({ email })

        if (!isAdminExist) {
            return res.status(400).json({
                success: false,
                message: 'Admin not found'
            })
        }

        const isPasswordMatch = await isAdminExist.matchPassword(password)

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: 'Password is incorrect'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Admin logged in successfully',
            admin: {
                id: isAdminExist._id,
                name: isAdminExist.name,
                email: isAdminExist.email,
                phone: isAdminExist.phone,
                accessToken: generateToken(isAdminExist)
            }
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "error while logging"
        })

    }
}

export const updatePassword = async (req, res) => {
    try {
        console.log('I am entering updatePassword');
        
        const { currPassword, newPassword } = req.body
        console.log("currPassword:", currPassword, 'newPassword:', newPassword);

        if (!currPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }

        const user = await Admin.findById(req.admin._id)

        const isMatched = await user.matchPassword(currPassword)

        if (!isMatched) {
            return res.status(400).json({
                success: false,
                message: "current password is not correct"
            })
        }

        user.password = newPassword
        await user.save()

        return res.status(200).json({
            success: false,
            message: "Password updated successfully"
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}

export const updatedProfile = async (req, res) => {
    try {
        console.log('I am entering updatedProfile');

        const { name, email, phone } = req.body
        console.log("Profile:", name, email, phone);

        if (!name || !email || !phone) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }

        //check given email is not resigistered on portel yet except if it is current user email

        const isEmailExist = await Admin.findOne({
            email,
            _id: { $ne: req.admin._id }
        });

        if (isEmailExist) {
            return res.status(400).json({
                success: false,
                message: "Email already in use by another user."
            });
        }

        const admin = await Admin.findById(req.admin._id)

        if (!admin) {
            return res.status(400).json({
                success: false,
                message: 'Admin not found'
            })
        }

        admin.name = name
        admin.email = email
        admin.phone = phone

        await admin.save()

        return res.status(200).json({
            success: true,
            message: 'Admin updated successfully',
            admin
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}

export const getAdminProfile = async (req, res) => {
    try {

        const admin = await Admin.findById(req.admin._id).select('-password -__v')

        if (!admin) {
            return res.status(400).json({
                success: false,
                message: 'Admin not found'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Admin fetched successfully',
            admin
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })

    }
}

export const getAllUsers = async (req, res) => {
    try {
        console.log('I am entering getAllUsers');

        const users = await User.find().select('-password -__v')

        if (!users || users.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No users found'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Users fetched successfully',
            users
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
        
    }
}

export const banUser = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required'
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        user.status = "Banned";
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'User banned successfully',
            user
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        });
    }
}

export const getAllBookings = async (req, res) => {
    try {
        //carId AND userId KO POPULATE KARNA HAIN
        const bookings = await Booking.find()
            .populate('carId', 'name')
            .populate('userId', 'name');

        if (!bookings || bookings.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No bookings found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Bookings fetched successfully',
            bookings
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        });
    }
}

export const changeBookingStatus = async (req, res) => {
    try {
        console.log('I am entering changeBookingStatus');
        const { bookingId } = req.params;
        const { status } = req.body;

        if (!bookingId || !status) {
            return res.status(400).json({
                success: false,
                message: 'Booking ID and status are required'
            });
        }

        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        booking.status = status;
        await booking.save();

        return res.status(200).json({
            success: true,
            message: 'Booking status updated successfully',
            booking
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        });
    }

}

