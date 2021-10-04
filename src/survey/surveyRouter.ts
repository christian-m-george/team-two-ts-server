import express, { Request, Response, NextFunction, Router } from 'express';
import dbMethods from '../_prismaClient/_prismaClient';
import jwt from 'jsonwebtoken';
import Cookie from '../utils/cookie';
import config from '../config';
import UserPayload from '../user/userPayload';
import { SurveyData } from './survey';

const surveyRouter: Router = express.Router();

surveyRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
    console.log('survey route accessed');
    res.send('hit the user endpoint');
})
  
surveyRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    // extractJWT(req, res, next);
    function stringToBoolean(data: any): boolean {
        if(data === 'true') return true;
        else return false;
    }

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

        const {id, email} = parseJwt(hash);
        console.log(id + email + " GOT IT GOT IT ");


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
                console.log('success decode?')
                const surveyFormData: SurveyData = req.body.surveyFormData;
                const surveyFormObject = {
                    title: surveyFormData.title,  
                    authorId:  id,
                    authorEmail: email,
                    category: surveyFormData.category,
                    singleQuestion: stringToBoolean(surveyFormData.singleQuestion),
                    isPrivate: stringToBoolean(surveyFormData.isPrivate),
                    isRandom: stringToBoolean(surveyFormData.isRandom),
                    numQuestions: stringToNumber(surveyFormData.numQuestions)
                }
                console.log( JSON.stringify(surveyFormObject) + " THIS IS SURVEY FORM DATA");
                const newSurvey = await dbMethods.surveyMethods.createInitialSurvey(surveyFormObject).then(data =>  
                    res.json(data)).catch(err => {
                    console.log(err)
                    res.json("email already exists");
                    })
                return newSurvey;
            }
        })
    } else {
        res.status(401).json('unauthorized');
    }
});
surveyRouter.patch("/", (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    res.json(req.body);
});

surveyRouter.delete("/", (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    res.json(req.body);
});

export default surveyRouter;