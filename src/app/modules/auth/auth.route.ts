import { Router } from 'express';
import { AuthController } from './auth.controller';

import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';

import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';

const router = Router();

router.post('/register', validateRequest(AuthValidation.registerValidationSchema), AuthController.registerUser);
router.post('/login', validateRequest(AuthValidation.loginValidationSchema), AuthController.loginUser);
router.post('/refresh-token', AuthController.refreshToken);
router.get('/me', auth(Role.CUSTOMER, Role.TECHNICIAN, Role.ADMIN), AuthController.getMe);

export const AuthRoutes = router;
