import express, { Request, Response, NextFunction, Router } from 'express';
import extractJWT from '../utils/extractJWT';
import dbMethods from '../_prismaClient/_prismaClient';
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

const responseRouter: Router = express.Router();

responseRouter.get("/", (req: Request, res: Response, next: NextFunction) => {

    // console.log(req.body + 'survey by survey id route accessed');
    res.json('get accessed');
})

responseRouter.get("/survey/:id", extractJWT, async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    if (id) {
        const responses = await dbMethods.responseMethods.getResponsesBySurveyId(id)
        if(responses) {
            res.json(responses)
        } else {
            res.sendStatus(400);
        }
    } else {
        res.json("no survey id... that's odd");
    }
    // console.log(req.body + 'survey by survey id route accessed');
})

responseRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    console.log('hereeeeee')
    const {id, responses} = req.body;
    console.log(responses);
    // const myResponses = responses.map((response: any) => {
    //     response.answer
    // })
    if (id && responses.length >= 1) {    
        const postResponse = await dbMethods.responseMethods.addResponse(id, responses);
        if (postResponse) {
            console.log(JSON.stringify(postResponse) + " WAS POSTED TO DB")
            res.sendStatus(200)
        }
        else {
            res.sendStatus(400)
        }
    }
    else {
        console.log(id + " " + JSON.stringify(responses))
        console.log('messed up inputs');
        res.json('messed up inputs');
    }
})

export default responseRouter;