import dotenv from "dotenv"
dotenv.config();
import express from "express";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import userRouter from "./routes/user.routes.js";
import geminiResponse from "./gemini.js";


const app = express();
app.use(cors({
  origin:"http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],

  credentials:true
}))
const port = process.env.PORT || 5000
connectDb();
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)

app.get("/", async (req,res)=>{
  let prompt=req.query.prompt
   console.log(prompt)
  let data = await geminiResponse(prompt)
    console.log(data)
  res.json(data)
})

 
app.listen(port, () => {
  
  console.log("Server running");
});