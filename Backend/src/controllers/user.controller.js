import { User } from '../models/user.model.js'

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
                message: 'Password not match'
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

export const changePassword = async (req, res) => {
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