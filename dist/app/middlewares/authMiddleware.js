"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../error/AppError"));
const verifyToken_1 = __importDefault(require("../utils/verifyToken"));
const auth = (...role) => {
    return async (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    req, res, next) => {
        try {
            const token = req.headers.authorization;
            if (!token) {
                throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'you are not authorized');
            }
            const actualToken = token.split(' ')[1];
            const verifiedUser = (0, verifyToken_1.default)(actualToken, config_1.default.jwt.jwtAccessToken);
            req.user = verifiedUser;
            if (role.length && !role.includes(verifiedUser.role)) {
                throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'you are not authorized');
            }
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.default = auth;
