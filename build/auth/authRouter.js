"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRouter = express_1.default.Router();
authRouter.get("/", (req, res, next) => {
    console.log(req.body, "this is the req body");
    res.json('hit auth get');
    next(console.log('yes'));
});
authRouter.post("/", (req, res, next) => {
    console.log(req.body, "this is the req body");
    res.json();
});
exports.default = authRouter;
