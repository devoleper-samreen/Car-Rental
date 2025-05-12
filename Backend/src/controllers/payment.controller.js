import { Booking } from '../models/booking.model.js'
import { stripe } from '../utils/stripe.js'


//create payment intent

export const createPaymentIntent = async (req, res) => {
    const { bookingId } = req.body

    if (!bookingId) {
        return res.status(400).json({
            success: false,
            message: 'Booking ID is required'
        })
    }

    const booking = await Booking.findById(bookingId).populate('carId')

    if (!booking) {
        return res.status(404).json({
            success: false,
            message: 'Booking not found'
        })
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount: booking.totalAmount * 100,
        currency: 'usd',
        metadata: {
            bookingId: booking._id.toString(),
            carId: booking.carId._id.toString(),
            userId: req.user._id.toString()
        }
    })

    return res.status(200).json({
        success: true,
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret
    })
}

//confirem payment
export const confirmPayment = async (req, res) => {
    try {
        const { bookingId, paymentIntentId } = req.body

        if (!bookingId || !paymentIntentId) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }



    } catch (error) {

    }
}