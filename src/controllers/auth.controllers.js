import joi from "joi";
import bcrypt from "bcrypt"
import { db } from "../app.js";
import {v4 as uuid} from "uuid"



export async function signup(req,res) {
  try{
    const usersCollection = db.collection("users")
    const {name, email, password} = req.body

    if(await usersCollection.findOne({ email })) return res.status(409).send("Email já cadastrado!")

    const userSchema = joi.object({
      name: joi.string().required().min(3),
      email: joi.string().email().required(),
      password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    });

    const validation = userSchema.validate({name, email, password}, { abortEarly: false });

    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }

    const criptedPassword = bcrypt.hashSync(password, 10);

    await usersCollection.insertOne({name, email, password: criptedPassword})

    res.status(201).send("Cadastro realizado com sucesso! :)")

  } catch(err) {
    res.status(400).send(err)
    console.log(err)
  }
}

export async function signin(req,res) {
  try{
    const usersCollection = db.collection("users")
    const {email, password} = req.body

    const userSchema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    });

    const validation = userSchema.validate({email, password}, { abortEarly: false });

    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }

    if(!await usersCollection.findOne({ email })) return res.status(404).send("Email não cadastrado!")
    
    const user = usersCollection.findOne({email})
    if (user && !bcrypt.compareSync(password, user.password)) {
      return res.status(401).send("Email ou senha incorretos!")
    }
    if(user && bcrypt.compareSync(password, user.password)){
      const token = uuid()
      await db.collection("sessions").insertOne({userId: user._id,token})
        res.status(200).send(token);
    }

  } catch(err) {
    res.status(400).send(err)
    console.log(err)
  }
}