import Stripe from 'stripe';
import config from '../../config';
import prisma from '../../utils/prisma';

const stripe = new Stripe(config.stripe_secret_key as string, {
  apiVersion: '2026-07-29.dahlia',
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
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, config.stripe_webhook_secret as string);
  } catch (err: any) {
    throw new Error(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const bookingId = paymentIntent.metadata.bookingId;

    await prisma.payment.update({
      where: { bookingId },
      data: {
        status: 'COMPLETED',
        transactionId: paymentIntent.id,
        paidAt: new Date(),
      },
    });

    await prisma.booking.update({
      where: { id: bookingId },
      data: { status: 'PAID' },
    });
  }

  return { received: true };
};

export const PaymentService = {
  createPaymentIntent,
  handleWebhook,
};
