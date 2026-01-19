"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.classesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../../middlewares/authMiddleware"));
const client_1 = require("@prisma/client");
const class_controller_1 = require("./class.controller");
const validateRequest_1 = require("../../utils/validateRequest");
const createClass_dto_1 = require("../../dtos/createClass.dto");
const enrollStudent_dto_1 = require("../../dtos/enrollStudent.dto");
const route = express_1.default.Router();
route.get('/:id/students', class_controller_1.classController.getStudentsOfAClass);
route.post('/', (0, authMiddleware_1.default)(client_1.UserRole.ADMIN), (0, validateRequest_1.validateRequest)(createClass_dto_1.CreateClassDto), class_controller_1.classController.createClass);
route.post('/:id/enroll', (0, authMiddleware_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.TEACHER), (0, validateRequest_1.validateRequest)(enrollStudent_dto_1.EnrollStudentDto), class_controller_1.classController.enrollStudent);
exports.classesRoutes = route;
