import express from 'express';
import { studentController } from './student.controller';
import auth from '../../middlewares/authMiddleware';
import { UserRole } from '@prisma/client';
import { validateRequest } from '../../utils/validateRequest';
import { CreateStudentDto } from '../../dtos/createStudent.dto';


const route = express.Router();
route.get('/',auth(UserRole.ADMIN,UserRole.TEACHER), studentController.getAllStudents);
route.get('/:id',studentController.getSingleStudentt);
route.post('/',auth(UserRole.ADMIN) ,validateRequest(CreateStudentDto),studentController.createStudent);


export const studentRoutes = route;