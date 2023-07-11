import { db } from "../database/database.connections";



export async function userTransactions(req,res){
  try{
    const userSessions =  db.collection("sessions")
    const usuaryTransactions = db.collection("transactions")
    const {authorization} = req.headers
    const token = authorization?.replace('Bearer ', '');
    if(!token) return res.sendStatus(401);

    const session = await userSessions.findOne({ token });
    if (!session) return res.sendStatus(401);

    const transactions = usuaryTransactions.findOne({_id: session.id})

    res.status(200).send(transactions)
  } catch(err) {
    console.log(err)
  }
}