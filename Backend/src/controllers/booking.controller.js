import { Booking } from "../models/booking.model.js";
import { Car } from "../models/car.model.js";

export const createBooking = async (req, res) => {
    try {
        console.log(req.user);
        console.log(req.body);

        const userId = req.user._id;

        const { pickupDate, pickupTime, pickupLocation, dropoffDate, dropoffTime, dropoffLocation, totalAmount, carId } = req.body;

        const start = new Date(pickupDate);
        const end = new Date(dropoffDate);

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
                    pickupDate: { $lte: end },
                    dropoffDate: { $gte: start }
                },
                {
                    pickupDate: { $gte: start, $lte: end },
                    dropoffDate: { $gte: start, $lte: end }
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
            pickupDate,
            dropoffDate,
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
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Booking ID is required"
            });
        }

        const booking = await Booking.findById(id).populate("carId");

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        return res.status(200).json({
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

export const getUserBookings = async (req, res) => {
    try {

        const userId = req.user._id;

        const bookings = await Booking.find({ userId }).populate("carId");

        if (!bookings) {
            return res.status(404).json({
                success: false,
                message: "No bookings found"
            });
        }

        return res.status(200).json({
            success: true,
            data: bookings
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
}

export const updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatus = ["pending", "confirmed", "cancelled", "completed"];

        if (!validStatus.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status"
            });
        }

        const booking = await Booking.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        return res.status(200).json({
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

export const cancelBooking = async (req, res) => {
    try {

    } catch (error) {

    }
}