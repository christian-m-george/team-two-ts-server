import express, { Request, Response, Router } from 'express';

const logoutRouter: Router = express.Router();

logoutRouter.get('/', (req: Request, res: Response) => {
    console.log('hit logout route');
    res.clearCookie('acctok').clearCookie('reftok').send(200);
})

export default logoutRouter;