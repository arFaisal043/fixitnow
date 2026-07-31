import { Request, Response } from 'express';
import { ServiceService } from './service.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceService.getAllServices();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Services fetched successfully',
    data: result,
  });
});

const createService = catchAsync(async (req: Request, res: Response) => {
  const technicianId = req.user?.id;
  const result = await ServiceService.createService({ ...req.body, technicianId });
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Service created successfully',
    data: result,
  });
});

export const ServiceController = {
  getAllServices,
  createService,
};
