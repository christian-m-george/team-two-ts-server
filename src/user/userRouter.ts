import express, { Request, Response, NextFunction, Router } from 'express';
import dbMethods from '../_prismaClient/_prismaClient';
import argon2 from 'argon2';
import sendResetEmail from '../utils/sendResetEmail';
import signJWT from '../utils/signJWT';
import jwt from 'jsonwebtoken';
import config from '../config';
import authRouter from '../auth/authRouter';
import parseJwt from '../utils/parseJWT';


const userRouter: Router = express.Router();

// Handles requests for User objects individually by email. 
// Full data that it sends should not necessarily go to client. need to fix that
userRouter.get("/", async (req: Request, res: Response, next: NextFunction) =>  {
    const userEmail: string = req.body.email;
    if (!userEmail) res.send(400);
    else {
        const myUser = await dbMethods.userMethods.getUserByEmail(userEmail);
        if (myUser) res.send(myUser)
        else res.send("user not found");
    }
})

// Handles User creation, still requires validation of input data. 
// Also requires implementation of password encryption
userRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {

    const hashedPassword = await argon2.hash(req.body.password);
    if(!hashedPassword) return res.json(500)
    else {
        const newUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword
        }

        const userEmail: string = req.body.email;
        const myUser = await dbMethods.userMethods.getUserByEmail(userEmail);
        if(myUser) {
            return res.status(400).json("user exists already");
        } else {
            const addUser = await dbMethods.userMethods.createUser(newUser).then(data =>  
                res.json(data)).catch(err => {
                console.log(err)
                res.json("email already exists");
                })
            return addUser;
        }
    }
});

// Allows user to change their email address
// Right now it requires that a full User type input and a new email, all in the Request body. 
// It should only require some kind of authorization and a new email
userRouter.patch("/email", async (req: Request, res: Response, next: NextFunction) => {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }

    const newEmail = req.body.newEmail;

    if (!user) res.send('invalid user');
    
    const resetEmail = await dbMethods.userMethods.updateEmail(user, newEmail).then(() => res.json('email updated')).catch(err => {
        console.log(err);
        res.send("invalid email");
    })
    return resetEmail;
});

// Allows user to change their password
// Right now it requires that a full User type input and a new password, all in the Request body. 
// It should only require some kind of authorization and a new password
// Must also implement a way to issue a password reset token to an email
userRouter.patch("/password", async (req: Request, res: Response, next: NextFunction) => {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }

    const newPassword = req.body.newPassword;

    if (!user) res.send('invalid user')
    else {
        const resetPassword = await dbMethods.userMethods.updatePassword(user, newPassword).then(() => res.json('password updated')).catch(err => {
            console.log(err);
            res.send("invalid user or password");
        })
        return resetPassword;
    }
});

// Allows for User account deletion
// The data service finds the user by email
// That is not necessarily ideal
userRouter.delete("/", async (req: Request, res: Response, next: NextFunction) => {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }
    const removeUser = await dbMethods.userMethods.deleteUser(user).then(() => res.json('user deleted')).catch(err => {
        console.log(err);
        res.send("user not found or something else went wrong lol");
    })

    return removeUser;
});

// Handles requests for User objects individually by email. 
// Full data that it sends should not necessarily go to client. need to fix that
userRouter.post("/change-password", async (req: Request, res: Response, next: NextFunction) =>  {
    console.log("HIT ROUTE");
    const userEmail: string = req.body.email;
    if (!userEmail) res.send(400);
    else {

        const myUser = await dbMethods.userMethods.getUserByEmail(userEmail);

        if (myUser) {
            signJWT(myUser.id, userEmail, myUser.firstName, myUser.lastName, myUser.role, (error, token) => {
                if(error) {
                  res.status(401).json({
                    message: 'error with user account',
                    error: error
                  });
                } else if (token) {
                  let resetPath = `https://team-two-client.vercel.app/change-password/${token}`

                  const resetEmailData = {  
                    to: [`${userEmail}`],
                    subject: "Reset your password",
                    text: "Reset your password",
                    html: "",
                    resetUrl: `${resetPath}`

                  }

                  sendResetEmail(resetEmailData)
                  res.send(200);


                } else {
                    res.sendStatus(200)
}})}}})

userRouter.post('/check-token', (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.acctok;
    console.log('validating: ' + JSON.stringify(token))
    if(!token) {
        res.sendStatus(400);
    } else {
        jwt.verify(token, config.token.tokenSecret, async (error: any, decoded: any) => {
            if (error) {
                console.log(error);
                return res.status(400).json({
                    message: error.message,
                    error
                });
            }
            else {
                console.log('validated');
                res.sendStatus(200);
            }
        })
    }
})


userRouter.patch('/reset-password', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = parseJwt(req.body.token);
    const hashedPassword = await argon2.hash(req.body.newPassword);
    if(!id || !hashedPassword) {
        res.sendStatus(400);
    } else {
        const updated = await dbMethods.userMethods.updatePasswordByUserId(id, hashedPassword)
        if(updated) {
            res.sendStatus(200);
        } else {
            res.sendStatus(400);
        }
    }
})



export default userRouter;
