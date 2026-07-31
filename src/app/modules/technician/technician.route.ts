import { Router } from 'express';
import { TechnicianController } from './technician.controller';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';

const router = Router();

router.get('/', TechnicianController.getAllTechnicians);
router.get('/:id', TechnicianController.getTechnicianById);
router.patch('/profile', auth(Role.TECHNICIAN), TechnicianController.updateProfile);
router.patch('/availability', auth(Role.TECHNICIAN), TechnicianController.updateAvailability);

export const TechnicianRoutes = router;
