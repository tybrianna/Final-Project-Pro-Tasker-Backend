const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

const registerUser = async (
  req,
  res
) => {
  const { name, email, password } =
    req.body;

  const exists =
    await User.findOne({ email });

  if (exists) {
    return res
      .status(400)
      .json({ message: "User exists" });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  res.status(201).json({
    _id: user._id,
    token: generateToken(user._id),
  });
};