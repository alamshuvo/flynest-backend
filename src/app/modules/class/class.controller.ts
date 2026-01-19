import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { classService} from "./class.service";

const createClass = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
  
    const result = await classService.createClass(data);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Class created Sucessfully",
      data: {
        result,
      },
    });
  });

  const enrollStudent = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
     const studentId = req.body.student_id
     console.log(id,studentId);
    const result = await classService.enrollStudent(id as string,studentId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "enroll a student in a class ",
      data: {
        result,
      },
    });
  });


  const getStudentsOfAClass = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    
    const result = await classService.getStudentsOfAClass(id as string);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "get all students of a class ",
      data: {
        result,
      },
    });
  });


export const classController = {
    createClass,
    enrollStudent,
    getStudentsOfAClass
}