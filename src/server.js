import dotenv from 'dotenv';
import express from 'express'
import helmet from 'helmet'
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan"

import { mongoConnect } from "./utils/mongo.js";
import userRouter from './routes/user/user.router.js';
import dashboardRouter from './routes/dashboard/dashboard.router.js';

const app = express();
dotenv.config();

app.use(helmet())
const PORT = process.env.PORT || 8080;


app.use(express.json());
app.use(morgan('combined'));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());



app.use('/user', userRouter)
app.use('/dashboard', dashboardRouter)



async function startServer() {
  await mongoConnect();
  app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`))
}

startServer();

// username: AsaadKhan
// password: texinity123


// username: HassamMurtaza
// password: texinity123