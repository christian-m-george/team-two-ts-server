"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logoutRouter = express_1.default.Router();
logoutRouter.get('/', (req, res) => {
    console.log('hit logout route');
    res.clearCookie('acctok').clearCookie('reftok').send(200);
});
exports.default = logoutRouter;
