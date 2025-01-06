import mongoose from "mongoose";
import Products from "../admin/models/productSchema/productSchema.js";

// ========================================================

export const getProducts = async (req, res) => {
    const products = await Products.find();
    if (!products) {
      return res
        .status(404)
        .json({ success: false, message: "cannot require products" });
    }
    return res.status(200).json({
      success: true,
      message: "data accuired successfuly",
      data: products,
    });
 
};

// ================================================================
export const getProductsById = async (req, res) => {
    const id = req.params.id;
    const existProduct = await Products.findById(id);
    // console.log(existProduct)
    if (!existProduct) {
      return res
        .status(400)
        .json({ success: false, message: "product not exist" });
    }
    return res.status(200).json({
      success: true,
      message: "product fetching success",
      data: existProduct,
    });
  
};

// =================================================================================

export const getProductByCategory = async (req, res) => {
    const { category } = req.query;
    if (!category)
      return res
        .status(404)
        .json({ success: false, message: `category is invalid` });

    const product = await Products.find({ category });
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: `product not found` });

    return res
      .status(200)
      .json({
        success: true,
        message: `product fetched successfully`,
        data: product,
      });
 
};

// ============================================================================

export const getProductsBySearch = async (req, res) => {
  const { query } = req.query;

  if (!query || query.trim() == "") {
    return res.status(404).json({ success: false, message: `query not found` });
  }

  const searchRegExp = new RegExp(query, "i");

  const searchProducts = await Products.find({
    $or: [
      { name: { $regex: searchRegExp } },
      { desciption: { $regex: searchRegExp } },
      { category: { $regex: searchRegExp } },
    ],
  });

  if (!searchProducts)
    return res
      .status(200)
      .json({ success: false, message: `product does not exist` });

     return res.status(200).json({success:true, message:`products available`, data:searchProducts}) 
};
