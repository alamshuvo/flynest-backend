"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const validateRequest_1 = require("../../utils/validateRequest");
const login_dto_1 = require("../../dtos/login.dto");
const route = express_1.default.Router();
route.post('/login', (0, validateRequest_1.validateRequest)(login_dto_1.LoginDto), auth_controller_1.authController.loginUser);
route.post('/refresh-token', auth_controller_1.authController.refreshToken);
exports.authRoutes = route;
