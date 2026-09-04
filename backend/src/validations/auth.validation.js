import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address").optional(),
  rollNumber: z.string().optional(),
  password: z.string().min(1, "Password is required"),
}).refine(data => data.email || data.rollNumber, {
  message: "Either email or roll number is required",
  path: ["email"],
});
