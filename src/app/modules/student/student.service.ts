import AppError from "../../error/AppError";
import { prisma } from "../../shared/prisma";
import httpStatus from "http-status";
const createStudent = async (data: any) => {
  console.log({ data });
  // check if student already exists by name
  const existingStudent = await prisma.student.findFirst({
    where: { name: data.name },
  });
  console.log({ existingStudent });
  if (existingStudent) {
    throw new AppError(httpStatus.BAD_REQUEST, "Student already exists");
  }
  // check Class is exist
  const existingClass = await prisma.class.findFirst({
    where: { id: data.classId },
  });
  console.log({ existingClass });
  if (!existingClass) {
    throw new AppError(httpStatus.BAD_REQUEST, "Class does not exist");
  }
  const newStudent = await prisma.student.create({
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
  const students = await prisma.student.findMany({
    include: {
      class: true,
    },
  });
  return students;
};

const getSingleStudent = async (id: string) => {
    console.log(id);
  const student = await prisma.student.findUnique({
    where: { id },
    include: {
      class: true,
    },
  });
  console.log(student);
  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, "Student not found");
  }
  return student;
};
export const studentService = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
