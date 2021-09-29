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
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const userRouter_1 = __importDefault(require("./user/userRouter"));
const authRouter_1 = __importDefault(require("./auth/authRouter"));
const surveyRouter_1 = __importDefault(require("./survey/surveyRouter"));
const config_1 = __importDefault(require("./config"));
const _prismaClient_1 = __importDefault(require("./_prismaClient/_prismaClient"));
dotenv_1.default.config();
app_1.default.get("/", (req, res, next) => {
    res.send("hello, world!");
});
app_1.default.use('/user', userRouter_1.default);
app_1.default.use('/auth', authRouter_1.default);
app_1.default.use('/survey', surveyRouter_1.default);
app_1.default.listen(config_1.default.PORT, () => {
    console.log(`Example app listening at http://localhost:${config_1.default.PORT}`);
});
const myUser = {
    firstName: "yea",
    lastName: "noreally",
    email: "asdkfl1324AA!",
    password: "yes123A!2"
};
const myEmail = "thisIs@aol.com";
const newEmail = "asdf@aol.yes";
const newPassword = "asdkfl1324AA!";
const idNumber = 45;
const newestUser = {
    firstName: "christian",
    lastName: "george",
    email: "christian.george@aol.com",
    password: "asdf1!12345"
};
const logUser1 = (user1) => __awaiter(void 0, void 0, void 0, function* () {
    const myUser = yield _prismaClient_1.default.getUserByEmail(user1);
    console.log(myUser);
});
const logUser2 = (idNum) => __awaiter(void 0, void 0, void 0, function* () {
    const myUser = yield _prismaClient_1.default.getUserById(idNum);
    console.log(myUser);
});
// userMethods.createUser(newestUser);
// userMethods.deleteUser(myUser);
// userMethods.updatePassword(myUser, newPassword);
logUser1(myEmail);
logUser2(idNumber);
