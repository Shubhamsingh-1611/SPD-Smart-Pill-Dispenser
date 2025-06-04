import express from "express"
import dotenv from "dotenv"
import cors from "cors"



import connectDb from "./DB/Db.js";
import patientRoutes from "./routes/patientRoutes.js";
import scheuleRoutes from "./routes/scheduleRoutes.js";
const app = express();
dotenv.config();


app.use(
    cors({
      origin: 'http://localhost:5173', // Frontend origin
      credentials: true,              // Allow cookies/auth headers
    })
  );
  
app.use(express.json());
//routing for the user
app.use("/api/patients",patientRoutes);
app.use("/api/patients/schedule",scheuleRoutes);

app.get("/",(req,res)=>{
    res.send("Server Ready")
})
app.listen(process.env.PORT,()=>{
    console.log("Listining to port 3000");
    connectDb();
})