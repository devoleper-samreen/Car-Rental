import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized or Token expired'
            })
        }

        const user = await User.findById(decoded.id);
        req.user = user;
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: 'Unauthorized or Token expired'
        })

    }
}