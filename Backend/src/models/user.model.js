import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Active', 'Banned'],
        default: 'Active'
    }
},
    {
        timestamps: true
    });

export const User = mongoose.model('User', userSchema);
