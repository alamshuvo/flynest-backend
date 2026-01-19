"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleAuthError = (error) => {
    return {
        status: error.statusCode,
        message: error.message,
        error: [],
    };
};
exports.default = handleAuthError;
