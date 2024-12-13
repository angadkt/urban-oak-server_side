import express  from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import userRouter from './src/modules/user/routes/userRouter/UserRouter.js'
import adminRouter from './src/modules/admin/router/AdminRouter.js'
import baseRouter from './src/modules/shared/baseRouter.js'


dotenv.config()
const app = express()



app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

async function main(){
    try{
        await mongoose.connect("mongodb+srv://angadktofficial:N7L8gQp1x32wcZSx@cluster0.x0rll.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("connection success");
    }
    catch(err){
        console.log(err);
    }
}
main()

app.use("/api", userRouter)
app.use("/api", adminRouter)
app.use("/api", baseRouter)



app.listen(4000, ()=>{
    console.log(`server is running`);
})