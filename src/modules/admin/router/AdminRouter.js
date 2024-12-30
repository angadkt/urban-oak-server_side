import express from 'express'
import { addProducts, deleteProduct, editProduct } from '../controllers/productControlls/productController.js'
import { blockAndUnblockUser, getAllUsers, getSpecificUserCart, getUsersById, removeUser } from '../controllers/adminUserList/adminUserController.js'
import { handleTotalRevenue, handleTotalUsers, totalProductsPurchased } from '../controllers/adminDashboard/adminDashboard.js'
import { isAuthenticate } from '../../user/middlewares/AuthMiddleware.js'
import { tryCatch } from '../../utils/tryCatch.js'


const router = express.Router()

router.post("/addproducts", tryCatch(addProducts))

router.put("/editproduct/:id", tryCatch(editProduct))

router.delete("/deleteproduct", tryCatch(deleteProduct))

router.get("/getusers", tryCatch(getAllUsers))

router.get("/getusersbyid/:id", tryCatch(getUsersById))

router.delete("/deleteuser/:id", tryCatch(removeUser))

router.put("/blockandunblock/:id", tryCatch(blockAndUnblockUser))

//dash board
router.get("/totalproductspurchased", tryCatch(totalProductsPurchased))

router.get("/gettotalrevenue", tryCatch(handleTotalRevenue))

router.get("/getuserscount" ,tryCatch(handleTotalUsers))

router.get("/specificCart/:id" , tryCatch(getSpecificUserCart))

export default router
