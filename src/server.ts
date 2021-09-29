import dotenv from 'dotenv';
import app from './app';
import userRouter from './user/userRouter';
import authRouter from './auth/authRouter';
import surveyRouter from './survey/surveyRouter';
import config from './config';
import {Request, Response, NextFunction} from 'express';
import userMethods from './_prismaClient/_prismaClient';
import User from './user/user';


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

// const myUser = {
//     firstName: "yea",
//     lastName: "noreally",
//     email: "asdkfl1324AA!",
//     password: "yes123A!2"
// }

// const myEmail = "thisIs@aol.com";
// const newEmail = "asdf@aol.yes";
// const newPassword = "asdkfl1324AA!";
// const idNumber = 45;




// const logUser1 = async (user1: string) => {
//     const myUser = await userMethods.getUserByEmail(user1)
//     console.log(myUser);
// }
// const logUser2 = async (idNum: number) => {
//     const myUser = await userMethods.getUserById(idNum)
//     console.log(myUser);
// }

// userMethods.createUser(myUser);
// userMethods.deleteUser(myUser);
// userMethods.updatePassword(myUser, newPassword);



// logUser1(myEmail);
// logUser2(idNumber);