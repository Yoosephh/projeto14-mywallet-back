import {Router} from "express";
import { userTransactions , newTransaction} from "../controllers/user.controllers.js";

const userRouter = Router();

userRouter.get("/home", userTransactions)

userRouter.post("/nova-transacao/:tipo", newTransaction)

export default userRouter