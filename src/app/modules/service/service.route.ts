import { Router } from 'express';
import { ServiceController } from './service.controller';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';

const router = Router();

router.get('/', ServiceController.getAllServices);
router.post('/', auth(Role.TECHNICIAN), ServiceController.createService);

export const ServiceRoutes = router;
