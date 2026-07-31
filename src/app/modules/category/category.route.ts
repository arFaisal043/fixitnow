import { Router } from 'express';
import { CategoryController } from './category.controller';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';

const router = Router();

router.get('/', CategoryController.getAllCategories);
router.post('/', auth(Role.ADMIN), CategoryController.createCategory);

export const CategoryRoutes = router;
