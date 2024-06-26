import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
}, fullName:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    index:true,},
    avatar:{
        type:String,
        required:true,
        coverimage:{
            type:String
            },
            watchHistory:[
                {
                    type:Schema.Types.ObjectId,
                    ref:"Video"
                }
            ],
            password:{
                type:String,
                required:true
            },
            refreshToken:{
                type:String,
            }
        },
    },{timestamps:true,}
)
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password= await bcrypt.hash(this.password,8)
    next()
})
userSchema.methods.ispasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateaccesstoken=function(){
     return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        exiperesIn:process.env.ACCESS_TOKEN_EXPIRY
    },
)
}
userSchema.methods.generaterefreshtoken=function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        exiperesIn:process.env.REFRESH_TOKEN_EXPIRY
    },
)}
export const user=mongoose.model("User",userSchema)