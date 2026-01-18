import { UserRole } from "@prisma/client";

export type IAuthUser = {
    email:string;
    role: UserRole
}|null

export interface SignupPayload {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
  }