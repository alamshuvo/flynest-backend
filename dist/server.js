"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts  (or rename to server.ts if you prefer)
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const config_1 = __importDefault(require("./app/config"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const NotFound_1 = __importDefault(require("./app/middlewares/NotFound"));
const DB_1 = require("./app/DB");
const app = (0, express_1.default)();
// Middleware 
const corsOptions = {
    origin: ['http://localhost:3000'], // ← add your production frontend domain later
    methods: '*',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
app.use('/', routes_1.default);
app.use(globalErrorHandler_1.default);
app.use(NotFound_1.default);
const start = async () => {
    try {
        console.log('Seeding database...');
        await (0, DB_1.seedDatabase)();
        console.log('Database seeded successfully');
    }
    catch (err) {
        console.error('Seeding failed:', err);
    }
    const isVercel = !!process.env.VERCEL;
    if (!isVercel) {
        const port = config_1.default.port || 5000;
        app.listen(port, () => {
            console.log(`Server running locally → http://localhost:${port}`);
        });
    }
};
// Run startup immediately
start().catch((err) => {
    console.error('Fatal startup error:', err);
    process.exit(1);
});
// ── Very important for Vercel ────────────────────────────────
exports.default = app;
