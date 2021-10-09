import config from '../config';
import jwt from 'jsonwebtoken';
import UserPayload from '../user/userPayload';

const signRefreshJWT = (id: number, email: string, firstName: string, lastName: string, role: string, callback: (error: Error | null, token: string | null) => void): void => {
    const timeSinceEpoch = new Date().getTime();
    const expirationTime = timeSinceEpoch + Number(config.token.expireTime) * 1000000;
    const expirationTimeInSeconds = Math.floor(expirationTime / 1000);
    try {
        jwt.sign(
        {
            id: id,
            email: email,
            firstName: firstName,
            lastName: lastName,
            role: role
        },
            config.token.refreshSecret,
        {
            issuer: config.token.issuer,
            algorithm: "HS256",
            expiresIn: expirationTimeInSeconds
        },
        (error, token) => {
            if(error) {
                callback(error, null);
            } else if (token) {
                callback(null, token);
            }
        })
    } catch(error) {
        console.log(error);
    }
}

export default signRefreshJWT;