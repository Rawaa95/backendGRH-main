import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const signToken = (id, role) => {
  return jwt.sign(
    {
      id,
      role,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id, user.role);
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
export const signup = async (req, res, next) => {
  console.log(req);
  try {
    const newUser = await User.create({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      passwordConfirm: req.body.passwordConfirm,
    });
    createSendToken(newUser, 201, res);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({
        status: "error",
        message: "Please provide email and password!",
      });
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res
        .status(401)
        .json({ status: "error", message: "Incorrect email or password!" });
    }
    const token = signToken(user._id, user.role);
    res.status(200).json({
      status: "success",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
export const restricteTo = (...roles) => {
  return (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          status: "error",
          message: "You do not have permission to perform this action.",
        });
      }
      next();
    } catch (error) {
      res
        .status(500)
        .json({ status: "error", message: "Internal server error" });
    }
  };
};
export const protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "You are not logged in. Please log in to get access.",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
      return res.status(401).json({
        status: "error",
        message: "The user belonging to this token no longer exists.",
      });
    }

    req.user = freshUser;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
