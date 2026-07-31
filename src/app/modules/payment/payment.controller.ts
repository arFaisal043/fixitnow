import { Request, Response, NextFunction } from 'express';
import { PaymentService } from './payment.service';

const createPaymentIntent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await PaymentService.createPaymentIntent(req.body.bookingId);
    res.status(201).json({
      success: true,
      message: 'Payment intent created',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const stripeWebhook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sig = req.headers['stripe-signature'] as string;
    const result = await PaymentService.handleWebhook(req.body, sig);
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

export const PaymentController = {
  createPaymentIntent,
  stripeWebhook,
};
