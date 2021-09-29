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
const authRouter = express_1.default.Router();
authRouter.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    if (!userEmail)
        res.send('missing email');
    if (!userPassword)
        res.send('missing password');
    else {
        const myUser = yield _prismaClient_1.default.getUserByEmail(userEmail);
        const checkPassword = myUser === null || myUser === void 0 ? void 0 : myUser.password;
        if (checkPassword === userPassword)
            res.send('succesful login');
        else
            res.send("invalid username or password");
    }
}));
authRouter.post("/", (req, res, next) => {
    console.log(req.body, "this is the req body");
    res.json();
});
exports.default = authRouter;
