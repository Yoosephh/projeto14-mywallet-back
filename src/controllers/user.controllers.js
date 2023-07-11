import { db } from "../database/database.connections.js";



export async function userTransactions(req,res){
  try{
    const { userId } = res.locals.session
    console.log(userId)

    const session = await db.collection("sessions").find({ userId });
    if (!session) console.log("deu ruim aqui");

    const transactions = await db.collection("transactions").find({userId}).sort({ $natural: -1 }).toArray();

    res.status(200).send(transactions)
  } catch(err) {

    console.log(err.message)

  }
}

export async function newTransaction(req,res){
  try{
    const {userId} = res.locals.session

    console.log(userId)

    const {value, description, type} = req.body
    await db.collection("transactions").insertOne({time: Date.now(), type, value:Number(value.replace(",", ".")), description, userId})

    res.sendStatus(201)
  } catch (err){
    console.log(err)
  }
}