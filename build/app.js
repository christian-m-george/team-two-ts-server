"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("./config"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// const environment = process.env.NODE_ENV === 'production' ? process.env.VERCEL_URL : process.env.REACT_URL;
// const HEROKU_URL = process.env.HEROKU_URL
// const VERCEL_URL = process.env.VERCEL_URL
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: config_1.default.REACT_URL,
    credentials: true,
}));
// app.use(cors({
//     origin: environment,
//     credentials: true,
//   }));
app.use(express_1.default.json());
app.enable('trust proxy');
exports.default = app;
