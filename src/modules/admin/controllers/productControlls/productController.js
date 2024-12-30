import express from "express";
import Products from "../../models/productSchema/productSchema.js";
import mongoose from "mongoose";

// =======================================================================================================
export const addProducts = async (req, res) => {
  const { name, category, details, images, price, quantity } = req.body;

  if(!images || !Array.isArray(images) || images.length === 0){
    return res.status(400).json({succcess:false, message:"images are requires"})
  }

  const productExist = await Products.findOne({ name });

  if (productExist)
    return res
      .status(404)
      .json({ success: false, message: "product already exist" });

  const newProduct = new Products({
    name,
    category,
    details,
    images,
    price,
    quantity,
  });

  await newProduct.save();

  res.status(200).json({
    success: true,
    message: `product added succesfully`,
    data: newProduct,
  });
};

// ===============================================================================================================================

export const editProduct = async (req, res) => {
    const id = req.params.id;
    const { name, category, details, images, price, quantity } = req.body;

    const editedProduct = await Products.findByIdAndUpdate(
      id,
      { $set: { name, category, details, images, price, quantity } },
      { new: true }
    );

    if (!editedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    return res
      .status(200)
      .json({
        success: true,
        message: "Product updated successfully",
        data: editedProduct,
      });
};

// ================================================

export const deleteProduct = async (req, res) => {
  const { productsId } = req.body;

  if (!productsId || !mongoose.Types.ObjectId.isValid(productsId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid or missing productsId" });
  }

  const deletedProduct = await Products.findByIdAndDelete(productsId);

  if (!deletedProduct) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  res
    .status(200)
    .json({ success: true, message: "Product deleted", data: deletedProduct });
};

// =======================================

