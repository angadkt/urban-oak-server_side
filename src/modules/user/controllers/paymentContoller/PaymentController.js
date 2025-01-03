import mongoose from "mongoose";
import razorpay from "../../../config/razorpay.js";
import Cart from "../../models/cartSchema/cartSchema.js";
import crypto from "crypto";
import UserSchema from "../../models/userSchema/userSchema.js";
import Order from "../../models/orderSchema/orderSchema.js";
import Paymentschema from "../../models/paymentSchema/PaymentSchema.js";
import { log } from "console";

export const createOrder = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId))
      return res
        .status(404)
        .json({ success: false, message: `user not valid` });

    const { currency, address, pincode, place, phone, name } = req.body;
    // console.log(req.body);

    const cart = await Cart.findOne({ userId }).populate("products.productsId");

    if (!cart)
      return res.status(404).json({ success: false, message: `cart is empty` });

    const totalAmount = cart.products.reduce(
      (acc, cur) => acc + cur.productsId.price * cur.quantity,
      0
    );

    const reciept = `receipt_${Date.now()}`;

    const options = {
      amount: totalAmount * 100,
      currency,
    };
    // const testOptions = {
    //     amount: 1000, // 10 INR in paise
    //     currency: "INR",
    //     receipt: "receipt_test_123",
    //   };

    try {
      const order = await razorpay.orders.create(options);
      console.log("order", order)

      if (!order) {
        return res
          .status(404)
          .json({ success: false, message: `order not found` });
      }

      res.status(200).json({
        success: true,
        message: `payment order created successfully`,
        data: order,
      });
    } catch (error) {
      console.log(error);
    }
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: `failed to create order ${err}` });
  }
};

export const paymentVarification = async (req, res) => {
  console.log("payment verification");
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    Address,
    pincode,
    place,
  } = req.body;
  console.log(Address);
  console.log("req body", req.body);
  
  

  const userId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(userId))
    return res.status(404).json({ success: false, message: `user not valid` });

  const cart = await Cart.findOne({ userId }).populate("products.productsId");
  if (!cart)
    return res.status(404).json({ success: false, message: `cart is empty` });

  const totalAmount = cart.products.reduce(
    (acc, cur) => acc + cur.productsId.price * cur.quantity,
    0
  );
  if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
    return res
      .status(404)
      .json({ success: false, message: `payment verification failed` });
  }
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    const order = new Order({
      userId,
      products: cart.products.map((item) => ({
        productsId: item.productsId._id,
        quantity: item.quantity,
      })),
      Total_Amount: totalAmount,
      //   Customer_name: user.name,
      Address: Address,
    });


    await order.save();
    await Cart.deleteOne({ userId });
    res.status(200).json({
      success: true,
      message: `payment done successfully`, 
    });
  } else {
    return res
      .status(404)
      .json({ success: false, message: `razor pay signature doest match` });
  }
};
