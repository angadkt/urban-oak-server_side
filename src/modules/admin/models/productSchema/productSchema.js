import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    details:{
        type:String,
        required:true
    },
    images:[
        {
            type:String,
            required:true
        }
    ],
    price:{
        type:Number,
        required:true
    },
    quantity:{  
        type:Number,
        default:1
    }
})

const Products = mongoose.model("Products" ,productSchema)
export default Products