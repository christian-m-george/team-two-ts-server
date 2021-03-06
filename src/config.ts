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
const SURVEY_TOKEN_EXPIRE_TIME = process.env.REFRESH_TOKEN_EXPIRE_TIME || 3600000;
const SURVEY_TOKEN_SECRET: string | Buffer | {
    key: string | Buffer;
    passphrase: string;
} = process.env.REFRESH_TOKEN_SECRET || 'dufahds@&*#EHQBFUESbfuaesb!!!';


const EMAIL_HOST = process.env.EMAIL_HOST || "smtp.gmail.com"
const EMAIL_PORT = process.env.EMAIL_PORT || 587
const EMAIL_AUTH = process.env.EMAIL_AUTH || "teamtwoagile@gmail.com" // generated ethereal user
const EMAIL_PASS = process.env.EMAIL_PASS || "Teamtwoagile1!"

const config = {
    NODE_ENV: NODE_ENV,
    PORT: PORT,
    mail: "",
    token: {
        expireTime: SERVER_TOKEN_EXPIRE_TIME,
        issuer: SERVER_TOKEN_ISSUER,
        tokenSecret: SERVER_TOKEN_SECRET,
        refreshSecret: REFRESH_TOKEN_SECRET,
        refreshExpireTime: REFRESH_TOKEN_EXPIRE_TIME,
        surveySecret: SURVEY_TOKEN_SECRET,
        surveyExpireTime: SURVEY_TOKEN_EXPIRE_TIME
    },
    email: {
        emailHost: EMAIL_HOST,
        emailPort: EMAIL_PORT,
        emailAuth: EMAIL_AUTH,
        emailPass: EMAIL_PASS
    },
    VERCEL_URL: `https://team-two-client.vercel.app`,
    REACT_URL: `http://localhost:3000`
};

export default config;
