"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthError_1 = __importDefault(require("../error/AuthError"));
const AppError_1 = __importDefault(require("../error/AppError"));
const NotFoundError_1 = __importDefault(require("../error/NotFoundError"));
const DuplicateError_1 = __importDefault(require("../error/DuplicateError"));
const handleNotFoundError_1 = __importDefault(require("../error/handleNotFoundError"));
const handleAuthError_1 = __importDefault(require("../error/handleAuthError"));
const handleAppError_1 = __importDefault(require("../error/handleAppError"));
const globalErrorHandler = (err, req, res, next) => {
    const message = err.message || 'Something went wrong';
    const errorSources = [
        {
            path: '',
            message: message,
        },
    ];
    let simplifiedError = {
        status: 500,
        message,
        error: errorSources,
    };
    if (err?.code === 11000) {
        simplifiedError = (0, DuplicateError_1.default)(err);
    }
    else if (err instanceof AppError_1.default) {
        simplifiedError = (0, handleAppError_1.default)(err);
    }
    else if (err instanceof AuthError_1.default) {
        simplifiedError = (0, handleAuthError_1.default)(err);
    }
    else if (err instanceof NotFoundError_1.default) {
        simplifiedError = (0, handleNotFoundError_1.default)(err);
    }
    else {
        simplifiedError = {
            ...simplifiedError,
            message: err?.message,
        };
    }
    res.status(simplifiedError.status).json({
        success: false,
        ...simplifiedError,
    });
};
exports.default = globalErrorHandler;
