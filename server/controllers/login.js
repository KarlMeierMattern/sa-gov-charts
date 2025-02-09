import { CustomError } from "../errors/custom-error.js";

const signup = async (req, res) => {
  res.status(200).send("Signup route");
};

// Ensure that only requests with JWT can access the dashboard
const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new CustomError("Please provide username & password", 300);
  }
  res.status(200).json({ msg: "Success", data: { username, password } });
};

export { signup, login };
