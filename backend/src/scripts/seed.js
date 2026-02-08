import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.model.js";
import Student from "../models/student.model.js";
import connectDB from "../config/db.js";

dotenv.config();

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "password123",
    role: "admin",
  },
  {
    name: "Faculty Member",
    email: "faculty@example.com",
    password: "password123",
    role: "faculty",
  },
  {
    name: "Alex Student",
    email: "student@example.com",
    password: "password123",
    role: "student",
  },
];

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data (optional, be careful in production)
    // await User.deleteMany();
    // await Student.deleteMany();

    console.log("Seeding users...");

    for (const userData of users) {
      // Check if user exists
      const userExists = await User.findOne({ email: userData.email });

      if (userExists) {
        console.log(`User ${userData.email} already exists`);
        continue;
      }

      const user = await User.create(userData);
      console.log(`Created user: ${user.name} (${user.role})`);

      if (user.role === "student") {
        await Student.create({
          user: user._id,
          grade: "10th",
          attendance: 85,
          assignmentCompletion: 90,
          quizScores: 88,
          studyHours: 12,
          participation: 95,
        });
        console.log(`Created student profile for ${user.name}`);
      }
    }

    console.log("Seeding complete!");
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
