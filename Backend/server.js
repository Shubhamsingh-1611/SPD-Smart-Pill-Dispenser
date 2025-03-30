import express from "express"
import dotenv from "dotenv"


import connectDb from "./DB/Db.js";
import userRoutes from "./routes/userRoutes.js"
const app = express();
dotenv.config();

app.use(express.json());
//routing for the user
app.use("/api/users",userRoutes);


app.get("/",(req,res)=>{
    res.send("Server Ready")
})
app.listen(process.env.PORT,()=>{
    console.log("Listining to port 3000");
    connectDb()
})