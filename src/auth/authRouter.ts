import express, { Request, Response, NextFunction, Router } from "express";

const authRouter: Router = express.Router();

authRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body, "this is the req body");
  res.json('hit auth get');
  next(console.log('yes'));
});

authRouter.post("/", (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body, "this is the req body");
  res.json();
});

export default authRouter;
