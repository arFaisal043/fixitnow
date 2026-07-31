import { Router } from 'express';

const router = Router();

import { AuthRoutes } from '../modules/auth/auth.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { CategoryRoutes } from '../modules/category/category.route';
import { ServiceRoutes } from '../modules/service/service.route';
import { TechnicianRoutes } from '../modules/technician/technician.route';
import { BookingRoutes } from '../modules/booking/booking.route';
import { PaymentRoutes } from '../modules/payment/payment.route';
import { ReviewRoutes } from '../modules/review/review.route';

const moduleRoutes = [
  { path: '/auth', route: AuthRoutes },
  { path: '/admin', route: AdminRoutes },
  { path: '/categories', route: CategoryRoutes },
  { path: '/services', route: ServiceRoutes },
  { path: '/technicians', route: TechnicianRoutes },
  { path: '/bookings', route: BookingRoutes },
  { path: '/payments', route: PaymentRoutes },
  { path: '/reviews', route: ReviewRoutes }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
