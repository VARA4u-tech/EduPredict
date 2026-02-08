import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Student from "../models/student.model.js";

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please provide all fields" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
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
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error during registration" });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
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
      return res.status(401).json({ error: "Invalid credentials" });
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
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error during login" });
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
