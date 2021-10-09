import config from '../config';
import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import Cookie from './cookie';
import parseJwt from './parseJWT';
import signJWT from './signJWT';
import signRefreshJWT from './signRefreshJWT';

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
    const cookie: Cookie = req.cookies;
    const hash = cookie.acctok;
    const refresh = cookie.reftok;
    
    if(hash) {
        // console.log('hash must have been true');
        jwt.verify(hash, config.token.tokenSecret, async (error, decoded) => {
            if (error) {
                console.log(error);
                return res.status(400).json({
                    message: error.message,
                    error
                });
            }
            else {
                // console.log('here 3');
                res.locals.jwt = decoded;
                next();
            }
        })
    } else if (refresh) {
        // console.log('refresh is true')
        jwt.verify(refresh, config.token.refreshSecret, async (error, decoded) => {
            if (error) {
                console.log(error);
                return res.status(400).json({
                    message: error.message,
                    error
                });
            }
            else {
                const {id,
                email,
                firstName,
                lastName,
                role} = parseJwt(refresh);
                signRefreshJWT(id, email, firstName, lastName, role, (error, token) => {
                    if(error) {
                      res.status(401).json({
                        message: 'unauthorized',
                        error: error
                      });
                    } else if (token) {
                    //   console.log(token + ' got a token bruh');
                      res.cookie('reftok', `${token}`, {
                        expires: new Date(Date.now() + 9000000),
                        httpOnly: true
                      });
                    }
                });
                signJWT(id, email, firstName, lastName, role, (error, token) => {
                    if(error) {
                      res.status(401).json({
                        message: 'unauthorized',
                        error: error
                      });
                    } else if (token) {
                      res.cookie('acctok', `${token}`, {
                        expires: new Date(Date.now() + 900000),
                        httpOnly: true
                      })
                      next();
                      }
                    else {
                      res.status(400).json('bad credentials')
                    }
                })
            }
    })}}

    
export default extractJWT