import { Router } from 'express';
import { BookingController } from './booking.controller';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';
import validateRequest from '../../middlewares/validateRequest';
import { BookingValidation } from './booking.validation';

const router = Router();

router.post('/', auth(Role.CUSTOMER), validateRequest(BookingValidation.createBookingValidationSchema), BookingController.createBooking);
router.get('/', auth(Role.CUSTOMER, Role.TECHNICIAN), BookingController.getMyBookings);
router.patch('/:id/status', auth(Role.TECHNICIAN), validateRequest(BookingValidation.updateBookingStatusValidationSchema), BookingController.updateBookingStatus);

export const BookingRoutes = router;
