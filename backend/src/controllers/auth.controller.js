import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Student from "../models/student.model.js";
import { AppError } from "../utils/AppError.js";

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return next(new AppError("User already exists", 400));
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    // Create a default student profile
    await Student.create({
      user: user._id,
      grade: "10th", // Default grade, can be updated later
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      return next(new AppError("Invalid user data", 400));
    }
  } catch (error) {
    return next(new AppError("Server error during registration", 500));
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password, rollNumber } = req.body;

    let user;

    // Check if logging in with roll number (for students)
    if (rollNumber) {
      user = await User.findOne({ rollNumber: rollNumber.toUpperCase() });
    } else if (email) {
      user = await User.findOne({ email });
    }

    if (!user) {
      return next(new AppError("Invalid credentials", 401));
    }

    if (await user.matchPassword(password)) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        rollNumber: user.rollNumber,
        gender: user.gender,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      return next(new AppError("Invalid credentials", 401));
    }
  } catch (error) {
    console.error("Login error:", error);
    return next(new AppError("Server error during login", 500));
  }
};

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || "default_secret_key_change_me",
    {
      expiresIn: "30d",
    },
  );
};
