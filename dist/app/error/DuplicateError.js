"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const handleDuplicateError = (error) => {
    const match = error?.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];
    const errorSources = [
        {
            path: '',
            message: `"${extractedMessage}" already exists`,
        },
    ];
    return {
        status: 400,
        message: 'DuplicateError',
        error: errorSources,
        stack: config_1.default.NODE_ENV === 'development' ? error.stack : null,
    };
};
exports.default = handleDuplicateError;
