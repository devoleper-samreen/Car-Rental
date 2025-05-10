import { Booking } from "../models/booking.model.js";
import { Car } from "../models/car.model.js";

export const createBooking = async (req, res) => {
    try {

        const userId = req.user._id;
        const carId = req.params.id;

        const { startDate, endDate, pickupTime, dropoffTime, pickupLocation, dropoffLocation, totalAmount } = req.body;

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return res.status(400).json({
                success: false,
                message: "Invalid date format"
            });
        }

        if (start > end) {
            return res.status(400).json({
                success: false,
                message: "Start date must be before end date"
            });
        }

        const car = await Car.findById(carId);

        if (!car) {
            return res.status(404).json({
                success: false,
                message: "Car not found"
            });
        }

        if (car.isAvaible === false) {
            return res.status(400).json({
                success: false,
                message: "Car is not available"
            });
        }

        const isBooked = await Booking.findOne({
            carId,
            status: { $nin: ["cancelled", "completed"] },
            $or: [
                {
                    startDate: { $lte: end },
                    endDate: { $gte: start }
                },
                {
                    startDate: { $gte: start, $lte: end },
                    endDate: { $gte: start, $lte: end }
                }
            ]
        });

        if (isBooked) {
            return res.status(400).json({
                success: false,
                message: "Car is already booked for the selected dates"
            });
        }

        const booking = await Booking.create({
            carId,
            userId,
            startDate,
            endDate,
            pickupTime,
            dropoffTime,
            pickupLocation,
            dropoffLocation,
            totalAmount
        });

        return res.status(201).json({
            success: true,
            data: booking
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
}

export const getBookingById = async (req, res) => {
    try {

    } catch (error) {

    }
}

export const getUserBookings = async (req, res) => {
    try {

    } catch (error) {

    }
}

export const updateBookingStatus = async (req, res) => {
    try {

    } catch (error) {

    }
}

export const cancelBooking = async (req, res) => {
    try {

    } catch (error) {

    }
}