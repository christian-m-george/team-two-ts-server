"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter = express_1.default.Router();
userRouter.get("/", (req, res, next) => {
    console.log('user route accessed');
    res.send('hit the user endpoint');
});
userRouter.post("/", (req, res, next) => {
    next();
    res.json(req.body);
});
userRouter.patch("/", (req, res, next) => {
    console.log(req.body);
    res.json(req.body);
});
userRouter.delete("/", (req, res, next) => {
    console.log(req.body);
    res.json(req.body);
});
exports.default = userRouter;
