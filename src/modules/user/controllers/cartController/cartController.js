import mongoose from "mongoose";
import Cart from "../../models/cartSchema/cartSchema.js";
import UserSchema from "../../models/userSchema/userSchema.js";
import Products from "../../../admin/models/productSchema/productSchema.js";

export const addToCart = async (req, res) => {
  
    const userId = req.params.userId;
    const { productsId, quantity } = req.body;

    console.log("checking user id valid or not",userId)
    // ===================================================
    if (!mongoose.Types.ObjectId.isValid(userId))
      return res
        .status(404)
        .json({ success: false, message: "user is invalid" });

    const specificUser = await UserSchema.findById(userId);
    if (!specificUser)
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    // =========================================================

    // Validate the product ID
    if (!mongoose.Types.ObjectId.isValid(productsId))
      return res
        .status(404)
        .json({ success: false, message: "product is invalid" });

    const specificProduct = await Products.findById(productsId);
    if (!specificProduct)
      return res
        .status(404)
        .json({ success: false, message: "product not found" });
    // ==================================================================

    // Find or create the cart
    let specificCart = await Cart.findOne({ userId });

    if (!specificCart) {
      specificCart = new Cart({ userId, products: [{ productsId, quantity }] });
      specificUser.cart = specificCart._id; // Store the cart ID in the user
    } else {
      const existingProduct = specificCart.products.find(
        (product) => product.productsId.toString() === productsId
      );

      if (existingProduct) {
        return res
          .status(404)
          .json({ success: false, message: `product already exists in cart` });
      } else {
        specificCart.products.push({ productsId, quantity });
      }
    }

    await specificUser.save();
    await specificCart.save();

    return res
      .status(200)
      .json({ success: true, message: `item added to the cart` ,data:specificProduct});
};

// ====================== fetching cart ======================================

export const getCart = async (req, res) => {
  // try {
    const userId = req.params.id;
    // console.log("user id",userId);

    if (!mongoose.Types.ObjectId.isValid(userId))
      return res
        .status(400)
        .json({ success: false, message: `user is invalid` });

    // ............................................

    const cart = await Cart.findOne({ userId }).populate("products.productsId");

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "cart not found" });
    }

    return res.status(200).json({
      success: true,
      message: `cart fetched successfully`,
      data: cart,
    });
  // } catch (err) {
  //   console.error(`error occured ${err}`);
  //   return res
  //     .status(500)
  //     .json({ success: false, message: `server not responding ${err}` });
  // }
};

// =========================================================================

export const removeFromCart = async (req, res) => {
  // console.log(typeof process.env.KEY_ID, process.env.KEY_ID)
  // console.log(typeof process.env.KEY_SECRET ,process.env.KEY_SECRET)
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(404).json({ success: false, message: "user invalid" });

    const { productsId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(productsId))
      return res
        .status(404)
        .json({ success: false, message: "product invalid" });

    const user = await UserSchema.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "user not found" });

    const cart = await Cart.findOne({ userId });
    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "cart not found" });

    //code remove the particular product from the cart
    const indexOfElement = cart.products.findIndex(
      (item) => item.productsId.toString() === productsId
    );
   
    if (indexOfElement === -1)
      return res
        .status(404)
        .json({ success: false, message: "product not found in cart" });

    cart.products.splice(indexOfElement, 1);

    await cart.save();
    await user.save();

    return res.status(200).json({
      success: true,
      message: "product removed from cart",
      data: cart,
    });
};

// ============================================================

export const increamentQuantity = async (req, res) => {
  // try {
    const userId = req.params.id;
    const { productsId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId))
      return res
        .status(404)
        .json({ success: false, message: `user not valid` });

    if (!mongoose.Types.ObjectId.isValid(productsId))
      return res
        .status(404)
        .json({ success: false, message: `product not valid` });

    const user = await UserSchema.findById(userId);
    // console.log(user);

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: `user not found` });

    const cart = await Cart.findOne({ userId });

    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: `cart not found` });

    const currentProduct = await cart.products.find(
      (item) => item.productsId.toString() === productsId
    );

    console.log("current product", currentProduct.productsId)

    if (!currentProduct) {
      return res
        .status(404)
        .json({ success: false, message: `product not found` });
    } else {
      currentProduct.quantity += 1;
    }
    await cart.save();
    return res
      .status(200)
      .json({ success: true, message: `quantity increamented`, data: cart });
  // } catch (err) {
  //   return res
  //     .status(500)
  //     .json({ success: false, message: `server not responding ${err}` });
  // }
};

// ====================================================================

export const decreamentQuantity = async (req, res) => {
    const userId = req.params.id;
    const { productsId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId))
      return res
        .status(404)
        .json({ success: false, message: `user not valid` });
    if (!mongoose.Types.ObjectId.isValid(productsId))
      return res
        .status(404)
        .json({ success: false, message: `product not valid` });

    const user = await UserSchema.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: `user not found` });

    const cart = await Cart.findOne({ userId });
    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: `cart not found` });

    const product = await cart.products.find(
      (item) => item.productsId.toString() === productsId
    );
    console.log(product);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: `product not found` });
    } else if (product.quantity <= 1) {
      product.quantity = 1;
    } else {
      product.quantity -= 1;
    }
    await cart.save();
    return res
      .status(200)
      .json({ success: true, message: `quantity decreased`, data: cart });
 
};
