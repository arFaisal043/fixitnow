import { z } from 'zod';
import { BookingStatus } from '@prisma/client';

const createBookingValidationSchema = z.object({
  body: z.object({
    technicianId: z.string(),
    serviceId: z.string(),
    date: z.string(),
    timeSlot: z.string(),
  }),
});

const updateBookingStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([
      BookingStatus.REQUESTED,
      BookingStatus.ACCEPTED,
      BookingStatus.DECLINED,
      BookingStatus.PAID,
      BookingStatus.IN_PROGRESS,
      BookingStatus.COMPLETED,
    ]),
  }),
});

export const BookingValidation = {
  createBookingValidationSchema,
  updateBookingStatusValidationSchema,
};
