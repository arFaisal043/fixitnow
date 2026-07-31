import { Router } from 'express';
import { PaymentController } from './payment.controller';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';
import express from 'express';

const router = Router();

router.post('/create-intent', auth(Role.CUSTOMER), PaymentController.createPaymentIntent);
router.post('/webhook', express.raw({ type: 'application/json' }), PaymentController.stripeWebhook);

export const PaymentRoutes = router;
