import mongoose from "mongoose";
import Products from "../admin/models/productSchema/productSchema.js";

// ========================================================

export const getProducts = async (req, res) => {
  try {
    const products = await Products.find();
    if (!products) {
      return res
        .status(404)
        .json({ success: false, message: "cannot require products" });
    }
    return res
      .status(200)
      .json({
        success: true,
        message: "data accuired successfuly",
        data: products,
      });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: `Bad request ${err.message}` });
  }
};

// ================================================================
export const getProductsById = async (req, res) => {
  try {
    const id = req.params.id;
    const existProduct = await Products.findById(id);
    // console.log(existProduct)
    if (!existProduct) {
      return res
        .status(400)
        .json({ success: false, message: "product not exist" });
    }
    return res
      .status(200)
      .json({
        success: true,
        message: "product fetching success",
        data: existProduct,
      });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: `Bad request ${err.message}` });
  }
};

// =================================================================================

export const getProductByCategory = async (req, res) => {
  try {
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
      .json({ success: true, message: `product fetched successfully`, data:product });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: `server not responding ${err}` });
  }
};

// ============================================================================

export const getProductsBySearch = async (req,res) => {
  const {query} = req.query

  if(!query || query.trim() == ""){
    return res.status(404).json({success:false, message:`query not found`})
  }

  const searchRegExp = new RegExp(query, 'i');

  const searchProducts = await Products.find()

}