import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import dayjs from "dayjs";
import { signup, signin } from "./controllers/auth.controllers.js";

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);

export let db;

try {
  mongoClient.connect((err) => {
    if (err) {
      console.error(err);
      return;
    }
  });

  db = mongoClient.db();
  console.log(`${dayjs().format("HH:mm:ss")}: Conectado ao MongoDB`);

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}, juntamente ao Mongo!`);
  });
} catch (err) {
  console.log(err.message);
}

app.post("/cadastro", signup)

app.post("/", signin)