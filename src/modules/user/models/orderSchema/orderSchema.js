import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserSchema",
      required: true,
    },
    products: [
      {
        productsId: {
          type: mongoose.Schema.Types.ObjectId  ,
          ref: "Products",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    payment_status: {
      type: String,
      status: ["pending", "fullfilled", "error"],
    },
    paymentMethod:{
      type:String,

    },
    Total_Amount: {
      type: Number,
      required: true,
    },
    Customer_Name: {
      type: String,
      // required: true,
    },
    Address: {
      type:String,
      // required:true
    },
    State: {
      type: String,
    },
    Pincode: {
      type: Number,
    },
    Contact: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
