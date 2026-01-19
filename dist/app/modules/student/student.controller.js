"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const student_service_1 = require("./student.service");
const createStudent = (0, catchAsync_1.default)(async (req, res) => {
    const data = req.body;
    const result = await student_service_1.studentService.createStudent(data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Student created Sucessfully by admin ",
        data: {
            result,
        },
    });
});
const getAllStudents = (0, catchAsync_1.default)(async (req, res) => {
    const result = await student_service_1.studentService.getAllStudents();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Student retrived Sucessfully ",
        data: {
            result,
        },
    });
});
const getSingleStudentt = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const result = await student_service_1.studentService.getSingleStudent(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Single Student retrived Sucessfully ",
        data: {
            result,
        },
    });
});
exports.studentController = {
    createStudent,
    getAllStudents,
    getSingleStudentt
};
