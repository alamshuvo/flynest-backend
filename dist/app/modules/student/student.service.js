"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentService = void 0;
const AppError_1 = __importDefault(require("../../error/AppError"));
const prisma_1 = require("../../shared/prisma");
const http_status_1 = __importDefault(require("http-status"));
const createStudent = async (data) => {
    console.log({ data });
    // check if student already exists by name
    const existingStudent = await prisma_1.prisma.student.findFirst({
        where: { name: data.name },
    });
    console.log({ existingStudent });
    if (existingStudent) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Student already exists");
    }
    // check Class is exist
    const existingClass = await prisma_1.prisma.class.findFirst({
        where: { id: data.classId },
    });
    console.log({ existingClass });
    if (!existingClass) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Class does not exist");
    }
    const newStudent = await prisma_1.prisma.student.create({
        data: {
            name: data.name,
            age: data.age,
            class_id: data.class_id,
        },
    });
    return {
        ...newStudent,
        class: existingClass,
    };
};
const getAllStudents = async () => {
    const students = await prisma_1.prisma.student.findMany({
        include: {
            class: true,
        },
    });
    return students;
};
const getSingleStudent = async (id) => {
    console.log(id);
    const student = await prisma_1.prisma.student.findUnique({
        where: { id },
        include: {
            class: true,
        },
    });
    console.log(student);
    if (!student) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Student not found");
    }
    return student;
};
exports.studentService = {
    createStudent,
    getAllStudents,
    getSingleStudent,
};
