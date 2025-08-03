const jwt = require("jsonwebtoken");
const prisma = require("../models/prisma");

const authMiddleware = async (req, res, next) => {
  const token =
    req.cookies.token || req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    return res.status(401).json({ error: "Invalid token" });
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
    select: { id: true, email: true, role: true },
  });

  if (!user) {
    return res.status(401).json({ error: "User not found" });
  }

  console.log("Decoded token: ", decoded);
  req.user = user;

  next();
};

const authorize = (roles = []) => {
  if (typeof roles === "string") {
    roles = [roles];
  }

  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: "You are not authorized to access this resource",
      });
    }
    next();
  };
};

module.exports = {
  authMiddleware,
  authorize,
};
