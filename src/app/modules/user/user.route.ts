import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middlewares/authMiddleware';
import { UserRole } from '@prisma/client';
import { userController } from './user.controller';
import { validateRequest } from '../../utils/validateRequest';
import { CreateUserDto } from '../../dtos/createUser.dto';


const route = express.Router();
 route.get('/', auth(UserRole.ADMIN), userController.getAllFromDB);

route.get(
  '/me',
  auth(UserRole.ADMIN, UserRole.STUDENT, UserRole.TEACHER),
  userController.getMyProfile,
);

// registration route
route.post('/signup',validateRequest(CreateUserDto),userController.insertUserIntoDB);
export const UserRoutes = route;