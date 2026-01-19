"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, responseData) => {
    const { statusCode, message, data, success } = responseData;
    const response = { statusCode, message, success };
    if (data && Object.keys(data).length > 0) {
        response.data = data;
    }
    res.status(statusCode).json(response);
};
exports.default = sendResponse;
