import { tryCatch } from "../utils/tryCatch.js";
import { getProductByCategory, getProducts, getProductsById } from "./baseController.js";
import express from 'express'


const router = express.Router()

router.get("/products" ,getProducts)
router.get("/productsbyid/:id", getProductsById)
router.get('/getproductscategory' ,getProductByCategory)
router.get('/search', tryCatch(getProductByCategory))

export default router