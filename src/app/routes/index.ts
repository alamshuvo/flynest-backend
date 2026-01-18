import { Router } from 'express';
import { HomeRoutes } from '../modules/home/home.route';
import { authRoutes } from '../modules/auth/auth.route';
import { UserRoutes } from '../modules/user/user.route';
import { studentRoutes } from '../modules/student/student.route';
import { classesRoutes } from '../modules/class/class.route';



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
  },
  {
    path:`${apiPrefix}/users`,
    route:UserRoutes
  },
  {
    path:`${apiPrefix}/students`,
    route:studentRoutes
  },
  {
    path:`${apiPrefix}/classes`,
    route:classesRoutes
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

moduleRoutes.forEach((moduleRoute) => {
  router.use(moduleRoute.path, moduleRoute.route);
});

export default router;