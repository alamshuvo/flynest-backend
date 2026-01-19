"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.join(process.cwd(), '.env'),
});
exports.default = {
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT,
    database_uri: process.env.DATABASE_URL,
    base_url: process.env.BASE_URL || 'http://localhost:5000',
    jwt: {
        jwtAccessToken: process.env.JWT_SECRET,
        jwtExpiresIn: process.env.JWT_EXPIRATION,
        refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
        refreshExpiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
    },
    bcrypt: {
        bcryptSaltRounds: process.env.BCRYPT_SALT_ROUND,
    },
    admin_password: process.env.ADMIN_PASSWORD,
    teacher_password: process.env.TEACHER_PASSWORD,
};
