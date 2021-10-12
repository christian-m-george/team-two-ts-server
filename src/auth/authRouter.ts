import express, { Request, Response, NextFunction, Router } from "express";
import dbMethods from "../_prismaClient/_prismaClient";
import argon2 from 'argon2';
import signJWT from '../utils/signJWT';
import { UserPayloadDTO } from "./authPayload";
import signRefreshJWT from "../utils/signRefreshJWT";

const authRouter: Router = express.Router();

// authRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
//   console.log(req.body, "this is the req body");
//   res.json();
// });

// Handles User logins
// Needs to send an authorization token to client
authRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const userEmail: string = req.body.email;
  const userPassword: string = req.body.password;
  if (!userEmail || !userPassword || userEmail.length<=4 || userPassword.length <= 6) {
    console.log('here broooo')
    return res.sendStatus(400);
  }
  else {
      const myUser: UserPayloadDTO | null = await dbMethods.userMethods.getUserByEmail(userEmail);
      const hashedPassword = myUser?.password;
  
      if(hashedPassword != undefined && myUser) {
        // myUser.password = hashedPassword;

        try {
          const verifyUser = await argon2.verify(hashedPassword, userPassword).catch(err => console.log(err));
          if(verifyUser) {
            // console.log('got here');
            signRefreshJWT(myUser.id, myUser.email, myUser.firstName, myUser.lastName, myUser.role, (error, token) => {
              if(error) {
                res.status(401).json({
                  message: 'unauthorized',
                  error: error
                });
              } else if (token) {
                console.log(token + ' got a token bruh');
                res.cookie('reftok', `${token}`, {
                  expires: new Date(Date.now() + 9000000),
                  httpOnly: true,
                  secure: true
                })
              }
            });
          } else {
            res.status(400).json('bad credentials')
          }
            signJWT(myUser.id, userEmail, myUser.firstName, myUser.lastName, myUser.role, (error, token) => {
              if(error) {
                res.status(401).json({
                  message: 'unauthorized',
                  error: error
                });
              } else if (token) {
                console.log(token + ' got a token bruh');
                res.status(200).cookie('acctok', `${token}`, {
                  expires: new Date(Date.now() + 900000),
                  httpOnly: true,
                  secure: true
                }).json({
                  message: 'auth succesful',
                  token,
                  id: myUser.id,
                  email: userEmail
                });
              }
              else {
                res.status(400).json('bad credentials')
              }
            });
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
