import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import connection from "index.js";
const app=express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
connection()
.then(()=>{
    app.listen(process.env.PORT||3000,()=>{console.log(`server is runnig at port:${process.env.PORT}`)})
})
.catch((error)=>{
    console.log("connection failed",error)
})
export {app}