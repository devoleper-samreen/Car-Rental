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



    } catch (error) {

    }
}  