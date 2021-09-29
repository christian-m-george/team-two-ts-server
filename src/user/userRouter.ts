import express, { Request, Response, NextFunction, Router } from 'express';
import userMethods from '../_prismaClient/_prismaClient';
const userRouter: Router = express.Router();
import argon2 from 'argon2';



// Handles requests for User objects individually. 
// Full data that it sends should not necessarily go to client
userRouter.get("/", async (req: Request, res: Response, next: NextFunction) =>  {
    const userEmail: string = req.body.email;
    if (!userEmail) res.send(400);
    else {
        const myUser = await userMethods.getUserByEmail(userEmail);
        if (myUser) res.send(myUser)
        else res.send("user not found");
    }
})

// Handles User creation, still requires validation of input data. 
// Also requires implementation of password encryption
userRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {

    const hashedPassword = await argon2.hash(req.body.password);

    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword
    }
    console.log(hashedPassword);

    const addUser = await userMethods.createUser(newUser).then(data => res.json(data)).catch(err => {
        console.log(err)
        res.send("email already exists");
    })
    return addUser;
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
    
    const resetEmail = await userMethods.updateEmail(user, newEmail).then(() => res.json('email updated')).catch(err => {
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
        const resetPassword = await userMethods.updatePassword(user, newPassword).then(() => res.json('password updated')).catch(err => {
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
    const removeUser = await userMethods.deleteUser(user).then(() => res.json('user deleted')).catch(err => {
        console.log(err);
        res.send("user not found or something else went wrong lol");
    })

    return removeUser;
});

export default userRouter;
