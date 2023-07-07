import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes.js"

const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(authRouter)

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}, juntamente ao Mongo!`);
});
