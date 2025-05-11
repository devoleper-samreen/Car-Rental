import Stripe from 'stripe';

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
    throw new Error('Stripe secret key is not defined');
}

export const stripe = new Stripe(secretKey);