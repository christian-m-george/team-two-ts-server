import dotenv from 'dotenv';
import config from './config';
import express, { Application } from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';

dotenv.config();

const app: Application = express();

// const environment = process.env.NODE_ENV === 'production' ? process.env.VERCEL_URL : process.env.REACT_URL;
// const HEROKU_URL = process.env.HEROKU_URL
// const VERCEL_URL = process.env.VERCEL_URL

app.use(cookieParser())
app.use(cors({
    origin: config.VERCEL_URL,
    credentials: true,
    
  }));
// app.use(cors({
//     origin: environment,
//     credentials: true,
    
//   }));
app.use(express.json())
app.enable('trust proxy')

export default app;