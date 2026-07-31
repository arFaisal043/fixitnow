import { Request, Response } from 'express';
import { PaymentService } from './payment.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createPaymentIntent = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.createPaymentIntent(req.body.bookingId);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Payment intent created',
    data: result,
  });
});

const stripeWebhook = catchAsync(async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;
  const result = await PaymentService.handleWebhook(req.body, sig);
  res.status(200).send(result);
});

export const PaymentController = {
  createPaymentIntent,
  stripeWebhook,
};
