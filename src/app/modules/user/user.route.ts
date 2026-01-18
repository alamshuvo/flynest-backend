import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middlewares/authMiddleware';
import { UserRole } from '@prisma/client';
import { userController } from './user.controller';


const route = express.Router();
 route.get('/', auth(UserRole.ADMIN), userController.getAllFromDB);

route.get(
  '/me',
  auth(UserRole.ADMIN, UserRole.STUDENT, UserRole.TEACHER),
  userController.getMyProfile,
);

// registration route
route.post('/signup',userController.insertUserIntoDB);
export const UserRoutes = route;