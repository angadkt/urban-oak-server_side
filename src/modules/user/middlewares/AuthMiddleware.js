import jwt from "jsonwebtoken";
import registerValidation from "./joi-validation/registerValidation.js";



export const isAuthenticate = async (req, res, next) => {
  console.log("checking");
  
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Access denied. Token not provided or invalid format.",
    });
  }

  const token = authHeader.split(" ")[1] || authHeader.substring(7).trim();
  console.log("Extracted Token:", token);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. Token is missing.",
    });
  }

  try {
    console.log("hi there");
    
    const validateToken = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log("validate token", validateToken);
    if(!validateToken) return res.status(404).json({success:false, message:"not found"})
    req.user = validateToken;
    console.log("req user",req.user);
    
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: `Token verification failed: ${err.message}`,
    });
  }
};





// =================================================================
export const registerValidationMiddleware = (req, res, next) => {
  const { error, value } = registerValidation.validate(req.body);
  if (error) {

    return res
      .status(404)
      .json({ success: false, message: `content not valid` });
  }
  req.body = value;
  next();
};



