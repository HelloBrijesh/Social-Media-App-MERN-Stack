import express from "express";
import { PORT, DB_URL } from "./config";
import router from "./routes";
import mongoose from "mongoose";
import cors from "cors";
import errorHandler from "./middleware/errorHandler";

const app = express();
app.use(cors());
app.use(express.json());

//database connectivity
mongoose.connect(DB_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("db connected....");
});

app.use("/api", router);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
