import express, { Request, Response, NextFunction, Router } from 'express';
import dbMethods from '../_prismaClient/_prismaClient';
import Cookie from '../utils/cookie';
import UserPayload from '../user/userPayload';
import extractJWT from '../utils/extractJWT';
import Question from './question';

const questionRouter: Router = express.Router();

questionRouter.get("/", extractJWT, (req: Request, res: Response, next: NextFunction) => {

    console.log(req.body + 'question route accessed');
    res.send('question route accessed');
})

questionRouter.get("/:surveyId", extractJWT, async (req: Request, res: Response, next: NextFunction) => {
    console.log(JSON.stringify(req.params) + " questions by survey id route accessed");
    const id = parseInt(req.params.surveyId);
    console.log(id);
    const questions = await dbMethods.questionMethods.getAllQuestionsById(id);
        if (questions.length > 0) {
            console.log("here");
            return res.json(questions);
        } else {
            return res.status(400).json('no surveys');
        }
})

questionRouter.get("/all", extractJWT,  async (req: Request, res: Response, next: NextFunction) => {
    const surveyId = req.body.surveyId;
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
    const surveyId = req.body.surveyId;
    const order = req.body.num;
    console.log(surveyId + " THIS IS SURVEY ID" + " THIS IS THE ORDER " + order);
    const existingQuestions = await dbMethods.questionMethods.getQuestionBySurveyIdAndOrderFrag(surveyId, order);
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


    let array: string[] = [];
    
    req.body.answerFieldInputs.map((a: any) => {
        console.log(a + " " + JSON.stringify(a));
    array.push(a.value)});

    // console.log("THIS IS ANSWERS   " + answers)
    const question: Question = {
        surveyId: req.body.surveyId,
        order: req.body.num,
        questionType: req.body.questionType,
        questionText: req.body.questionInput,
        answers: array
    }




    if(existingQuestions.length > 0) {
        console.log("YES IT EXISTS");
        const updatedQuestion = dbMethods.questionMethods.updateQuestionByIdAndOrder(question);
        return res.json(updatedQuestion);
    } else {
        console.log(" ELSE I GUESS");
        // let array: string[] = [];
    
        // req.body.answerFieldInputs.map((a: any) => {
        //     console.log(a + " " + JSON.stringify(a));
        // array.push(a.value)});
    
        // const question: Question = {
        //     surveyId: req.body.surveyId,
        //     order: req.body.num,
        //     questionType: req.body.questionType,
        //     questionText: req.body.questionInput,
        //     answers: array
        // }
        const questionPosted = await dbMethods.questionMethods.addQuestion(question);
        if (questionPosted) {
            console.log(questionPosted);
            return res.json(questionPosted);
        } else {
            return res.status(400).json("not posted")
        }
    }
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