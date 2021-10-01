import config from '../config';
import jwt from 'jsonwebtoken';

const signJWT = (email: string, callback: (error: Error | null, token: string | null) => void): void => {
    const timeSinceEpoch = new Date().getTime();
    const expirationTime = timeSinceEpoch + Number(config.token.expireTime) * 100000;
    const expirationTimeInSeconds = Math.floor(expirationTime / 1000);

    try {
        
        jwt.sign(
        {
            email: email,
        },
            config.token.tokenSecret,
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

export default signJWT;