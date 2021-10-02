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
const signJWT_1 = __importDefault(require("../utils/signJWT"));
const authRouter = express_1.default.Router();
// authRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
//   console.log(req.body, "this is the req body");
//   res.json();
// });
// Handles User logins
// Needs to send an authorization token to client
authRouter.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(JSON.stringify(req.body) + " THIS IS BODY ");
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    if (!userEmail || !userPassword)
        res.send('missing credentials');
    else {
        const myUser = yield _prismaClient_1.default.userMethods.getUserByEmail(userEmail);
        const hashedPassword = myUser === null || myUser === void 0 ? void 0 : myUser.password;
        if (hashedPassword != undefined && myUser) {
            myUser.password = hashedPassword;
            try {
                if (yield argon2_1.default.verify(hashedPassword, userPassword)) {
                    (0, signJWT_1.default)(myUser.id, userEmail, myUser.firstName, myUser.lastName, myUser.role, (error, token) => {
                        if (error) {
                            res.status(401).json({
                                message: 'unauthorized',
                                error: error
                            });
                        }
                        else if (token) {
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
                }
                else {
                    res.status(400).json('bad credentials');
                }
            }
            catch (err) {
                return res.status(500).json({
                    message: err,
                    err
                });
            }
        }
    }
}));
exports.default = authRouter;
