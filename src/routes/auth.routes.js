import {Router} from "express";
import { signup, signin } from "../controllers/auth.controllers.js";

const authRouter = Router();

authRouter.post("/cadastro", signup)

authRouter.post("/", signin)

export default authRouter