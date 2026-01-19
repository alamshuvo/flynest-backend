"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const prisma_1 = require("../../shared/prisma");
const config_1 = __importDefault(require("../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const signup = async (payload) => {
    const { name, email, password, role } = payload;
    // Optional validation when use DTOS validation its cut 
    if (!name || !email || !password) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Name, email, and password are required');
    }
    // 409 – Conflict
    const existingUser = await prisma_1.prisma.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'User with this email already exists');
    }
    const password_Hash = bcrypt_1.default.hashSync(password, Number(config_1.default.bcrypt.bcryptSaltRounds) || 10);
    console.log(password_Hash);
    const user = await prisma_1.prisma.user.create({
        data: {
            name,
            email,
            password: password_Hash,
            role,
        },
    });
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    };
};
const getAllFormDb = async () => {
    const users = await prisma_1.prisma.user.findMany();
    return users;
};
const getMyProfile = async (userData) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: { email: userData.email },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        },
    });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    return user;
};
exports.UserService = {
    signup,
    getAllFormDb,
    getMyProfile
};
