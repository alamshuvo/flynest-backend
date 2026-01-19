"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const http_status_1 = __importDefault(require("http-status"));
const validateRequest = (DtoClass) => async (req, res, next) => {
    const dtoObject = (0, class_transformer_1.plainToInstance)(DtoClass, req.body);
    console.log({ dtoObject });
    const errors = await (0, class_validator_1.validate)(dtoObject, {
        whitelist: true,
        forbidNonWhitelisted: true,
    });
    if (errors.length > 0) {
        const formattedErrors = errors.map(err => ({
            field: err.property,
            errors: Object.values(err.constraints || {}),
        }));
        return res.status(http_status_1.default.BAD_REQUEST).json({
            success: false,
            message: "Validation failed",
            errors: formattedErrors,
        });
    }
    req.body = dtoObject; // sanitized + validated data
    next();
};
exports.validateRequest = validateRequest;
