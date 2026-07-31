import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.registerUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User registered successfully',
    data: {
      user: result.user,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    },
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken, accessToken, user } = await AuthService.loginUser(req.body);

  res.cookie('refreshToken', refreshToken, {
    secure: config.env === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully',
    data: {
      user,
      accessToken,
      refreshToken,
    },
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  const email = req.user?.email;
  const result = await AuthService.getMe(email as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User profile retrieved successfully',
    data: result,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  const result = await AuthService.refreshToken(refreshToken);
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Access token generated successfully',
    data: result,
  });
});

export const AuthController = {
  registerUser,
  loginUser,
  getMe,
  refreshToken,
};
