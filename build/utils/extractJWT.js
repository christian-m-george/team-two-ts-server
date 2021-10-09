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
const config_1 = __importDefault(require("../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const parseJWT_1 = __importDefault(require("./parseJWT"));
const signJWT_1 = __importDefault(require("./signJWT"));
const signRefreshJWT_1 = __importDefault(require("./signRefreshJWT"));
const extractJWT = (req, res, next) => {
    const cookie = req.cookies;
    const hash = cookie.acctok;
    const refresh = cookie.reftok;
    if (hash) {
        // console.log('hash must have been true');
        jsonwebtoken_1.default.verify(hash, config_1.default.token.tokenSecret, (error, decoded) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                console.log(error);
                return res.status(400).json({
                    message: error.message,
                    error
                });
            }
            else {
                // console.log('here 3');
                res.locals.jwt = decoded;
                next();
            }
        }));
    }
    else if (refresh) {
        // console.log('refresh is true')
        jsonwebtoken_1.default.verify(refresh, config_1.default.token.refreshSecret, (error, decoded) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                console.log(error);
                return res.status(400).json({
                    message: error.message,
                    error
                });
            }
            else {
                const { id, email, firstName, lastName, role } = (0, parseJWT_1.default)(refresh);
                (0, signRefreshJWT_1.default)(id, email, firstName, lastName, role, (error, token) => {
                    if (error) {
                        res.status(401).json({
                            message: 'unauthorized',
                            error: error
                        });
                    }
                    else if (token) {
                        //   console.log(token + ' got a token bruh');
                        res.cookie('reftok', `${token}`, {
                            expires: new Date(Date.now() + 9000000),
                            httpOnly: true
                        });
                    }
                });
                (0, signJWT_1.default)(id, email, firstName, lastName, role, (error, token) => {
                    if (error) {
                        res.status(401).json({
                            message: 'unauthorized',
                            error: error
                        });
                    }
                    else if (token) {
                        res.cookie('acctok', `${token}`, {
                            expires: new Date(Date.now() + 900000),
                            httpOnly: true
                        });
                        next();
                    }
                    else {
                        res.status(400).json('bad credentials');
                    }
                });
            }
        }));
    }
};
exports.default = extractJWT;
