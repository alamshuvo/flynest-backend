"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.classService = void 0;
const AppError_1 = __importDefault(require("../../error/AppError"));
const prisma_1 = require("../../shared/prisma");
const http_status_1 = __importDefault(require("http-status"));
const createClass = async (data) => {
    // check if class already exists by name
    const existingClass = await prisma_1.prisma.class.findFirst({
        where: { name: data.name },
    });
    console.log({ existingClass });
    if (existingClass) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Class already exists");
    }
    const newClass = await prisma_1.prisma.class.create({
        data: {
            name: data.name,
            section: data.section,
        }
    });
    return newClass;
};
const enrollStudent = async (classId, studentId) => {
    //Check class exists
    const existingClass = await prisma_1.prisma.class.findUnique({
        where: { id: classId },
    });
    if (!existingClass) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Class does not exist');
    }
    // Check student exists
    const existingStudent = await prisma_1.prisma.student.findUnique({
        where: { id: studentId },
    });
    if (!existingStudent) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Student does not exist');
    }
    // Check student already enrolled
    if (existingStudent.class_id) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'Student is already enrolled in a class');
    }
    // Enroll student (UPDATE student)
    const enrolledStudent = await prisma_1.prisma.student.update({
        where: { id: studentId },
        data: {
            class_id: classId,
        },
    });
    return enrolledStudent;
};
const getStudentsOfAClass = async (classId) => {
    // Check class exists
    const existingClass = await prisma_1.prisma.class.findUnique({
        where: { id: classId },
    });
    if (!existingClass) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Class does not exist');
    }
    // Get students of the class
    const students = await prisma_1.prisma.student.findMany({
        where: { class_id: classId },
        include: {
            class: true,
        }
    });
    return students;
};
exports.classService = {
    createClass,
    enrollStudent,
    getStudentsOfAClass
};
