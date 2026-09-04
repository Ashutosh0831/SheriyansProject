require("dotenv").config();
const webtoken = require("jsonwebtoken");
const redis = require("../config/cache.js")
const bcrypt = require("bcryptjs");
const UserModel = require("../Model/Auth.model.js");

async function UserRegisterController(req, res) {
  const { FullName, gender, adress, address, email, username, password } =
    req.body || {};
  const normalizedAddress = address || adress;

  if (
    !FullName ||
    !gender ||
    !normalizedAddress ||
    !username ||
    !password ||
    !email
  ) {
    return res.status(400).json({
      message: "Fill every column.",
    });
  }

  const isUser = await UserModel.findOne({
    $or: [{ Username: username }, { Email: email }],
  });

  if (isUser) {
    const message =
      isUser.Username &&
      isUser.Username.toLowerCase() === username.toLowerCase()
        ? "Username already exists."
        : "User already exists.";

    return res.status(400).json({ message });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await UserModel.create({
    FullName,
    Gender: gender,
    Address: normalizedAddress,
    Username: username,
    Password: hashPassword,
    Email: email,
  });

  const token = webtoken.sign(
    {
      id: user._id,
      username: user.Username,
      email: user.Email,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  return res.status(200).json({
    message: "User registered successfully",
    user,
  });
}

async function UserLoginController(req, res) {
  const { username, email, password } = req.body || {};

  if (!password || (!username && !email)) {
    return res.status(400).json({
      message: "Please provide username/email and password.",
    });
  }

  const isUser = await UserModel.findOne({
    $or: [{ Username: username }, { Email: email }],
  }).select("+Password");

  if (!isUser) {
    return res.status(400).json({
      message: "Invalid user credential.",
    });
  }

  const isPassword = await bcrypt.compare(password, isUser.Password);

  if (!isPassword) {
    return res.status(400).json({
      message: "Invalid user credential",
    });
  }

  const token = webtoken.sign(
    {
      id: isUser._id,
      username: isUser.Username,
      email: isUser.Email,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  return res.status(200).json({
    message: "User logged in successfully.",
  });
}

async function getUser(req, res){
  const user = await UserModel.findById(req.user.id);

  return res.status(200).json({
    message: "Identified User",
    user
  })
}

async function UserLogoutController(req, res){
  const token = req.cookies.token;

  res.clearCookie("token")

  await redis.set(token,Date.now().toString())


  res.status(200).json({
    message: "Userlogout successfully."
  })

}

module.exports = {
  UserRegisterController,
  UserLoginController,
  getUser,
  UserLogoutController,
};
