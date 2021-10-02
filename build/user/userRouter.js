"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const _prismaClient_1 = __importDefault(require("../_prismaClient/_prismaClient"));
const argon2_1 = __importDefault(require("argon2"));
const userRouter = express_1.default.Router();
// Handles requests for User objects individually by email. 
// Full data that it sends should not necessarily go to client. need to fix that
userRouter.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = req.body.email;
    if (!userEmail)
        res.send(400);
    else {
        const myUser = yield _prismaClient_1.default.userMethods.getUserByEmail(userEmail);
        if (myUser)
            res.send(myUser);
        else
            res.send("user not found");
    }
}));
// Handles User creation, still requires validation of input data. 
// Also requires implementation of password encryption
userRouter.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield argon2_1.default.hash(req.body.password);
    if (!hashedPassword)
        return res.json(500);
    else {
        const newUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword
        };
        const userEmail = req.body.email;
        const myUser = yield _prismaClient_1.default.userMethods.getUserByEmail(userEmail);
        if (myUser) {
            return res.status(400).json("user exists already");
        }
        else {
            const addUser = yield _prismaClient_1.default.userMethods.createUser(newUser).then(data => res.json(data)).catch(err => {
                console.log(err);
                res.json("email already exists");
            });
            return addUser;
        }
    }
}));
// Allows user to change their email address
// Right now it requires that a full User type input and a new email, all in the Request body. 
// It should only require some kind of authorization and a new email
userRouter.patch("/email", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    };
    const newEmail = req.body.newEmail;
    if (!user)
        res.send('invalid user');
    const resetEmail = yield _prismaClient_1.default.userMethods.updateEmail(user, newEmail).then(() => res.json('email updated')).catch(err => {
        console.log(err);
        res.send("invalid email");
    });
    return resetEmail;
}));
// Allows user to change their password
// Right now it requires that a full User type input and a new password, all in the Request body. 
// It should only require some kind of authorization and a new password
// Must also implement a way to issue a password reset token to an email
userRouter.patch("/password", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    };
    const newPassword = req.body.newPassword;
    if (!user)
        res.send('invalid user');
    else {
        const resetPassword = yield _prismaClient_1.default.userMethods.updatePassword(user, newPassword).then(() => res.json('password updated')).catch(err => {
            console.log(err);
            res.send("invalid user or password");
        });
        return resetPassword;
    }
}));
// Allows for User account deletion
// The data service finds the user by email
// That is not necessarily ideal
userRouter.delete("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    };
    const removeUser = yield _prismaClient_1.default.userMethods.deleteUser(user).then(() => res.json('user deleted')).catch(err => {
        console.log(err);
        res.send("user not found or something else went wrong lol");
    });
    return removeUser;
}));
exports.default = userRouter;
