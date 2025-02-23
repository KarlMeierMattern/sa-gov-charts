import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

// Authentication Middleware
const authenticateJWT = (req, res, next) => {
  const token = req.cookies.token; // Get JWT from HTTP-only cookie
  console.log(token);

  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request
    console.log(req.user);
    next();
  } catch (error) {
    return res.status(StatusCodes.FORBIDDEN).json({ message: "Invalid token" });
  }
};

export { authenticateJWT };
