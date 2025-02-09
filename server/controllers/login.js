const signup = async (req, res) => {
  res.status(200).send("Signup route");
};

const login = async (req, res) => {
  res.status(200).send("Fake login register");
};

export { signup, login };
