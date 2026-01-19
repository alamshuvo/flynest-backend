"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const auth_service_1 = require("./auth.service");
const loginUser = (0, catchAsync_1.default)(async (req, res) => {
    const data = req.body;
    console.log(data);
    const result = await auth_service_1.authService.loginUser(data);
    const { refreshToken } = result;
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Logged in successfully',
        data: {
            accessToken: result.accessToken,
        },
    });
});
const refreshToken = (0, catchAsync_1.default)(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await auth_service_1.authService.refreshToken(refreshToken);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Token refreshed and logged in successfully',
        data: result,
    });
});
exports.authController = {
    loginUser,
    refreshToken,
};
