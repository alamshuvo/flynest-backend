import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { studentService } from "./student.service";
const createStudent = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await studentService.createStudent(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student created Sucessfully by admin ",
    data: {
      result,
    },
  });
});

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const result = await studentService.getAllStudents();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student retrived Sucessfully ",
    data: {
      result,
    },
  });
});

const getSingleStudentt = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    console.log(id);
    const result = await studentService.getSingleStudent(id as string);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Single Student retrived Sucessfully ",
      data: {
        result,
      },
    });
  });
export const studentController = {
  createStudent,
  getAllStudents,
  getSingleStudentt
};
