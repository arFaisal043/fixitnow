import { Request, Response } from 'express';
import { TechnicianService } from './technician.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const getAllTechnicians = catchAsync(async (req: Request, res: Response) => {
  const result = await TechnicianService.getAllTechnicians();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Technicians fetched successfully',
    data: result,
  });
});

const getTechnicianById = catchAsync(async (req: Request, res: Response) => {
  const result = await TechnicianService.getTechnicianById(req.params.id as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Technician fetched successfully',
    data: result,
  });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await TechnicianService.updateProfile(req.user?.id as string, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Profile updated successfully',
    data: result,
  });
});

const updateAvailability = catchAsync(async (req: Request, res: Response) => {
  const result = await TechnicianService.updateAvailability(req.user?.id as string, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Availability updated successfully',
    data: result,
  });
});

export const TechnicianController = {
  getAllTechnicians,
  getTechnicianById,
  updateProfile,
  updateAvailability,
};
