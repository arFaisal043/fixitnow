import { Router } from 'express';
import { ReviewController } from './review.controller';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';

const router = Router();

router.post('/', auth(Role.CUSTOMER), ReviewController.createReview);

export const ReviewRoutes = router;
