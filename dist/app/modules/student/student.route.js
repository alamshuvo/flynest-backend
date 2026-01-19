"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("./student.controller");
const authMiddleware_1 = __importDefault(require("../../middlewares/authMiddleware"));
const client_1 = require("@prisma/client");
const validateRequest_1 = require("../../utils/validateRequest");
const createStudent_dto_1 = require("../../dtos/createStudent.dto");
const route = express_1.default.Router();
route.get('/', (0, authMiddleware_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.TEACHER), student_controller_1.studentController.getAllStudents);
route.get('/:id', student_controller_1.studentController.getSingleStudentt);
route.post('/', (0, authMiddleware_1.default)(client_1.UserRole.ADMIN), (0, validateRequest_1.validateRequest)(createStudent_dto_1.CreateStudentDto), student_controller_1.studentController.createStudent);
exports.studentRoutes = route;
