import {Router} from "express";
import { userTransactions , newTransaction} from "../controllers/user.controllers.js";
import { authUser } from "../middlewares/auth.middleware.js";

const userRouter = Router();
userRouter.use(authUser)

userRouter.get("/home", userTransactions)

userRouter.post("/nova-transacao/:tipo", newTransaction)

export default userRouter