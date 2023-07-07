import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import dayjs from "dayjs";


dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);

export let db;

try {
  mongoClient.connect((err) => {
    if (err) {
      console.error(err);
      return;
    }
  });

  db = mongoClient.db();
  console.log(`${dayjs().format("HH:mm:ss")}: Conectado ao MongoDB`);

} catch (err) {
  console.log(err.message);
}