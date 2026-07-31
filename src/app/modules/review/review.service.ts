import prisma from '../../utils/prisma';
import { BookingStatus } from '@prisma/client';

const createReview = async (payload: { bookingId: string; rating: number; comment: string }) => {
  const booking = await prisma.booking.findUnique({
    where: { id: payload.bookingId },
  });

  if (!booking || booking.status !== BookingStatus.COMPLETED) {
    throw new Error('Can only review completed bookings');
  }

  const review = await prisma.review.create({
    data: payload,
  });

  return review;
};

export const ReviewService = {
  createReview,
};
