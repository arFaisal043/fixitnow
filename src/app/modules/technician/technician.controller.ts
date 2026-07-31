import { Request, Response, NextFunction } from 'express';
import { TechnicianService } from './technician.service';

const getAllTechnicians = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await TechnicianService.getAllTechnicians();
    res.status(200).json({
      success: true,
      message: 'Technicians fetched successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getTechnicianById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await TechnicianService.getTechnicianById(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Technician fetched successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await TechnicianService.updateProfile(req.user?.id as string, req.body);
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateAvailability = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await TechnicianService.updateAvailability(req.user?.id as string, req.body);
    res.status(200).json({
      success: true,
      message: 'Availability updated successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const TechnicianController = {
  getAllTechnicians,
  getTechnicianById,
  updateProfile,
  updateAvailability,
};
