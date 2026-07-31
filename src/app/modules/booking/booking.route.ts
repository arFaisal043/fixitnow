import { Router } from 'express';
import { BookingController } from './booking.controller';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';

const router = Router();

router.post('/', auth(Role.CUSTOMER), BookingController.createBooking);
router.get('/', auth(Role.CUSTOMER, Role.TECHNICIAN), BookingController.getMyBookings);
router.patch('/:id/status', auth(Role.TECHNICIAN), BookingController.updateBookingStatus);

export const BookingRoutes = router;
