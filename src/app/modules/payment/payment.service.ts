import Stripe from 'stripe';
import config from '../../config';
import prisma from '../../utils/prisma';

const stripe = new Stripe(config.stripe_secret_key as string, {
  apiVersion: '2025-01-27.acacia',
});

const createPaymentIntent = async (bookingId: string) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { service: true },
  });

  if (!booking || booking.status !== 'ACCEPTED') {
    throw new Error('Booking is not ready for payment');
  }

  const amount = booking.service.price * 100; // in cents
  
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
    metadata: { bookingId },
  });

  const payment = await prisma.payment.create({
    data: {
      bookingId,
      amount: booking.service.price,
      method: 'Stripe',
    },
  });

  return {
    clientSecret: paymentIntent.client_secret,
    paymentId: payment.id,
  };
};

const handleWebhook = async (payload: Buffer, signature: string) => {
  return null;
};

export const PaymentService = {
  createPaymentIntent,
  handleWebhook,
};
