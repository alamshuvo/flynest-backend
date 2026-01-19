"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync = (fn) => {
    return async (req, res, next) => Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};
exports.default = catchAsync;
