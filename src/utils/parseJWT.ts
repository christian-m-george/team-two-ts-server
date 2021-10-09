import UserPayload from "../user/userPayload";

const parseJwt = (token: string): UserPayload => {
    const payload = token.split('.')[1];
    const payLoadObj = JSON.parse(Buffer.from(payload, 'base64').toString());
    return payLoadObj;
}

export default parseJwt;