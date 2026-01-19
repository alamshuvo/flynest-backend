"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("./AppError"));
class NotFoundError extends AppError_1.default {
    constructor(itemName, stack = '') {
        super(http_status_1.default.NOT_FOUND, `${itemName} not found!`);
        this.itemName = itemName;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = NotFoundError;
