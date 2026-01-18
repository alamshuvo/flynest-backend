import { prisma } from "../../shared/prisma";
import config from "../../config";
import bcrypt from "bcrypt";
import AppError from "../../error/AppError";
import httpStatus from 'http-status';
import { SignupPayload } from "../../interface/common";
  
  const signup = async (payload: SignupPayload) => {
    const { name, email, password, role } = payload;


    // Optional validation when use DTOS validation its cut 
    if (!name || !email || !password) {
    throw new AppError(httpStatus.BAD_REQUEST as number,'Name, email, and password are required');
    }
  
    // 409 – Conflict
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
 
    if (existingUser) {
     throw new AppError(httpStatus.BAD_REQUEST,'User with this email already exists');
    }
  
    const password_Hash = bcrypt.hashSync(password as string, Number(config.bcrypt.bcryptSaltRounds) || 10);
   console.log(password_Hash);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: password_Hash,
        role,
      },
    });
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  };
  
  const getAllFormDb = async ()=>{
    const users = await prisma.user.findMany();
    return users;
  }
  const getMyProfile = async (userData:any) => {
    
    const user = await prisma.user.findUnique({
      where: { email: userData.email },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND as number,'User not found');
    }
  
    return user;
  }
  export const UserService = {
    signup,
    getAllFormDb,
    getMyProfile
  };