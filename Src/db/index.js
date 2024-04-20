import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import e from "express";
 const connectDB =async()=>{
    try {
      const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)  
    
console.log("Mongodb connected");   
 } catch (error) {
        console.log("mongodb error",error);
        process.exit(1)
        
    }
 }
 export default connectDB
  