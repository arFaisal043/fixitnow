import prisma from '../../utils/prisma';
import { BookingStatus, Role } from '@prisma/client';

const createBooking = async (payload: any) => {
  const booking = await prisma.booking.create({
    data: {
      customerId: payload.customerId,
      technicianId: payload.technicianId,
      serviceId: payload.serviceId,
      date: new Date(payload.date),
      timeSlot: payload.timeSlot,
    },
  });
  return booking;
};

const getMyBookings = async (userId: string, role: string) => {
  const whereCondition = role === Role.CUSTOMER ? { customerId: userId } : { technicianId: userId };
  const bookings = await prisma.booking.findMany({
    where: whereCondition,
    include: {
      customer: { select: { id: true, name: true, email: true } },
      technician: { select: { id: true, name: true, email: true } },
      service: true,
    },
  });
  return bookings;
};

const updateBookingStatus = async (bookingId: string, status: BookingStatus) => {
  const booking = await prisma.booking.update({
    where: { id: bookingId },
    data: { status },
  });
  return booking;
};

export const BookingService = {
  createBooking,
  getMyBookings,
  updateBookingStatus,
};
