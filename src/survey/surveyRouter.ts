import express, { Request, Response, NextFunction, Router } from 'express';
import dbMethods from '../_prismaClient/_prismaClient';
import jwt from 'jsonwebtoken';
import Cookie from '../utils/cookie';
import config from '../config';
import UserPayload from '../user/userPayload';
import { SurveyData } from './survey';
import extractJWT from '../utils/extractJWT';

const surveyRouter: Router = express.Router();

surveyRouter.get("/", (req: Request, res: Response, next: NextFunction) => {

    // console.log(req.body + 'survey by survey id route accessed');
    // res.send('survey by survey id route accessed');
})


surveyRouter.get("/all", extractJWT, async (req: Request, res: Response, next: NextFunction) => {
    console.log('get all route accessed');
    const cookie: Cookie = req.cookies;
    const hash = cookie.acctok;
    function parseJwt (token: string): UserPayload {
        const payload = token.split('.')[1];
        const payLoadObj = JSON.parse(Buffer.from(payload, 'base64').toString());
        return payLoadObj;
    }
    if(hash) {
        const { id }  = parseJwt(hash);
        console.log('this is id ' + id + " " + typeof id)
        const surveys = await dbMethods.surveyMethods.getSurveyByUser(id);
        if (surveys.length > 1) {
            console.log(surveys);
            return res.json(surveys);
        } else {
            return res.status(400).json('no surveys');
        }
    }
    else {
        return res.status(400).json('unauthorized');
    }
})

surveyRouter.get("/:surveyId", extractJWT, async (req: Request, res: Response, next: NextFunction) => {
    console.log(JSON.stringify(req.params) + " survey by survey id 86 route accessed");
    const id = parseInt(req.params.surveyId);
    const survey = await dbMethods.surveyMethods.getSurveyById(id);
        if (survey) {
            // console.log(surveys);
            return res.json(survey);
        } else {
            return res.status(400).json('no surveys');
        }
})

surveyRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    function stringToNumber(data: string | number): number {
        if (typeof data === 'string') return parseInt(data);
        else return data;
    }

    const cookie: Cookie = req.cookies;
    const hash = cookie.acctok;

    if(hash) {
        // Returns decoded UserPayload type object which user's email and token issuer and expiration date
        function parseJwt (token: string): UserPayload {
            const payload = token.split('.')[1];
            const payLoadObj = JSON.parse(Buffer.from(payload, 'base64').toString());
            return payLoadObj;
        }
        // console.log(parseJwt(hash));
        const {id, email} = parseJwt(hash);

        // const userPayload: UserPayload = hash;
        // const userPayload = parseJwt(hash);
        // console.log(userPayload.email);
        // console.log(hash + " THIS IS HASH");
        // console.log(parseJwt(hash));
        // console.log(userPayload + " THIS IS USER PAYLOAD");

        jwt.verify(hash, config.token.tokenSecret, async (error, decoded) => {
            if (error) {
                return res.status(400).json({
                    message: error.message,
                    error
                });
            }
            else {
                res.locals.jwt = decoded;
                const surveyFormData: SurveyData = req.body.surveyFormData;
                // console.log(surveyFormData);
                const surveyFormObject = {
                    title: surveyFormData.title,  
                    authorId:  id,
                    authorEmail: email,
                    category: surveyFormData.category,
                    singleQuestion: surveyFormData.singleQuestion,
                    isPrivate: surveyFormData.isPrivate,
                    isRandom: surveyFormData.isRandom,
                    numQuestions: stringToNumber(surveyFormData.numQuestions)
                }
                // console.log( JSON.stringify(surveyFormObject) + " THIS IS SURVEY FORM DATA");
                const newSurvey = await dbMethods.surveyMethods.createInitialSurvey(surveyFormObject);
                if (newSurvey) {
                    return res.json(newSurvey);
                }
            }
        })
    } else {
        res.status(401).json('unauthorized');
    }
});

surveyRouter.patch("/", extractJWT, (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    res.json(req.body);
});

surveyRouter.delete("/", (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    res.json(req.body);
});

export default surveyRouter;