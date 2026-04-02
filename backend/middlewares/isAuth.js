import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
   console.log("Auth middleware running");
  try {
    const token = req.cookies.token;

    if (!token) {
      
      return res.status(401).json({ success: false, message: "Not Authorized, Login Again" });
    }

    // jwt.verify is synchronous; it returns the decoded payload or throws an error
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
       return res.status(401).json({ success: false, message: "Token Verification Failed" });
    }

    req.userId = decoded.userId;

    next();

  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    
    // If the token is expired or wrong, we tell the user they are not authorized
    return res.status(401).json({ success: false, message: "Session Expired, please login again" });
  }
};

export default isAuth;