import express from "express"
import dotenv from "dotenv"


import connectDb from "./DB/Db.js";

const app = express();
dotenv.config();


app.get("/",(req,res)=>{
    res.send("Server Ready")
})
app.listen(process.env.PORT,()=>{
    console.log("Listining to port 3000");
    connectDb()
})