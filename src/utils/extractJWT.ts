import config from '../config';
import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization?.split(' ')[1];

    if(token) {
        jwt.verify(token, config.token.tokenSecret, (error, decoded) => {
            if (error) {
                return res.status(400).json({
                    message: error.message,
                    error
                });
            }
            else {
                res.locals.jwt = decoded;
                next();
            }
        })
    } else {
        res.status(401).json('unauthorized');
    }
}

export default extractJWT;