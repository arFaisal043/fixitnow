import { z } from 'zod';
import { BookingStatus } from '@prisma/client';

const createBookingValidationSchema = z.object({
  body: z.object({
    technicianId: z.string({ required_error: 'Technician ID is required' }),
    serviceId: z.string({ required_error: 'Service ID is required' }),
    date: z.string({ required_error: 'Date is required' }),
    timeSlot: z.string({ required_error: 'Time slot is required' }),
  }),
});

const updateBookingStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum(
      [
        BookingStatus.REQUESTED,
        BookingStatus.ACCEPTED,
        BookingStatus.DECLINED,
        BookingStatus.PAID,
        BookingStatus.IN_PROGRESS,
        BookingStatus.COMPLETED,
      ],
      { required_error: 'Status is required' }
    ),
  }),
});

export const BookingValidation = {
  createBookingValidationSchema,
  updateBookingStatusValidationSchema,
};
