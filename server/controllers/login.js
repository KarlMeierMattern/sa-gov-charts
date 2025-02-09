const signup = async (req, res) => {
  res.status(200).send("Signup route");
};

const login = async (req, res) => {
  const { username, password } = req.body;
  res
    .status(200)
    .json({ msg: "Success", data: { username: username, password: password } });
};

export { signup, login };
