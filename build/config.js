"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 8000;
const config = {
    NODE_ENV: NODE_ENV,
    PORT: PORT
};
exports.default = config;
