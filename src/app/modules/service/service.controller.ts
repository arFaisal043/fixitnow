import { Request, Response, NextFunction } from 'express';
import { ServiceService } from './service.service';

const getAllServices = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await ServiceService.getAllServices();
    res.status(200).json({
      success: true,
      message: 'Services fetched successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const createService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const technicianId = req.user?.id;
    const result = await ServiceService.createService({ ...req.body, technicianId });
    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const ServiceController = {
  getAllServices,
  createService,
};
