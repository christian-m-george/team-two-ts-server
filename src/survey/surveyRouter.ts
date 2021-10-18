import express, { Request, Response, NextFunction, Router } from 'express';
import dbMethods from '../_prismaClient/_prismaClient';
import jwt from 'jsonwebtoken';
import Cookie from '../utils/cookie';
import config from '../config';
import UserPayload from '../user/userPayload';
import { SurveyData } from './survey';
import extractJWT from '../utils/extractJWT';
import surveySignJWT from '../utils/surveySignJWT';
import sendSurveyLink from '../utils/sendSurveyLink';
import { SurveyGroup } from './surveyGroup';
import { resourceLimits } from 'worker_threads';

const surveyRouter: Router = express.Router();

surveyRouter.get("/", (req: Request, res: Response, next: NextFunction) => {

    // console.log(req.body + 'survey by survey id route accessed');
    res.json('get accessed');
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
        const surveys = await dbMethods.surveyMethods.getSurveyByUser(id);
        console.log(surveys);
        if (surveys.length >= 1) {
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

surveyRouter.delete("/", extractJWT, async (req: Request, res: Response, next: NextFunction) => {
    const surveyId = req.body.surveyId;
    if(surveyId) {
            const surveyDeleted = await dbMethods.surveyMethods.deleteSurvey(surveyId).catch(error => console.log(error))
            if(surveyDeleted) {
                res.sendStatus(200);
            } else {
                res.sendStatus(400);
            }
        }});

surveyRouter.patch('/publish-survey', async (req: Request, res: Response, next: NextFunction) => {
    console.log('hit route');
    const surveyGroup: SurveyGroup = req.body;
    const {id, emails} = surveyGroup;
    if (!id || !emails ||emails.length < 1) {
        res.sendStatus(400)
    } else {

        surveySignJWT(id, emails, (error, token) => {
            if(error) {
              res.sendStatus(401).json({
                message: 'unauthorized',
                error: error
              });
            } else if (token) {
                let surveyPath = `http://localhost:3000/survey/${token}`
                // let surveyPath = `https://team-two-client.vercel.app/survey/${token}`
                const surveys = {
                    to: emails,
                    subject: "You've been invited to take a survey",
                    text: "You've been invited to take a survey",
                    surveyUrl: `${surveyPath}`
                }
                sendSurveyLink(surveys)
                const published = true;
                res.sendStatus(200);
            }
          });
        

        res.sendStatus(200);    
    }    
})


surveyRouter.post('/verify', (req: Request, res: Response, next: NextFunction) => {
    console.log('hit route to check survey')
    const token = req.body.token;
    if(!token) {
        res.sendStatus(400);
    } else {
        jwt.verify(token, config.token.surveySecret, async (error: any, decoded: any) => {
            if (error) {
                console.log(error);
                return res.status(400).json({
                    message: error.message,
                    error
                });
            }
            else {
                
                function parseJwt (token: string): SurveyGroup {
                    const payload = token.split('.')[1];
                    const payLoadObj = JSON.parse(Buffer.from(payload, 'base64').toString());
                    return payLoadObj;
                }

                const {id, emails} = parseJwt(token)
                const survey = await dbMethods.surveyMethods.getSurveyById(id);
                const questions = await dbMethods.questionMethods.getQuestionBySurveyId(id);

                if(id && emails && survey && questions) {
                    res.json({
                        id,
                        emails,
                        survey,
                        questions
                    })
                } else {
                    res.json("unable to fetch survey and questions")
    }}})}
})


export default surveyRouter;