import express from 'express'
import Products from '../../models/productSchema/productSchema.js'





// =======================================================================================================
export const addProducts = async (req,res) =>{
    try{
        const {name, category, details, images, price , quantity} = req.body

        const productExist = await Products.findOne({name})

        if(productExist) return res.status(404).json({success:false , message:"product already exist"})

        const newProduct = new Products({
            name, category, details, images, price , quantity
        })

        await newProduct.save()

        res.status(200).json({success:true,message:`product added succesfully`, data:newProduct})
    }
    catch(err){
        res.status(500).json({
            message:"error adding products",
            error: err.message
        })
    }
}

// ===============================================================================================================================

export const editProduct = async (req,res) => {
    try{
        const id = req.params.id
        const { name, category, details, images, price , quantity } = req.body
        // const existProduct = await Products.findById(id)
        // if(!existProduct){
        //     return res.status(404).json({success:false, message:"product not found"})
        // }
        const editedProduct = await Products.findByIdAndUpdate({_id:id},{$set: { name,category, details, images, price , quantity }}, {new:true} )
        if(!editedProduct){
            return res.status(404).json({success:false, message:"product not found"})
        }
        return res.status(200).json({success:true, message:"product found successfully" , data:editedProduct})
    }
    catch(err){
        return res.status(500).json({success:false, message:`Bad Request ${err.message}`})
    }
}


export const deleteProduct = async (req,res) => {
    try{
        const id = req.params.id
        const deleteProduct = await Products.findByIdAndDelete(id)
        if(!deleteProduct){
            return res.status(404).json({success:false, message:"cant delete product"})
        }
        return res.status(200).json({success:true, message:"product deleted", data:deleteProduct})
    }
    catch(err){
        return res.status(500).json({succcess:false, message:`Bad request ${err.message}`})
    }
}