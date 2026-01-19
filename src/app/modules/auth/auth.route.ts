import express from 'express';
import { authController } from './auth.controller';
import { validateRequest } from '../../utils/validateRequest';
import { LoginDto } from '../../dtos/login.dto';

const route = express.Router();
route.post('/login',validateRequest(LoginDto), authController.loginUser);
route.post('/refresh-token', authController.refreshToken);

export const authRoutes = route;