import {asynchandler} from "../utils/asynchandler.js"
import {ApiError} from "ApiError.js"
import { user } from "../models/user.models.js";
import {upldOnCloudinary} from "../utils/cloudnary.js"
import { Apiresponse } from "../utils/Apiresponse.js";
const registerUser = asynchandler(async(req,res)=>{
  
    
    const{fullname,username,email,password}=req.body
    console.log("email",email);
   if(
    [fullname,email,username,password].some((field)=> field?.trim()==="")
   ){
    throw new ApiError(400,"All fields rewquired")
   }
   const existeduser=user.findOne({email})

if(existeduser){
    throw new ApiError(409,"usr already exists")
}
const avatarLocalPath=req.files?.avatar[0]?.path
const coverImageLoaclPath=req.files?.coverImage[0]?.path
if(!avatarLocalPath){
    throw new ApiError(400,"Avatar required")
}
const avatar=await upldOnCloudinary(avatarLocalPath)
const coverImage=await upldOnCloudinary(coverImageLoaclPath)
if(!avatarLocalPath){
    throw new ApiError(400,"Avatar required")
}
const User=await user.create({
    fullname,
    avatar:avatar.url,
    coverImage:coverImage?.url|| "",
    email,
    password,
    username:username.toLowerCase()
})
   const UserCreated=await   user.findById(user._id).select(
    "-password -refreshToken"
   )
   if(!UserCreated){
    throw new ApiError(500,"wrong")
   }
})
return res.status(201).json(
    new Apiresponse(200,UserCreated,"Heigala")
)

export {registerUser}