import { Router } from 'express';
import { HomeRoutes } from '../modules/home/home.route';
import { authRoutes } from '../modules/auth/auth.route';



const router = Router();

const apiPrefix = '/api';

const moduleRoutes = [
  {
    path: '/',
    route: HomeRoutes,
  },
  {
    path:`${apiPrefix}/auth`,
    route: authRoutes,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

moduleRoutes.forEach((moduleRoute) => {
  router.use(moduleRoute.path, moduleRoute.route);
});

export default router;