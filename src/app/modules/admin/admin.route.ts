import { Router } from 'express';
import { AdminController } from './admin.controller';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';

const router = Router();

router.get('/users', auth(Role.ADMIN), AdminController.getAllUsers);
router.patch('/users/:id/status', auth(Role.ADMIN), AdminController.updateUserStatus);

export const AdminRoutes = router;
