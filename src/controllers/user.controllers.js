import { db } from "../database/database.connections.js";


const userSessions =  db.collection("sessions")
const usuaryTransactions = db.collection("transactions")
export async function userTransactions(req,res){
  try{
    const userId = res.locals.userId
    const {authorization} = req.headers
    const token = authorization?.replace('Bearer ', '');
    if(!token) return res.sendStatus(401);

    const session = await userSessions.findOne({ token });
    if (!session) return res.sendStatus(401);

    const transactions = usuaryTransactions.find({userId}).sort({ $natural: -1 }).toArray();

    res.status(200).send(transactions)
  } catch(err) {
    console.log(err.message)
  }
}


export async function newTransaction(req,res){
  try{
    const {authorization} = req.headers
    const token = authorization?.replace('Bearer ', '');
    if(!token) return res.sendStatus(401);
    const {value, description, type} = req.body
    await usuaryTransactions.insertOne({time: Date.now(), type, value, description, userId})

    res.sendStatus(201)
  } catch (err){
    console.log(err.message)
  }
}