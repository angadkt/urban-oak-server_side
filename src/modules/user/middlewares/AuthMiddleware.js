import jwt from "jsonwebtoken";
import registerValidation from "./joi-validation/registerValidation.js";

// export const isAuthenticate = async (req, res, next) => {
//   console.log("Request Headers:", req.headers);

//   const authHeader = req.headers['authorization'];
//   console.log("header", authHeader);

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     console.log("Authorization header is missing or malformed.");
//     return res.status(401).json({
//       success: false,
//       message: "Access denied. Token not provided or invalid format.",
//     });
//   }

//   const token = authHeader.split(" ")[1]  || authHeader.substring(7).trim();

//   if(!token) return res.status(404).json({success:false, message:`token cannot be fetched from the authHeader`})
//   console.log("extract tocken", token);
//   try {
//     const validateToken = jwt.verify(token, process.env.TOKEN_SECRET);
//     next();
//   } catch (err) {
//     return res
//       .status(500)
//       .json({ success: false, message: `error is token fetching ${err}` });
//   }
// };

export const isAuthenticate = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("Authorization Header:", authHeader); 

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
    const validateToken = jwt.verify(token, process.env.TOKEN_SECRET, {
      algorithms: ["HS256"],
    });
    req.user = validateToken; 
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: `Token verification failed: ${err.message}`,
    });
  }
};

export const registerValidationMiddleware = (req, res, next) => {
  const { error, value } = registerValidation.validate(req.body);
  if (error) {
    console.log(error);
    
    return res
      .status(202)
      .json({ success: false, message: `content not valid` });
  }
  req.body = value;
  next();
};

export const erroHandler = (error, req, res, next) => {
  return res.status(500).json({success:false, message:`server side error ${error}`})
};
