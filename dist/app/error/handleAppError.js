"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const handleAppError = (error) => {
    return {
        status: error.statusCode,
        message: error.message,
        stack: config_1.default.NODE_ENV === 'development' ? error.stack : null,
        error: [],
    };
};
exports.default = handleAppError;
