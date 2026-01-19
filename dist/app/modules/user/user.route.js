"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../../middlewares/authMiddleware"));
const client_1 = require("@prisma/client");
const user_controller_1 = require("./user.controller");
const validateRequest_1 = require("../../utils/validateRequest");
const createUser_dto_1 = require("../../dtos/createUser.dto");
const route = express_1.default.Router();
route.get('/', (0, authMiddleware_1.default)(client_1.UserRole.ADMIN), user_controller_1.userController.getAllFromDB);
route.get('/me', (0, authMiddleware_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.STUDENT, client_1.UserRole.TEACHER), user_controller_1.userController.getMyProfile);
// registration route
route.post('/signup', (0, validateRequest_1.validateRequest)(createUser_dto_1.CreateUserDto), user_controller_1.userController.insertUserIntoDB);
exports.UserRoutes = route;
