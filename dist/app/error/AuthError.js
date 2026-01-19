"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("./AppError"));
class AuthError extends AppError_1.default {
    constructor(itemName, message = 'Authentication Error') {
        super(http_status_1.default.UNAUTHORIZED, message);
        this.itemName = itemName;
        this.message = message;
    }
}
exports.default = AuthError;
