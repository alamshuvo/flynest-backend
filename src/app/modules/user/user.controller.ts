import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { UserService } from "./user.service";
import { IAuthUser } from "../../interface/common";
// import { userService } from './user.service';
// import pick from '../../../shared/pick';
// import { userFilterAbleFields } from './user.const';

const insertUserIntoDB = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  console.log(data);
  const result = await UserService.signup(data);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  //   const filters = pick(req.query, userFilterAbleFields);

  //   const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await UserService.getAllFormDb();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieval successfully",
    data: result,
  });
});
const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  console.log(user);
  const result = await UserService.getMyProfile(user as IAuthUser);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'My Profile data fetched successfully',
    data: result,
  });
});

export const userController = {
  insertUserIntoDB,
  getAllFromDB,
  getMyProfile
};
