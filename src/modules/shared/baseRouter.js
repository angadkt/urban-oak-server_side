import { getProductByCategory, getProducts, getProductsById } from "./baseController.js";
import express from 'express'


const router = express.Router()

router.get("/products" ,getProducts)
router.get("/productsbyid/:id", getProductsById)
router.get('/getproductscategory' ,getProductByCategory)

export default router