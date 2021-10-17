const NODE_ENV: string = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 8000;
const SERVER_TOKEN_EXPIRE_TIME = process.env.SERVER_TOKEN_EXPIRE_TIME || 3600;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'questioneer';
const SERVER_TOKEN_SECRET: string | Buffer | {
    key: string | Buffer;
    passphrase: string;
} = process.env.SERVER_TOKEN_SECRET || 'backupsecretitisntsogood';
const REFRESH_TOKEN_EXPIRE_TIME = process.env.REFRESH_TOKEN_EXPIRE_TIME || 3600000;
const REFRESH_TOKEN_SECRET: string | Buffer | {
    key: string | Buffer;
    passphrase: string;
} = process.env.REFRESH_TOKEN_SECRET || 'refreshtokensecretlol!!!';

const config = {
    NODE_ENV: NODE_ENV,
    PORT: PORT,
    token: {
        expireTime: SERVER_TOKEN_EXPIRE_TIME,
        issuer: SERVER_TOKEN_ISSUER,
        tokenSecret: SERVER_TOKEN_SECRET,
        refreshSecret: REFRESH_TOKEN_SECRET,
        refreshExpireTime: REFRESH_TOKEN_EXPIRE_TIME
    },
    VERCEL_URL: `https://team-two-client.vercel.app`,
    REACT_URL: `http://localhost:3000`
};

export default config;
