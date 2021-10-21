"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const extractJWT_1 = __importDefault(require("../utils/extractJWT"));
const _prismaClient_1 = __importDefault(require("../_prismaClient/_prismaClient"));
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
responseRouter.get("/survey/:id", extractJWT_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (id) {
        const responses = yield _prismaClient_1.default.responseMethods.getResponsesBySurveyId(id);
        if (responses) {
            res.json(responses);
        }
        else {
            res.sendStatus(400);
        }
    }
    else {
        res.json("no survey id... that's odd");
    }
    // console.log(req.body + 'survey by survey id route accessed');
}));
responseRouter.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('hereeeeee');
    const { id, responses } = req.body;
    console.log(responses);
    // const myResponses = responses.map((response: any) => {
    //     response.answer
    // })
    if (id && responses.length >= 1) {
        const postResponse = yield _prismaClient_1.default.responseMethods.addResponse(id, responses);
        if (postResponse) {
            console.log(JSON.stringify(postResponse) + " WAS POSTED TO DB");
            res.sendStatus(200);
        }
        else {
            res.sendStatus(400);
        }
    }
    else {
        console.log(id + " " + JSON.stringify(responses));
        console.log('messed up inputs');
        res.json('messed up inputs');
    }
}));
exports.default = responseRouter;
