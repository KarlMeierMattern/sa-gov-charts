import { CustomError } from "../errors/custom-error.js";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

const signup = async (req, res) => {
  res.status(200).send("Signup route");
};

const user = { username: "karl", password: "12345" };

// Ensure that only requests with JWT can access the dashboard
const login = async (req, res) => {
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
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error" });
  }
};

export { signup, login };
