import AppError from "../../error/AppError";
import { prisma } from "../../shared/prisma";
import httpStatus from "http-status";
const createClass = async(data:any)=>{
    // check if class already exists by name
    const existingClass = await prisma.class.findFirst({
        where: { name: data.name },
    });
    console.log({existingClass});
    if(existingClass){
        throw new AppError(httpStatus.BAD_REQUEST,"Class already exists");
    }
    const newClass = await prisma.class.create({
        data:{
            name:data.name,
            section:data.section,
        }
    });
    return newClass;
}

const enrollStudent = async (classId: string, studentId: string) => {
    //Check class exists
    const existingClass = await prisma.class.findUnique({
      where: { id: classId },
    });
  
    if (!existingClass) {
      throw new AppError(httpStatus.NOT_FOUND, 'Class does not exist');
    }
  
    // Check student exists
    const existingStudent = await prisma.student.findUnique({
      where: { id: studentId },
    });
  
    if (!existingStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Student does not exist');
    }
  
    // Check student already enrolled
    if (existingStudent.class_id) {
      throw new AppError(
        httpStatus.CONFLICT,
        'Student is already enrolled in a class'
      );
    }
  
    // Enroll student (UPDATE student)
    const enrolledStudent = await prisma.student.update({
      where: { id: studentId },
      data: {
        class_id: classId,
      },
    });
  
    return enrolledStudent;
  };
  

  const getStudentsOfAClass = async (classId: string) => {
    // Check class exists
    const existingClass = await prisma.class.findUnique({
      where: { id: classId },
    });
  
    if (!existingClass) {
      throw new AppError(httpStatus.NOT_FOUND, 'Class does not exist');
    }
  
    // Get students of the class
    const students = await prisma.student.findMany({
      where: { class_id: classId },
      include:{
        class:true,
      }
    });
  
    return students;
  }
export const classService = {
    createClass,
    enrollStudent,
    getStudentsOfAClass
}