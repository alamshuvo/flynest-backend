import express from 'express';
import auth from '../../middlewares/authMiddleware';
import { UserRole } from '@prisma/client';
import { classController } from './class.controller';
import { validateRequest } from '../../utils/validateRequest';
import { CreateClassDto } from '../../dtos/createClass.dto';
import { EnrollStudentDto } from '../../dtos/enrollStudent.dto';


const route = express.Router();
route.get('/:id/students',classController.getStudentsOfAClass)
route.post('/',auth(UserRole.ADMIN) ,validateRequest(CreateClassDto),classController.createClass);
route.post('/:id/enroll',auth(UserRole.ADMIN,UserRole.TEACHER) ,validateRequest(EnrollStudentDto),classController.enrollStudent);


export const classesRoutes = route;