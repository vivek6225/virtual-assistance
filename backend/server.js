
import express from "express";
import dotenv from "dotenv"
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

dotenv.config()

const app = express();
const port = process.env.PORT || 5000
connectDb();
app.use(express.json)
app.use(cookieParser)
app.use("/api/auth", authRouter)
 
app.listen(port, () => {
  
  console.log("Server running");
});