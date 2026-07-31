import Stripe from 'stripe';
import config from '../../config';
import prisma from '../../utils/prisma';

const stripe = new Stripe(config.stripe_secret_key as string, {
  apiVersion: '2025-01-27.acacia',
});

const createPaymentIntent = async (bookingId: string) => {
  return null;
};

const handleWebhook = async (payload: Buffer, signature: string) => {
  return null;
};

export const PaymentService = {
  createPaymentIntent,
  handleWebhook,
};
