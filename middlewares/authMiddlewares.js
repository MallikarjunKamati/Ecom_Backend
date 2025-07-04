const jwt =  require("jsonwebtoken");
const User = require("../models/User");

const isAuth = async (req, res, next) => {
  try{
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ 
            message: "No token provided, authorization denied"
  });
}
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = await User.findById(decoded.userid).select("-password");
next();
} catch (error) {
  console.error("JWT verification error:", error);
  res.status(401).json({ message: "Token is not valid" });
}
};
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  }else {
    res.status(403).json({ message: "Access denied, admin only" });
  }
};

module.exports = { isAuth, isAdmin };
