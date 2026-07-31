import { Router } from 'express';

const router = Router();

import { AuthRoutes } from '../modules/auth/auth.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { CategoryRoutes } from '../modules/category/category.route';

const moduleRoutes = [
  { path: '/auth', route: AuthRoutes },
  { path: '/admin', route: AdminRoutes },
  { path: '/categories', route: CategoryRoutes }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
