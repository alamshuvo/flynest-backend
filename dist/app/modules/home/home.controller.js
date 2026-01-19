"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeController = void 0;
const config_1 = __importDefault(require("../../config"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const index = (0, catchAsync_1.default)(async (req, res) => {
    res.status(200).json({
        success: true,
        message: `Flynest API is chilling on '${config_1.default.NODE_ENV.toUpperCase()}' environment!`,
    });
});
exports.HomeController = {
    index,
};
