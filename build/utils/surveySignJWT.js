"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const surveySignJWT = (id, emails, callback) => {
    const timeSinceEpoch = new Date().getTime();
    const expirationTime = timeSinceEpoch + Number(config_1.default.token.expireTime) * 100000;
    const expirationTimeInSeconds = Math.floor(expirationTime / 1000);
    try {
        jsonwebtoken_1.default.sign({
            id: id,
            emails: emails,
        }, config_1.default.token.surveySecret, {
            issuer: config_1.default.token.issuer,
            algorithm: "HS256",
            expiresIn: expirationTimeInSeconds
        }, (error, token) => {
            if (error) {
                callback(error, null);
            }
            else if (token) {
                callback(null, token);
            }
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.default = surveySignJWT;
