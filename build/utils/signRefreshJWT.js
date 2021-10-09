"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signRefreshJWT = (id, email, firstName, lastName, role, callback) => {
    const timeSinceEpoch = new Date().getTime();
    const expirationTime = timeSinceEpoch + Number(config_1.default.token.expireTime) * 1000000;
    const expirationTimeInSeconds = Math.floor(expirationTime / 1000);
    try {
        jsonwebtoken_1.default.sign({
            id: id,
            email: email,
            firstName: firstName,
            lastName: lastName,
            role: role
        }, config_1.default.token.refreshSecret, {
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
exports.default = signRefreshJWT;
