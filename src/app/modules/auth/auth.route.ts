import { Router } from 'express';
import { AuthController } from './auth.controller';

import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';

const router = Router();

router.post('/register', validateRequest(AuthValidation.registerValidationSchema), AuthController.registerUser);
router.post('/login', validateRequest(AuthValidation.loginValidationSchema), AuthController.loginUser);
router.post('/refresh-token', AuthController.refreshToken);
router.get('/me', AuthController.getMe);

export const AuthRoutes = router;
