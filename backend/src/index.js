import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import xss from "xss-clean";
import aiRoutes from "./routes/ai.routes.js";
import studentRoutes from "./routes/student.routes.js";
import authRoutes from "./routes/auth.routes.js";

import connectDB from "./config/db.js";

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "https://edu-pridect.vercel.app",
  "https://edupridect.vercel.app",
  "http://localhost:8080",
  "http://localhost:8081",
  "http://localhost:8082",
  "http://localhost:5173",
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.indexOf(origin) !== -1 ||
        allowedOrigins.includes(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Handle preflight requests
app.options("*", cors());
app.use(express.json({ limit: "10kb" })); // Body limit
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Security Headers
app.use(helmet());

// Prevent XSS
app.use(xss());

// Prevent Parameter Pollution
app.use(hpp());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use("/api", limiter);

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Student Success Comic API is running",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/ai", aiRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/auth", authRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.method} ${req.path} not found`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
  🚀 Server is running!
  📍 Local: http://localhost:${PORT}
  📋 Health: http://localhost:${PORT}/api/health
  🤖 AI API: http://localhost:${PORT}/api/ai
  👨‍🎓 Students API: http://localhost:${PORT}/api/students
  🔐 Auth API: http://localhost:${PORT}/api/auth
  `);
});
