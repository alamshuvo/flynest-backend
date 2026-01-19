import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export const validateRequest =
  (DtoClass: any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const dtoObject = plainToInstance(DtoClass, req.body);
    console.log({dtoObject});
    const errors = await validate(dtoObject, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      const formattedErrors = errors.map(err => ({
        field: err.property,
        errors: Object.values(err.constraints || {}),
      }));

      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: "Validation failed",
        errors: formattedErrors,
      });
    }

    req.body = dtoObject; // sanitized + validated data
    next();
  };
