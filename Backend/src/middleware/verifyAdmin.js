import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model.js";

export const verifyAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token not provided'
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized or Token expired'
            })
        }

        const admin = await Admin.findById(decoded.id);
        req.admin = admin;
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: 'Unauthorized or Token expired'
        })

    }
}