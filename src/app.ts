import dotenv from 'dotenv';
import express, { Application } from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';

dotenv.config();

const app: Application = express();

app.use(cookieParser())
app.use(cors({
    origin : "http://localhost:3000",
    credentials: true,
  }));
app.use(express.json())
app. enable('trust proxy')

export default app;