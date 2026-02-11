import dotenv from "dotenv";
import connectDB from "./config/db.js";
import app from "./app.js";

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const PORT = process.env.PORT || 5000;

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
