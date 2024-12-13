import express from 'express'
import { loginHandler, userRegister } from '../../controllers/userController/UserController.js'
import { addToCart, decreamentQuantity, getCart, increamentQuantity, removeFromCart } from '../../controllers/cartController/cartController.js'
import { addToOrders, getOrders } from '../../controllers/orderController/orderController.js'
import { addToWishList, getWishlist, removeWishlsit } from '../../controllers/wishlistController/wishlistController.js'

const router = express.Router()

router.post("/register",userRegister)

router.post("/login", loginHandler)

router.post("/addtocart/:userId", addToCart)

router.get('/getcart/:id', getCart)

router.delete('/deleteitem/:id', removeFromCart)

router.patch('/increament/:id', increamentQuantity)

router.patch('/decreament/:id', decreamentQuantity)

router.get('/getorders/:id' , getOrders)

router.post('/addorders/:id', addToOrders)

router.post('/addtowishlist/:id', addToWishList)

router.get('/getwishlist/:id', getWishlist)

router.delete('/deletewishlistitem/:id', removeWishlsit)

export default router