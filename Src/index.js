// import dotenv  from "dotenv";i
// dotenv.config({
//     path:"./.env"
// })
import express from 'express'
import mongoose from "mongoose";
import 'dotenv/config'
const app=express();
const connection= async()=>{
    try {
       await mongoose.connect(process.env.MONGODB_URI);
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