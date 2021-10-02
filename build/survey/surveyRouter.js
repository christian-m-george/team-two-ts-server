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
const surveyRouter = express_1.default.Router();
surveyRouter.get("/", (req, res, next) => {
    console.log('survey route accessed');
    res.send('hit the user endpoint');
});
surveyRouter.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // extractJWT(req, res, next);
    function stringToBoolean(data) {
        if (data === 'true')
            return true;
        else
            return false;
    }
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
        const { id, email } = parseJwt(hash);
        console.log(id + email + " GOT IT GOT IT ");
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
                console.log('success decode?');
                const surveyFormData = req.body.surveyFormData;
                const surveyFormObject = {
                    title: surveyFormData.title,
                    authorId: id,
                    authorEmail: email,
                    category: surveyFormData.category,
                    singleQuestion: stringToBoolean(surveyFormData.singleQuestion),
                    isPrivate: stringToBoolean(surveyFormData.isPrivate),
                    isRandom: stringToBoolean(surveyFormData.isRandom),
                    numQuestions: surveyFormData.numQuestions
                };
                console.log(JSON.stringify(surveyFormObject) + " THIS IS SURVEY FORM DATA");
                // console.log(typeof surveyFormData.numQuestions + "   THIS IS TYPE OF NUM QUESTIONS");
                const newSurvey = yield _prismaClient_1.default.surveyMethods.createInitialSurvey(surveyFormObject).then(data => res.json(data)).catch(err => {
                    console.log(err);
                    res.json("email already exists");
                });
                return newSurvey;
            }
        }));
    }
    else {
        res.status(401).json('unauthorized');
    }
}));
surveyRouter.patch("/", (req, res, next) => {
    console.log(req.body);
    res.json(req.body);
});
surveyRouter.delete("/", (req, res, next) => {
    console.log(req.body);
    res.json(req.body);
});
exports.default = surveyRouter;
