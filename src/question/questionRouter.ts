import express, { Request, Response, NextFunction, Router } from 'express';
import dbMethods from '../_prismaClient/_prismaClient';
import Cookie from '../utils/cookie';
import UserPayload from '../user/userPayload';
import extractJWT from '../utils/extractJWT';

const questionRouter: Router = express.Router();

questionRouter.get("/", extractJWT, (req: Request, res: Response, next: NextFunction) => {

    console.log(req.body + 'survey by survey id route accessed');
    res.send('survey by survey id route accessed');
})


questionRouter.get("/all", extractJWT,  async (req: Request, res: Response, next: NextFunction) => {
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
        if (surveys) {
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
  
questionRouter.post("/", extractJWT, async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    res.send(200).json('hit post route');
});

questionRouter.patch("/", extractJWT, (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    res.json('hit patch route');
});

questionRouter.delete("/", extractJWT, (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    res.json(req.body);
});

export default questionRouter;