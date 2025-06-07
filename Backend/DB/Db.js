import mongoose from "mongoose"
const connectDb = async ()=>{
    try{
       const con =  await mongoose.connect(process.env.MONGO, {
        connectTimeoutMS: 30000, // 30 seconds
      });
        console.log(`mongoDB Connected ${con.connection.host}`)
    }catch(e) {
      console.log(e);
    }
  
}

export default connectDb;