import express from 'express';
import chalk from "chalk";
import cors from "cors";
import joi from "joi";
import db from './database.js';
import LoginRouter from "./routes/loginRouter.js";


const app = express();
app.use(express.json());

app.use(cors());
app.use(LoginRouter)
//app.post('/signup', async (req, res) => {
   //console.log('teste')
  // res.sendStatus(201);
//});

app.listen(process.env.PORT, () => {
    console.log("Server is listening on port "+process.env.PORT);
  });