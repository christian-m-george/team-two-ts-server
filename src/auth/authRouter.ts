import express, { Request, Response, NextFunction, Router } from "express";
import userMethods from "../_prismaClient/_prismaClient";
import argon2 from 'argon2';

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
  if (!userEmail) res.send('missing email');
  if (!userPassword) res.send('missing password')
  else {
      const myUser = await userMethods.getUserByEmail(userEmail);
      const hashedPassword = myUser?.password;
      console.log("THIS IS USER: " + myUser?.password);
      const checkPassword = myUser?.password;
      if(hashedPassword != undefined) {
        try {
          if(await argon2.verify(hashedPassword, userPassword)) {
            res.send('succesful login')
          } else {
            res.send("invalid username or password")
          }
        } catch(err) {
          console.log(err);
        }
      }
  }
});


export default authRouter;
