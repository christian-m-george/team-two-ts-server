"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const surveyRouter = express_1.default.Router();
surveyRouter.get("/", (req, res, next) => {
    console.log('survey route accessed');
    res.send('hit the user endpoint');
});
surveyRouter.post("/", (req, res, next) => {
    console.log(req.body);
    res.json(req.body);
});
surveyRouter.patch("/", (req, res, next) => {
    console.log(req.body);
    res.json(req.body);
});
surveyRouter.delete("/", (req, res, next) => {
    console.log(req.body);
    res.json(req.body);
});
exports.default = surveyRouter;
