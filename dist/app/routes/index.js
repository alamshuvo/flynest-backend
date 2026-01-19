"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const home_route_1 = require("../modules/home/home.route");
const auth_route_1 = require("../modules/auth/auth.route");
const user_route_1 = require("../modules/user/user.route");
const student_route_1 = require("../modules/student/student.route");
const class_route_1 = require("../modules/class/class.route");
const router = (0, express_1.Router)();
const apiPrefix = '/api';
const moduleRoutes = [
    {
        path: '/',
        route: home_route_1.HomeRoutes,
    },
    {
        path: `${apiPrefix}/auth`,
        route: auth_route_1.authRoutes,
    },
    {
        path: `${apiPrefix}/users`,
        route: user_route_1.UserRoutes
    },
    {
        path: `${apiPrefix}/students`,
        route: student_route_1.studentRoutes
    },
    {
        path: `${apiPrefix}/classes`,
        route: class_route_1.classesRoutes
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
moduleRoutes.forEach((moduleRoute) => {
    router.use(moduleRoute.path, moduleRoute.route);
});
exports.default = router;
