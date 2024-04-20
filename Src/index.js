import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import express from "express"
const connection= async()=>{
    const URI="mongodb+srv://user20:test234@cluster0.rluykbd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    try {
        await mongoose.connect(URI,{useUnifiedTopology:true,useNewUrlparser:true,});
        console.log("database connectted");
    } catch (error) {
        console.log("erroris",error);
    }
}