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