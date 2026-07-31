import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import config from '../../config';

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthService.registerUserIntoDB(req.body);
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken, accessToken, user } = await AuthService.loginUser(req.body);

    res.cookie('refreshToken', refreshToken, {
      secure: config.env === 'production',
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      data: {
        user,
        token: accessToken,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const result = await AuthService.getMe(req.user?.email);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully',
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

export const AuthController = {
  registerUser,
  loginUser,
  getMe,
};
