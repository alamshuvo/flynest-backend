"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleNotFoundError = (error) => {
    return {
        status: error.statusCode,
        message: error.message,
        error: [],
    };
};
exports.default = handleNotFoundError;
