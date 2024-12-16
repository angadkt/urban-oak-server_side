
export const tryCatch = (controller)=> async (req,res ,next) => {
    try {
        await controller(req,res)
    }
    catch(err){
       return  res.status(500).json({success:false, message:`server not found ${err}`})
    }
}