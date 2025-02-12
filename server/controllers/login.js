import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { CustomError } from "../errors/custom-error.js";
import { UnauthenticatedError } from "../errors/unauthenticated.js";

const signup = async (req, res) => {
  res.status(200).send("Signup route");
};

const user = { username: "karl", password: "1234" };

// Ensure that only requests with JWT can access the dashboard
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (username === user.username && password === user.password) {
      const token = jwt.sign({ username }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res
        .cookie("token", token, {
          httpOnly: true, // Secure against XSS
          secure: process.env.NODE_ENV === "production", // Send only over HTTPS (set to false for local testing)
          sameSite: "Strict", // Prevent CSRF attacks
          maxAge: 60 * 60 * 1000, // 1 hour
          domain: "localhost", // Add this for dev
        })
        .status(StatusCodes.OK)
        .json({ msg: "Login successful" });
    } else {
      throw new UnauthenticatedError("Not authorized to access this route");
    }
  } catch (error) {
    next(error); // Pass the error to the error handler which handles both custom errors and unexpected server issues.
  }
};

export { signup, login };
