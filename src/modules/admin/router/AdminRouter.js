import express from 'express'
import { addProducts, deleteProduct, editProduct } from '../controllers/productControlls/productController.js'
import { blockAndUnblockUser, getAllUsers, getUsersById, removeUser } from '../controllers/adminUserList/adminUserController.js'
import { handleTotalRevenue, handleTotalUsers, totalProductsPurchased } from '../controllers/adminDashboard/adminDashboard.js'


const router = express.Router()

router.post("/addproducts", addProducts)

router.put("/editproduct/:id", editProduct)

router.delete("/deleteproduct/:id", deleteProduct)

router.get("/getusers", getAllUsers)

router.get("/getusersbyid/:id", getUsersById)

router.delete("/deleteuser/:id", removeUser)

router.put("/blockandunblock/:id", blockAndUnblockUser)

//dash board
router.get("/totalproductspurchased", totalProductsPurchased)

router.get("/gettotalrevenue", handleTotalRevenue)

router.get("/getuserscount" ,handleTotalUsers)

export default router
