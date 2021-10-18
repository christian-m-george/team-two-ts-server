"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import dbMethods from '../_prismaClient/_prismaClient';
// import jwt from 'jsonwebtoken';
// import Cookie from '../utils/cookie';
// import config from '../config';
// import UserPayload from '../user/userPayload';
// import { SurveyData } from './survey';
// import extractJWT from '../utils/extractJWT';
// import surveySignJWT from '../utils/surveySignJWT';
// import sendSurveyLink from '../utils/sendSurveyLink';
// import { SurveyGroup } from './surveyGroup';
const responseRouter = express_1.default.Router();
responseRouter.get("/", (req, res, next) => {
    // console.log(req.body + 'survey by survey id route accessed');
    res.json('get accessed');
});
responseRouter.post("/", (req, res, next) => {
    console.log(JSON.stringify(req.body) + 'survey by survey id route accessed');
    res.json(req.body);
});
exports.default = responseRouter;
