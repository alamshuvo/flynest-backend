import express from 'express';
import auth from '../../middlewares/authMiddleware';
import { UserRole } from '@prisma/client';
import { classController } from './class.controller';


const route = express.Router();
route.get('/:id/students',classController.getStudentsOfAClass)
route.post('/',auth(UserRole.ADMIN) ,classController.createClass);
route.post('/:id/enroll',auth(UserRole.ADMIN,UserRole.TEACHER) ,classController.enrollStudent);


export const classesRoutes = route;