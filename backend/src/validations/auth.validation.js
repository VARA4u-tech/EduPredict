import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name must be under 100 characters")
    .trim(),
  email: z
    .string()
    .email("Invalid email address")
    .max(254, "Email is too long")
    .toLowerCase(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(128, "Password must be under 128 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address").optional(),
  rollNumber: z.string().max(20, "Roll number too long").optional(),
  password: z
    .string()
    .min(1, "Password is required")
    .max(128, "Password is too long"),
}).refine(data => data.email || data.rollNumber, {
  message: "Either email or roll number is required",
  path: ["email"],
});
