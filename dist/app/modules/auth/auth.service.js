"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.loginUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const generateToken_1 = __importDefault(require("../../utils/generateToken"));
const verifyToken_1 = __importDefault(require("../../utils/verifyToken"));
const prisma_1 = require("../../shared/prisma");
const loginUser = async (payload, socialLogin) => {
    //check is user data exist
    const userData = await prisma_1.prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
        },
    });
    // check is password correct
    const isCorrectPassword = socialLogin || (await bcrypt_1.default.compare(payload.password, userData.password));
    if (!isCorrectPassword) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Your password is not correct');
    }
    const userPayload = {
        id: userData.id,
        name: '',
        email: userData.email,
        role: userData.role,
    };
    const accessToken = (0, generateToken_1.default)(userPayload, config_1.default.jwt.jwtAccessToken, config_1.default.jwt.jwtExpiresIn);
    const refreshToken = (0, generateToken_1.default)(userPayload, config_1.default.jwt.refreshTokenSecret, config_1.default.jwt.refreshExpiresIn);
    return {
        accessToken,
        refreshToken,
    };
};
exports.loginUser = loginUser;
const refreshToken = async (token) => {
    let decodedData;
    try {
        decodedData = (0, verifyToken_1.default)(token, config_1.default.jwt.refreshTokenSecret);
    }
    catch (error) {
        if (error) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized');
        }
    }
    const userData = await prisma_1.prisma.user.findUniqueOrThrow({
        where: {
            email: decodedData?.email,
        },
    });
    console.log(userData);
    const userPayload = {
        id: userData.id,
        name: '', // Ensure the name property is included
        email: userData.email,
        role: userData.role,
    };
    const accessToken = (0, generateToken_1.default)(userPayload, config_1.default.jwt.jwtAccessToken, config_1.default.jwt.jwtExpiresIn);
    return {
        accessToken,
        refreshToken,
    };
};
exports.authService = {
    loginUser: exports.loginUser,
    refreshToken,
};
