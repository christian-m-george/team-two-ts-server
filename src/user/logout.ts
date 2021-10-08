import express, { Request, Response, Router } from 'express';

const logoutRouter: Router = express.Router();

logoutRouter.get('/', (req: Request, res: Response) => {
    res.clearCookie('acctok').send(200);
})

export default logoutRouter;