import express, { Request, Response, NextFunction, Router } from 'express';
import userMethods from '../_prismaClient/_prismaClient';
const userRouter: Router = express.Router();

userRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
    console.log('user route accessed');
    res.send('hit the user endpoint');
})
  
userRouter.post("/", (req: Request, res: Response, next: NextFunction) => {
    next()
    res.json(req.body);
});
userRouter.patch("/", (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    res.json(req.body);
});
userRouter.delete("/", (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    res.json(req.body);
});

export default userRouter;

