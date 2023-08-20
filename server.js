import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config({ path: ".env" });
mongoose.set("strictQuery", false);
//DATABASE_LOCAL=mongodb://127.0.0.1:27017/GRH
mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
  console.log(`DB connection sucessfull`);
});
const port = process.env.PORT || 9090;
const server = app.listen(port, () => {
  console.log(`We are listning to port : ${port}`);
});
