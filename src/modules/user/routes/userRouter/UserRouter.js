import express from 'express'
import { loginHandler, userRegister } from '../../controllers/userController/UserController.js'
import { addToCart, decreamentQuantity, getCart, increamentQuantity, removeFromCart } from '../../controllers/cartController/cartController.js'
import { addToOrders, getOrders } from '../../controllers/orderController/orderController.js'
import { addToWishList, getWishlist, removeWishlsit } from '../../controllers/wishlistController/wishlistController.js'
import { isAuthenticate, registerValidationMiddleware } from '../../middlewares/AuthMiddleware.js'
import { tryCatch } from '../../../utils/tryCatch.js'



const router = express.Router()

router.post("/register",registerValidationMiddleware,tryCatch(userRegister))

router.post("/login", tryCatch(loginHandler))

router.post("/addtocart/:userId", isAuthenticate, tryCatch(addToCart))

router.get('/getcart/:id', isAuthenticate, tryCatch(getCart))

router.delete('/deleteitem/:id' ,tryCatch(removeFromCart))

router.patch('/increament/:id',tryCatch(increamentQuantity))

router.patch('/decreament/:id',tryCatch(decreamentQuantity))

router.get('/getorders/:id' , isAuthenticate,tryCatch(getOrders))

router.post('/addorders/:id', isAuthenticate,tryCatch(addToOrders))

router.post('/addtowishlist/:id', isAuthenticate,tryCatch(addToWishList))

router.get('/getwishlist/:id', isAuthenticate,tryCatch(getWishlist))

router.delete('/deletewishlistitem/:id', isAuthenticate,tryCatch(removeWishlsit))

export default router