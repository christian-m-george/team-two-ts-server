import express, { Request, Response, NextFunction, Router } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
// import extractJWT from '../utils/extractJWT';
// import dbMethods from '../_prismaClient/_prismaClient';
import jwt from 'jsonwebtoken';
import Cookie from '../utils/cookie';
import config from '../config';
import extractJWT from '../utils/extractJWT';

const surveyRouter: Router = express.Router();

surveyRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
    console.log('survey route accessed');
    res.send('hit the user endpoint');
})
  
surveyRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    // extractJWT(req, res, next);

    const cookie: Cookie = req.cookies;
    const hash = cookie.acctok;



    if(hash) {

        function parseJwt (token: string) {
            console.log(Buffer.from(token, 'base64').toString());
        };

        console.log(parseJwt(hash));
        // console.log(hash + " THIS IS HASH");
        // console.log(parseJwt(hash));

        jwt.verify(hash, config.token.tokenSecret, (error, decoded) => {
            if (error) {
                return res.status(400).json({
                    message: error.message,
                    error
                });
            }
            else {
                res.locals.jwt = decoded;
                console.log('success decode?')
                next();
            }
        })
    } else {
        res.status(401).json('unauthorized');
    }

    // const createUser = await dbMethods.surveyMethods.createInitialSurvey(newSurvey);
    // if(createUser) res.send(200);
    // else{res.send(500);
    // }
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