import config from '../config';
import jwt from 'jsonwebtoken';

const surveySignJWT = (id: number, emails: string[], callback: (error: Error | null, token: string | null) => void): void => {
    const timeSinceEpoch = new Date().getTime();
    const expirationTime = timeSinceEpoch + Number(config.token.expireTime) * 100000;
    const expirationTimeInSeconds = Math.floor(expirationTime / 1000);

    try {

        jwt.sign(
        {
            id: id,
            emails: emails,
        },
            config.token.surveySecret,
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

export default surveySignJWT;