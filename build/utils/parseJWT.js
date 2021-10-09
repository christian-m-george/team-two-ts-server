"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseJwt = (token) => {
    const payload = token.split('.')[1];
    const payLoadObj = JSON.parse(Buffer.from(payload, 'base64').toString());
    return payLoadObj;
};
exports.default = parseJwt;
