import { Router } from 'express';
import { CategoryController } from './category.controller';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryValidation } from './category.validation';

const router = Router();

router.get('/', CategoryController.getAllCategories);
router.post('/', auth(Role.ADMIN), validateRequest(CategoryValidation.createCategoryValidationSchema), CategoryController.createCategory);

export const CategoryRoutes = router;
