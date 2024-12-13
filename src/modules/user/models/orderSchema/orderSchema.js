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
          type: mongoose.Schema.Types.ObjectId,
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
    Total_Amount: {
      type: Number,
      required: true,
    },
    Payment_Id: {
      type: String,
      // required: true,
    },
    Order_Id: {
      type: String,
      // required: true,
    },
    Customer_Name: {
      type: String,
      // required: true,
    },
    Address: {
      type: String,
      required: true
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
