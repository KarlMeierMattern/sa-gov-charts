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
      // payload, secret, options
      jwt = jwt.sign({ username }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res
        .status(StatusCodes.OK)
        .json({ msg: "Success", data: { username, password }, token });
    } else {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error" });
  }
};

const dashboard = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];

    if (!token) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Server error" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        res.sendStatus(StatusCodes.FORBIDDEN);
      }
      res.json({ message: `Hello, ${user.username}! This is protected.` });
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error" });
  }
};

export { signup, login };
