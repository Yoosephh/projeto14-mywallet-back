import { db } from "../database/database.connections.js";

export async function authUser(req, res, next) {

  const {authorization} = req.headers

  const token = authorization?.replace('Bearer ', '');

  if(!token) return res.sendStatus(401);

  try{
    const session = await db.collection("sessions").findOne({ token });
    if (!session) console.log("deu ruim aqui");

    res.locals.session = session

    next()
  }catch (err){
    console.log(err.message)
  }
}