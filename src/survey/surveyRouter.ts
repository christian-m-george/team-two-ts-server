import express, { Request, Response, NextFunction, Router } from 'express';

const surveyRouter: Router = express.Router();

surveyRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
    console.log('survey route accessed');
    res.send('hit the user endpoint');
})
  
surveyRouter.post("/", (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    res.json(req.body);
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