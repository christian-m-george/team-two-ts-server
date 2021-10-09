"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const userRouter_1 = __importDefault(require("./user/userRouter"));
const authRouter_1 = __importDefault(require("./auth/authRouter"));
const surveyRouter_1 = __importDefault(require("./survey/surveyRouter"));
const logout_1 = __importDefault(require("./user/logout"));
const config_1 = __importDefault(require("./config"));
const questionRouter_1 = __importDefault(require("./question/questionRouter"));
dotenv_1.default.config();
app_1.default.get("/", (req, res, next) => {
    res.send("hello, world!");
});
app_1.default.use('/user', userRouter_1.default);
app_1.default.use('/auth', authRouter_1.default);
app_1.default.use('/survey', surveyRouter_1.default);
app_1.default.use('/logout', logout_1.default);
app_1.default.use('/question', questionRouter_1.default);
app_1.default.listen(config_1.default.PORT, () => {
    console.log(`Example app listening at http://localhost:${config_1.default.PORT}`);
});
// const myUser = {
//     firstName: "yea",
//     lastName: "noreally",
//     email: "asdkfl1324AA!",
//     password: "yes123A!2"
// }
// const myEmail = "thisIs@aol.com";
// const newEmail = "asdf@aol.yes";
// const newPassword = "asdkfl1324AA!";
// const idNumber = 45;
// const logUser1 = async (user1: string) => {
//     const myUser = await userMethods.getUserByEmail(user1)
//     console.log(myUser);
// }
// const logUser2 = async (idNum: number) => {
//     const myUser = await userMethods.getUserById(idNum)
//     console.log(myUser);
// }
// userMethods.createUser(myUser);
// userMethods.deleteUser(myUser);
// userMethods.updatePassword(myUser, newPassword);
// logUser1(myEmail);
// logUser2(idNumber);
