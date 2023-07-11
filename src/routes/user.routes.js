import {Router} from "express";
import { userTransactions } from "../controllers/user.controllers.js";

const userRouter = Router();

userRouter.get("/home", userTransactions)

export default userRouter