import express, { Request, Response, NextFunction, Router } from "express";
import dbMethods from "../_prismaClient/_prismaClient";
import argon2 from 'argon2';
import signJWT from '../utils/signJWT';

const authRouter: Router = express.Router();

// authRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
//   console.log(req.body, "this is the req body");
//   res.json();
// });

// Handles User logins
// Needs to send an authorization token to client
authRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
  // console.log(JSON.stringify(req.body) + " THIS IS BODY ");
  const userEmail: string = req.body.email;
  const userPassword: string = req.body.password;
  if (!userEmail || !userPassword) res.send('missing credentials')
  else {
      const myUser = await dbMethods.userMethods.getUserByEmail(userEmail);
      const hashedPassword = myUser?.password;
      if(hashedPassword != undefined) {
        try {
          if(await argon2.verify(hashedPassword, userPassword)) {
            signJWT(userEmail, (error, token) => {
              if(error) {
                res.status(401).json({
                  message: 'unauthorized',
                  error: error
                });
              } else if (token) {
                // console.log(token + ' got a token bruh');
                res.status(200).cookie('acctok', `${token}`, {
                  expires: new Date(Date.now() + 900000),
                  httpOnly: true
                }).json({
                  message: 'auth succesful',
                  token,
                  email: userEmail
                });
              }
            });
          } else {
            res.status(400).json('bad credentials')
          }
        } catch(err) {
          return res.status(500).json({
            message: err,
            err
          })
        }
      }
  }
});


export default authRouter;
