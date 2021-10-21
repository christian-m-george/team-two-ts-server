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
const extractJWT_1 = __importDefault(require("../utils/extractJWT"));
const questionRouter = express_1.default.Router();
questionRouter.get("/", extractJWT_1.default, (req, res, next) => {
    console.log(req.body + 'question route accessed');
    res.send('question route accessed');
});
questionRouter.get("/:surveyId", extractJWT_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(JSON.stringify(req.params) + " questions by survey id route accessed");
    const id = parseInt(req.params.surveyId);
    console.log(id);
    const questions = yield _prismaClient_1.default.questionMethods.getAllQuestionsById(id);
    if (questions.length > 0) {
        console.log("here");
        return res.json(questions);
    }
    else {
        return res.status(400).json('no surveys');
    }
}));
questionRouter.get("/all", extractJWT_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const surveyId = req.body.surveyId;
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
        if (surveys) {
            console.log(surveys);
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
questionRouter.post("/", extractJWT_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const surveyId = req.body.surveyId;
    const order = req.body.num;
    const qType = req.body.questionType;
    console.log(surveyId + " THIS IS SURVEY ID" + " THIS IS THE ORDER " + order);
    const existingQuestions = yield _prismaClient_1.default.questionMethods.getQuestionBySurveyIdAndOrderFrag(surveyId, order);
    console.log(existingQuestions.map(i => JSON.stringify(i)) + " THIS IS QUESTSETS");
    // This could be a while loop for slightly faster runtime or 
    // maybe there is another way to check if a particular number
    // question already exists on survey
    // const checkQuestionExists = (): boolean => {
    //     if(existingQuestions.length > 1) {
    //         let myArray: number[] = [];
    //         existingQuestions.map((a) => myArray.push(a.order))
    //         console.log('it is true, myArray includes SurveyId')
    //         if(myArray.includes(surveyId)) {
    //             return true
    //         }else return false;
    //     }
    //     return false;
    // }
    if (req.body.questionType === 'comment box') {
        console.log(JSON.stringify(req.body));
        const question = {
            surveyId: req.body.surveyId,
            order: req.body.num,
            questionType: req.body.questionType,
            questionText: req.body.questionText,
            answers: []
        };
        if (existingQuestions.length > 0) {
            console.log("YES IT EXISTS (COMMENT BOX)");
            const updatedQuestion = _prismaClient_1.default.questionMethods.updateQuestionByIdAndOrder(question);
            return res.json(updatedQuestion);
        }
        else {
            console.log(" ELSE I GUESS (COMMENT BOX)");
            const questionPosted = yield _prismaClient_1.default.questionMethods.addQuestion(question);
            if (questionPosted) {
                console.log(questionPosted);
                return res.json(questionPosted);
            }
            else {
                return res.status(400).json("not posted");
            }
        }
    }
    else if (req.body.questionType === 'multiple choice') {
        let array = [];
        req.body.answerFieldInputs.map((a) => {
            console.log(a + " " + JSON.stringify(a));
            array.push(a.value);
        });
        // console.log("THIS IS ANSWERS   " + answers)
        const question = {
            surveyId: req.body.surveyId,
            order: req.body.num,
            questionType: req.body.questionType,
            questionText: req.body.questionInput,
            answers: array
        };
        if (existingQuestions.length > 0) {
            console.log("YES IT EXISTS");
            const updatedQuestion = _prismaClient_1.default.questionMethods.updateQuestionByIdAndOrder(question);
            return res.json(updatedQuestion);
        }
        else {
            console.log(" ELSE I GUESS");
            const questionPosted = yield _prismaClient_1.default.questionMethods.addQuestion(question);
            if (questionPosted) {
                console.log(questionPosted);
                return res.json(questionPosted);
            }
            else {
                return res.status(400).json("not posted");
            }
        }
    }
}));
questionRouter.patch("/", extractJWT_1.default, (req, res, next) => {
    console.log(req.body);
    res.json('hit patch route');
});
questionRouter.delete("/", extractJWT_1.default, (req, res, next) => {
    console.log(req.body);
    res.json(req.body);
});
exports.default = questionRouter;
