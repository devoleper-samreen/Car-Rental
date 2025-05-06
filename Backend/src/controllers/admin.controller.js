import { Admin } from "../models/admin.model.js";
import { generateToken } from "../utils/jwt.js";

export const registerAdmin = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body

        if (!name || !email || !password || !phone) {
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
            phone
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
        const { currPassword, newPassword } = req.body

        if (!currPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }

        const user = await Admin.findById(req.admin._id)

        const isMatched = await user.matchPassword(currPassword)

        if (!isMatched) {
            return req.status(400).json({
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

