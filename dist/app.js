"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const NotFound_1 = __importDefault(require("./app/middlewares/NotFound"));
const app = (0, express_1.default)();
// CORS setup (update origins for production later)
const corsOptions = {
    origin: ['http://localhost:3000'], // ← add your real frontend domain(s) in production
    methods: '*',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
// Mount routes at root
app.use('/', routes_1.default);
// Error handling (last)
app.use(globalErrorHandler_1.default);
app.use(NotFound_1.default);
// Very important: export for Vercel / import in server.ts
exports.default = app;
