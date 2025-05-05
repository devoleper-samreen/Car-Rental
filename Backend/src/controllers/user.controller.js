import { User } from '../models/user.model.js'
import { generateToken } from '../utils/jwt.js'

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body

        if (!name || !email || !password || !phone) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }

        const existedUser = await User.findOne({ email })

        if (existedUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            })
        }

        const user = await User.create({
            name,
            email,
            password,
            phone
        })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not created'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'User created successfully',
            userData: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                acessToken: generateToken(user)
            }
        })



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })

    }
}

export const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }

        const isUserExist = await User.findOne({ email })

        if (!isUserExist) {
            return res.status(400).json({
                success: false,
                message: 'User not found'
            })
        }

        const isPasswordMatch = await isUserExist.matchPassword(password)

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: 'Password is incorrect'
            })
        }

        //check user banned or not
        if (isUserExist.status === 'Banned') {
            return res.status(400).json({
                success: false,
                message: 'User is banned'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            userData: {
                id: isUserExist._id,
                name: isUserExist.name,
                email: isUserExist.email,
                phone: isUserExist.phone,
                acessToken: generateToken(isUserExist)
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
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

        const user = await User.findById(req.user._id)

        const isPasswordMatch = await user.matchPassword(currPassword)

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: 'Password not match'
            })
        }

        user.password = newPassword
        await user.save()


        return res.status(200).json({
            success: true,
            message: 'Password changed successfully',

        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })

    }
}

export const updateProfile = async (req, res) => {
    try {
        const { name, email, phone } = req.body

        if (!name || !email || !phone) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }

        //check given email is not resigistered on portel yet except if it is current user email

        const isEmailExist = await User.findOne({
            email,
            _id: { $ne: req.user._id }
        });

        if (isEmailExist) {
            return res.status(400).json({
                success: false,
                message: "Email already in use by another user."
            });
        }

        const user = await User.findById(req.user._id)

        user.name = name
        user.email = email
        user.phone = phone
        await user.save()

        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })

    }
}