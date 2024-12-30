import mongoose from "mongoose";
import Order from "../../models/orderSchema/orderSchema.js";
import Cart from "../../models/cartSchema/cartSchema.js";
import UserSchema from "../../models/userSchema/userSchema.js";


export const getOrders = async (req, res) => {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId))
      return res
        .status(404)
        .json({ success: false, message: `user is not valid` });

    const order = await Order.find({ userId }).populate("products.productsId");
    if (!order || !order.length)
      return res
        .status(404)
        .json({ success: false, message: `order not found` });

    return res.status(200).json({
      success: true,
      message: `order fetched successfully`,
      data: order,
    });
};

// ===================================================================================

export const addToOrders = async (req, res) => {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId))
      return res
        .status(404)
        .json({ success: false, message: `user is not valid` });


    const {Address} = req.body
    console.log(Address);
    
   


    const user = await UserSchema.findById(userId);
    if (!user)
      return res
        .status(200)
        .json({ success: false, message: "user not found " });


    const cart = await Cart.findOne({ userId }).populate("products.productsId");
    console.log(cart);
    
    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: `cart not found` });

    const totalAmount = cart.products.reduce(
      (acc, cur) => acc + cur.productsId.price * cur.quantity,
      0
    );

    const newOrder = new Order({
      userId: userId,
      products: cart.products.map((item) => ({
        productsId: item.productsId,
        quantity: item.quantity,
        price: item.productsId.price,
      })),
      Total_Amount: totalAmount,
      Address:Address
    });

    await newOrder.save();

    cart.products = [];
    await cart.save();

    return res
      .status(200)
      .json({ success: true, message: `order successfull`, data: newOrder });
};
