"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const user_service_1 = require("./user.service");
const insertUserIntoDB = (0, catchAsync_1.default)(async (req, res) => {
    const data = req.body;
    console.log(data);
    const result = await user_service_1.UserService.signup(data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "User created successfully",
        data: result,
    });
});
const getAllFromDB = (0, catchAsync_1.default)(async (req, res) => {
    const result = await user_service_1.UserService.getAllFormDb();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User retrieval successfully",
        data: result,
    });
});
const getMyProfile = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    console.log(user);
    const result = await user_service_1.UserService.getMyProfile(user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'My Profile data fetched successfully',
        data: result,
    });
});
exports.userController = {
    insertUserIntoDB,
    getAllFromDB,
    getMyProfile
};
