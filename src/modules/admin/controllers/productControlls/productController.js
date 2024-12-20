import express from "express";
import Products from "../../models/productSchema/productSchema.js";
import mongoose from "mongoose";

// =======================================================================================================
export const addProducts = async (req, res) => {
  const { name, category, details, images, price, quantity } = req.body;

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
  const id = req.params.id;
  const deleteProduct = await Products.findByIdAndDelete(id);
  if (!deleteProduct) {
    return res
      .status(404)
      .json({ success: false, message: "cant delete product" });
  }
  return res
    .status(200)
    .json({ success: true, message: "product deleted", data: deleteProduct });
};

// =======================================

// export const editProduct = async (req, res) => {
//   const productId = req.params.id;
//   if (!mongoose.Types.ObjectId.isValid(editProduct))
//     return res.status(404).json({ success: false, message: `invalid product` });

//   const { name, category, details, images, price, quantity } = req.body;



//     const editedProduct = await Products.findByIdAndUpdate(productId, {$set :{name, category, details, images, price, quantity}},
//         {new: true}
//     )

//     if(!editedProduct) return res.status(404).json({success:false, message:`product not found`})
// };
