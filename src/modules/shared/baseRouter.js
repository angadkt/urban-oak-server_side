import { tryCatch } from "../utils/tryCatch.js";
import { getProductByCategory, getProducts, getProductsById, getProductsBySearch } from "./baseController.js";
import express from 'express'


const router = express.Router()

router.get("/products" ,tryCatch(getProducts))
router.get("/productsbyid/:id", tryCatch(getProductsById))
router.get('/getproductscategory' ,tryCatch(getProductByCategory))
router.get('/search', tryCatch(getProductsBySearch))

export default router