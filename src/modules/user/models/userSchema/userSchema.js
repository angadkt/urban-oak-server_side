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
    },
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Cart'
    },
    wishlist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Wishlist'
    },
    order:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Order'
        }
    ]

    
})

const UserSchema = mongoose.model("UserSchema", userSchema)
export default UserSchema