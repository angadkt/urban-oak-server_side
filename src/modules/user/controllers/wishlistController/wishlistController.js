import mongoose from "mongoose";
import Wishlist from "../../models/wishlistSchema/wishlistSchema.js";
import UserSchema from "../../models/userSchema/userSchema.js";
import Products from "../../../admin/models/productSchema/productSchema.js";

export const addToWishList = async (req, res) => {
  // try {
  const userId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(userId))
    return res.status(404).json({ success: false, message: `user not valid` });

  const { productId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(productId))
    return res
      .status(404)
      .json({ success: false, message: `product not valid` });

  const user = await UserSchema.findById(userId);
  if (!user)
    return res.status(404).json({ success: false, message: `user not found` });

  const product = await Products.findById(productId);
  if (!product)
    return res
      .status(404)
      .json({ success: false, message: `product not found` });

  let wishlist = await Wishlist.findOne({ userId });

  if (!wishlist) {
    wishlist = await new Wishlist({
      userId,
      products: [{ productId }],
    });
  } else {
    const existproduct = wishlist.products.find(
      (item) => item.productId.toString() === productId
    );

    if (existproduct)
      return res.status(404).json({
        success: false,
        message: `product already exist in wishlist`,
      });

    wishlist.products.push({ productId });
  }
  await wishlist.save();
  await user.save();
  return res.status(200).json({
    success: true,
    data: wishlist,
    message: `product added to wishlist`,
  });
  // } catch (err) {
  //   return res
  //     .status(500)
  //     .json({ success: false, message: `server not responding ${err}` });
  // }
};

// =======================================================================

export const getWishlist = async (req, res) => {
  // try {
  const userId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(userId))
    return res.status(404).json({ success: false, message: `invalid user` });

  const wishlist = await Wishlist.findOne({ userId }).populate(
    "products.productId"
  );
  if (!wishlist)
    return res
      .status(404)
      .json({ success: false, message: `wishlist not found` });

  return res.status(200).json({
    success: true,
    message: `wishlist fetched successfully`,
    data: wishlist,
  });
  // } catch (err) {
  //   return res
  //     .status(500)
  //     .json({ success: false, message: `server not responding ${err}` });
  // }
};

// =======================================================================

export const removeWishlsit = async (req, res) => {
  // try {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(404).json({ success: false, message: `invalid user` });

    const { productsId } = req.body;
    console.log(productsId);
    if (!mongoose.Types.ObjectId.isValid(productsId))
      return res
        .status(404)
        .json({ success: false, message: `invalid product` });

    const wishlist = await Wishlist.findOne({ userId });
    console.log(wishlist);
    if (!wishlist)
      return res
        .status(404)
        .json({ success: false, message: `wishlist not found` });

    const indexOfElement = wishlist.products.findIndex(
      (item) => item.productId.toString() === productsId
    );
    console.log(indexOfElement);
    if (indexOfElement === -1)
      return res
        .status(404)
        .json({ success: false, message: `error finding index value` });

    wishlist.products.splice(indexOfElement, 1);

    await wishlist.save();
    return res
      .status(200)
      .json({ success: true, message: `product removed`, data: wishlist });
  // } catch (err) {
  //   return res
  //     .status(500)
  //     .json({ success: false, message: `server not responding ${err}` });
  // }
};
