import mongoose from 'mongoose'

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add car name']
    },
    category: {
        type: String,
        enum: ['hatchback', 'sedan', 'suv'],
        required: true
    },
    brand: {
        type: String,
        required: [true, 'Please add brand name']
    },
    model: {
        type: String,
        required: [true, 'Please add model']
    },
    year: {
        type: Number,
        required: [true, 'Please add year']
    },
    pricePerDay: {
        type: Number,
        required: [true, 'Please add price per day']
    },
    image: {
        type: String,
        required: [true, 'Please add car image']
    },
    features: [{
        type: String
    }],
    transmission: {
        type: String,
        enum: ['automatic', 'manual'],
        require: true
    },
    fuelType: {
        type: String,
        enum: ['petrol', 'diesel', 'electric', 'hybrid'],
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    isAvaible: {
        type: Boolean,
        default: true
    }
}, { timestamps: true }
)

export const Car = mongoose.model('Car', carSchema);