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

