// import { Booking } from '../models/booking.model.js'
// import { stripe } from '../utils/stripe.js'


// //create payment intent
// export const createPaymentIntent = async (req, res) => {
//     const { bookingId } = req.body

//     if (!bookingId) {
//         return res.status(400).json({
//             success: false,
//             message: 'Booking ID is required'
//         })
//     }

//     const booking = await Booking.findById(bookingId).populate('carId')

//     if (!booking) {
//         return res.status(404).json({
//             success: false,
//             message: 'Booking not found'
//         })
//     }

//     const paymentIntent = await stripe.paymentIntents.create({
//         amount: booking.totalAmount * 100,
//         currency: 'usd',
//         metadata: {
//             bookingId: booking._id.toString(),
//             carId: booking.carId._id.toString(),
//             userId: req.user._id.toString()
//         }
//     })

//     return res.status(200).json({
//         success: true,
//         paymentIntentId: paymentIntent.id,
//         clientSecret: paymentIntent.client_secret
//     })
// }

// //confirem payment
// export const confirmPayment = async (req, res) => {
//     try {
//         const { bookingId, paymentIntentId } = req.body

//         if (!bookingId || !paymentIntentId) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'All fields are required'
//             })
//         }

//         const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

//         switch (paymentIntent.status) {
//             case 'succeeded':
//                 const booking = await Booking.findById(bookingId)
//                     .populate('carId')
//                     .populate('userId')

//                 booking.status = 'confirmed'
//                 await booking.save()

//                 const recipt = await generateRecipt(booking, paymentIntent)

//                 return res.status(200).json({
//                     success: true,
//                     message: 'Payment confirmed successfully',
//                     booking,
//                     recipt
//                 })

//             case 'processing':
//                 return res.status(202).json({
//                     success: true,
//                     message: 'Your payment is still processing'
//                 })

//             case 'requires_payment_method':
//                 return res.status(400).json({
//                     success: false,
//                     message: 'Payment failed'
//                 })

//             default:
//                 return res.status(400).json({
//                     success: false,
//                     message: `Payment failed with status: ${paymentIntent.status}. Please try again`
//                 })

//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             success: false,
//             message: 'Something went wrong'
//         })

//     }
// }

import { Booking } from '../models/booking.model.js'
import { stripe } from '../utils/stripe.js'

// ✅ Create Checkout Session (Redirect to Stripe UI)
export const createCheckoutSession = async (req, res) => {
    const { bookingId } = req.body;

    if (!bookingId) {
        return res.status(400).json({
            success: false,
            message: 'Booking ID is required',
        });
    }

    const booking = await Booking.findById(bookingId).populate('carId');

    if (!booking) {
        return res.status(404).json({
            success: false,
            message: 'Booking not found',
        });
    }

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: booking.carId.title || 'Car Rental',
                            description: `Booking ID: ${booking._id}`,
                        },
                        unit_amount: booking.totalAmount * 100, // amount in cents
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                bookingId: booking._id.toString(),
                carId: booking.carId._id.toString(),
                userId: req.user._id.toString(),
            },
            success_url: `http://localhost:3000/payment-success?bookingId=${booking._id}`,
            cancel_url: `http://localhost:3000/payment-cancel`,
        });

        return res.status(200).json({
            success: true,
            url: session.url, // frontend will redirect user to this
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Stripe session creation failed',
        });
    }
};
