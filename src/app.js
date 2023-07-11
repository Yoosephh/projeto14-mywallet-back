import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js";

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use(userRouter);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}, juntamente ao Mongo!`);
});
