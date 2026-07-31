import { Request, Response, NextFunction } from 'express';
import { BookingService } from './booking.service';

const createBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customerId = req.user?.id as string;
    const result = await BookingService.createBooking({ ...req.body, customerId });
    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getMyBookings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id as string;
    const role = req.user?.role as string;
    const result = await BookingService.getMyBookings(userId, role);
    res.status(200).json({
      success: true,
      message: 'Bookings fetched successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateBookingStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await BookingService.updateBookingStatus(id, status);
    res.status(200).json({
      success: true,
      message: 'Booking status updated successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const BookingController = {
  createBooking,
  getMyBookings,
  updateBookingStatus,
};
