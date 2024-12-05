import express from 'express'
import { loginHandler, userRegister } from '../../controllers/UserController.js'

const router = express.Router()

router.post("/register",userRegister)

router.post("/login", loginHandler)

export default router