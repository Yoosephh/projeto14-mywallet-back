import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import joi from "joi";
import dayjs from "dayjs";
import bcrypt from "bcrypt"

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);

let db;

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


app.post("/cadastro", async(req,res)=> {
  try{
    const usersCollection = db.collection("users")
    const {name, email, password} = req.body

    if(await usersCollection.findOne({ email })) return res.status(409).send("Email já cadastrado!")

    const userSchema = joi.object({
      name: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    });

    const validation = userSchema.validate({name, email, password}, { abortEarly: false });

    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }

    const criptedPassword = bcrypt.hashSync(10, password)
    await usersCollection.insertOne({name, email, password: criptedPassword})

    res.status(201).send("Cadastro realizado com sucesso! :)")
  } catch(err) {
    res.send(err)
  }
})