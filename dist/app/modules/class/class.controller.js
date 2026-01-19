"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.classController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const class_service_1 = require("./class.service");
const createClass = (0, catchAsync_1.default)(async (req, res) => {
    const data = req.body;
    const result = await class_service_1.classService.createClass(data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Class created Sucessfully",
        data: {
            result,
        },
    });
});
const enrollStudent = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const studentId = req.body.student_id;
    console.log(id, studentId);
    const result = await class_service_1.classService.enrollStudent(id, studentId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "enroll a student in a class ",
        data: {
            result,
        },
    });
});
const getStudentsOfAClass = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await class_service_1.classService.getStudentsOfAClass(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "get all students of a class ",
        data: {
            result,
        },
    });
});
exports.classController = {
    createClass,
    enrollStudent,
    getStudentsOfAClass
};
