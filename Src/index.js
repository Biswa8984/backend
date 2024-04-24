import dotenv  from "dotenv";
import mongoose from "mongoose";
import express from "express";
dotenv.config({
    path:'./.env'
})
const app=express();
const connection= async()=>{
    const URI="mongodb+srv://user20:test234@cluster0.rluykbd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    try {
       await mongoose.connect(URI);
       console.log("databse connected");
    } catch (error) {
        console.log("error is",error);
    }
}

 connection().then(()=>{
   app.listen(process.env.PORT||3000,()=>console.log(`server is running at port ${process.env.PORT}`))
})
.catch((error)=>{
    console.log("connection failed",error)
})
 export default connection;