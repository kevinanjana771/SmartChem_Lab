import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import equipmentRoutes from "./routes/equipmentRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import practicalRoutes from "./routes/practicalRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";



// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true
}));
app.use(morgan("dev"));
app.use(express.json());


// Root route
app.get("/", (req, res) => {
    res.send("✅ SmartChem API running on port " + PORT);
});

// API Routes
app.use("/api/equipment", equipmentRoutes);
app.use("/api/practicals", practicalRoutes);
app.use("/api/quizzes", quizRoutes);

// Auth Routes
app.use("/api/auth", authRoutes);

// 404 Handler (Must be before error handler)
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

// Global Error Handler (must be last)
app.use(errorMiddleware);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});