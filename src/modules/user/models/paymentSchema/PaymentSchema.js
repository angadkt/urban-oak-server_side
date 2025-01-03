import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    razorpay_order_id:{
        type:String,
        required:true
    },
    razorpay_payment_id:{
        type:String,
        required:true,
    },
    razorpay_signature:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        required:true
    },
    currency:{
        type:String,
        default:"INR"
    },
    status:{
        type:String,
        default:"created"
    },
    purchaseDate:{
        type:String,
        default:Date.now
    },
    address:{
        type:String,
    }

})

const Paymentschema = mongoose.model("payment", PaymentSchema)
export default Paymentschema