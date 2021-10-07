const NODE_ENV: string = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 8000;
const SERVER_TOKEN_EXPIRE_TIME = process.env.SERVER_TOKEN_EXPIRE_TIME || 3600;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'questioneer';
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'backupsecretitisntsogood';
const REFRESH_TOKEN_EXPIRE_TIME = process.env.REFRESH_TOKEN_EXPIRE_TIME || 3600000;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refreshtokensecretlol!!!';

const config = {
    NODE_ENV: NODE_ENV,
    PORT: PORT,
    token: {
        expireTime: SERVER_TOKEN_EXPIRE_TIME,
        issuer: SERVER_TOKEN_ISSUER,
        tokenSecret: SERVER_TOKEN_SECRET
    }
};

export default config;
