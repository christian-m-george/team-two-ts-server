import config from '../config';
import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import Cookie from './cookie';

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
    const cookie: Cookie = req.cookies;
    console.log(cookie);
    console.log(JSON.stringify(cookie));
    const hash = cookie.acctok;
    // const payload = hash.split('.')[1]
    
    if(hash) {
        jwt.verify(hash, config.token.tokenSecret, async (error, decoded) => {
            if (error) {
                console.log(error);
                return res.status(400).json({
                    message: error.message,
                    error
                });
            }
            else {
                console.log('here 3');
                res.locals.jwt = decoded;
                next();
            }
        })
    } else {
        res.status(401).json('not this time bozo');
    }
}

export default extractJWT