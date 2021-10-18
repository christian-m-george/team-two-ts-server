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
const _prismaClient_1 = __importDefault(require("../_prismaClient/_prismaClient"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const extractJWT_1 = __importDefault(require("../utils/extractJWT"));
const surveySignJWT_1 = __importDefault(require("../utils/surveySignJWT"));
const sendSurveyLink_1 = __importDefault(require("../utils/sendSurveyLink"));
const surveyRouter = express_1.default.Router();
surveyRouter.get("/", (req, res, next) => {
    // console.log(req.body + 'survey by survey id route accessed');
    res.json('get accessed');
});
surveyRouter.get("/all", extractJWT_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('get all route accessed');
    const cookie = req.cookies;
    const hash = cookie.acctok;
    function parseJwt(token) {
        const payload = token.split('.')[1];
        const payLoadObj = JSON.parse(Buffer.from(payload, 'base64').toString());
        return payLoadObj;
    }
    if (hash) {
        const { id } = parseJwt(hash);
        const surveys = yield _prismaClient_1.default.surveyMethods.getSurveyByUser(id);
        console.log(surveys);
        if (surveys.length >= 1) {
            return res.json(surveys);
        }
        else {
            return res.status(400).json('no surveys');
        }
    }
    else {
        return res.status(400).json('unauthorized');
    }
}));
surveyRouter.get("/:surveyId", extractJWT_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(JSON.stringify(req.params) + " survey by survey id 86 route accessed");
    const id = parseInt(req.params.surveyId);
    const survey = yield _prismaClient_1.default.surveyMethods.getSurveyById(id);
    if (survey) {
        // console.log(surveys);
        return res.json(survey);
    }
    else {
        return res.status(400).json('no surveys');
    }
}));
surveyRouter.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    function stringToNumber(data) {
        if (typeof data === 'string')
            return parseInt(data);
        else
            return data;
    }
    const cookie = req.cookies;
    const hash = cookie.acctok;
    if (hash) {
        // Returns decoded UserPayload type object which user's email and token issuer and expiration date
        function parseJwt(token) {
            const payload = token.split('.')[1];
            const payLoadObj = JSON.parse(Buffer.from(payload, 'base64').toString());
            return payLoadObj;
        }
        // console.log(parseJwt(hash));
        const { id, email } = parseJwt(hash);
        // const userPayload: UserPayload = hash;
        // const userPayload = parseJwt(hash);
        // console.log(userPayload.email);
        // console.log(hash + " THIS IS HASH");
        // console.log(parseJwt(hash));
        // console.log(userPayload + " THIS IS USER PAYLOAD");
        jsonwebtoken_1.default.verify(hash, config_1.default.token.tokenSecret, (error, decoded) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                return res.status(400).json({
                    message: error.message,
                    error
                });
            }
            else {
                res.locals.jwt = decoded;
                const surveyFormData = req.body.surveyFormData;
                // console.log(surveyFormData);
                const surveyFormObject = {
                    title: surveyFormData.title,
                    authorId: id,
                    authorEmail: email,
                    category: surveyFormData.category,
                    singleQuestion: surveyFormData.singleQuestion,
                    isPrivate: surveyFormData.isPrivate,
                    isRandom: surveyFormData.isRandom,
                    numQuestions: stringToNumber(surveyFormData.numQuestions)
                };
                // console.log( JSON.stringify(surveyFormObject) + " THIS IS SURVEY FORM DATA");
                const newSurvey = yield _prismaClient_1.default.surveyMethods.createInitialSurvey(surveyFormObject);
                if (newSurvey) {
                    return res.json(newSurvey);
                }
            }
        }));
    }
    else {
        res.status(401).json('unauthorized');
    }
}));
surveyRouter.patch("/", extractJWT_1.default, (req, res, next) => {
    console.log(req.body);
    res.json(req.body);
});
surveyRouter.delete("/", extractJWT_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const surveyId = req.body.surveyId;
    if (surveyId) {
        const surveyDeleted = yield _prismaClient_1.default.surveyMethods.deleteSurvey(surveyId).catch(error => console.log(error));
        if (surveyDeleted) {
            res.sendStatus(200);
        }
        else {
            res.sendStatus(400);
        }
    }
}));
surveyRouter.patch('/publish-survey', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('hit route');
    const surveyGroup = req.body;
    const { id, emails } = surveyGroup;
    if (!id || !emails || emails.length < 1) {
        res.sendStatus(400);
    }
    else {
        (0, surveySignJWT_1.default)(id, emails, (error, token) => {
            if (error) {
                res.sendStatus(401).json({
                    message: 'unauthorized',
                    error: error
                });
            }
            else if (token) {
                let surveyPath = `https://team-two-client.vercel.app/survey/${token}`;
                // let surveyPath = `https://team-two-client.vercel.app/survey/${token}`
                const surveys = {
                    to: emails,
                    subject: "You've been invited to take a survey",
                    text: "You've been invited to take a survey",
                    surveyUrl: `${surveyPath}`
                };
                (0, sendSurveyLink_1.default)(surveys);
                const published = true;
                res.sendStatus(200);
            }
        });
        res.sendStatus(200);
    }
}));
surveyRouter.post('/verify', (req, res, next) => {
    console.log('hit route to check survey');
    const token = req.body.token;
    if (!token) {
        res.sendStatus(400);
    }
    else {
        jsonwebtoken_1.default.verify(token, config_1.default.token.surveySecret, (error, decoded) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                console.log(error);
                return res.status(400).json({
                    message: error.message,
                    error
                });
            }
            else {
                function parseJwt(token) {
                    const payload = token.split('.')[1];
                    const payLoadObj = JSON.parse(Buffer.from(payload, 'base64').toString());
                    return payLoadObj;
                }
                const { id, emails } = parseJwt(token);
                const survey = yield _prismaClient_1.default.surveyMethods.getSurveyById(id);
                const questions = yield _prismaClient_1.default.questionMethods.getQuestionBySurveyId(id);
                if (id && emails && survey && questions) {
                    res.json({
                        id,
                        emails,
                        survey,
                        questions
                    });
                }
                else {
                    res.json("unable to fetch survey and questions");
                }
            }
        }));
    }
});
exports.default = surveyRouter;
