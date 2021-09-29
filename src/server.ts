import dotenv from 'dotenv';
import app from './app';
import userRouter from './user/userRouter';
import authRouter from './auth/authRouter';
import surveyRouter from './survey/surveyRouter';
import config from './config';
import {Request, Response, NextFunction} from 'express';
import userMethods from './_prismaClient/_prismaClient';


dotenv.config();

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("hello, world!");
});
  
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/survey', surveyRouter);
  
app.listen(config.PORT, (): void => {
    console.log(`Example app listening at http://localhost:${config.PORT}`);
});




