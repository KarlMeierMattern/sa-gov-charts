import { CustomError } from "../errors/custom-error.js";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  res.status(200).send("Signup route");
};

// Ensure that only requests with JWT can access the dashboard
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new CustomError("Please provide username & password", 300);
    }

    // payload, secret, options
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({ msg: "Success", data: { username, password }, token });
  } catch (error) {
    console.log(error);
  }
};

export { signup, login };
