import { Request, Response, NextFunction } from 'express';
import { AdminService } from './admin.service';

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AdminService.getAllUsers();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateUserStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { isBanned } = req.body;
    const result = await AdminService.updateUserStatus(id, isBanned);
    res.status(200).json({
      success: true,
      message: 'User status updated successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const AdminController = {
  getAllUsers,
  updateUserStatus,
};
