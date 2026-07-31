import { Router } from 'express';
import { ServiceController } from './service.controller';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceValidation } from './service.validation';

const router = Router();

router.get('/', ServiceController.getAllServices);
router.post('/', auth(Role.TECHNICIAN), validateRequest(ServiceValidation.createServiceValidationSchema), ServiceController.createService);

export const ServiceRoutes = router;
