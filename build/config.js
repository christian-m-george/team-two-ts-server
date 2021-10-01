"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 8000;
const SERVER_TOKEN_EXPIRE_TIME = process.env.SERVER_TOKEN_EXPIRE_TIME || 3600;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'questioneer';
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'backupsecretitisntsogood';
const config = {
    NODE_ENV: NODE_ENV,
    PORT: PORT,
    token: {
        expireTime: SERVER_TOKEN_EXPIRE_TIME,
        issuer: SERVER_TOKEN_ISSUER,
        tokenSecret: SERVER_TOKEN_SECRET
    }
};
exports.default = config;
