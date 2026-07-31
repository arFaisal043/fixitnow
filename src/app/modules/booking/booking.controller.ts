import { Request, Response } from 'express';
import { BookingService } from './booking.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const customerId = req.user?.id as string;
  const result = await BookingService.createBooking({ ...req.body, customerId });
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
});

const getMyBookings = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id as string;
  const role = req.user?.role as string;
  const result = await BookingService.getMyBookings(userId, role);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bookings fetched successfully',
    data: result,
  });
});

const updateBookingStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const result = await BookingService.updateBookingStatus(id as string, status);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Booking status updated successfully',
    data: result,
  });
});

export const BookingController = {
  createBooking,
  getMyBookings,
  updateBookingStatus,
};
