import dotenv from 'dotenv';
import express, { Application } from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';

dotenv.config();

const app: Application = express();

const environment = process.env.NODE_ENV === 'production' ? process.env.HEROKU_URL : process.env.REACT_URL;

app.use(cookieParser())
app.use(cors({
    origin: environment,
    credentials: true,
    
  }));
// app.use(cors({
//     origin: environment,
//     credentials: true,
    
//   }));
app.use(express.json())
app.enable('trust proxy')

export default app;