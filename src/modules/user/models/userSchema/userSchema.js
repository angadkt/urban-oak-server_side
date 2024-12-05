import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isBlocked:{
        type:Boolean,
        default:false,
    },
    role:{
        type:String,
        default:"user"
    }

    
})

const UserSchema = mongoose.model("UserSchema", userSchema)
export default UserSchema