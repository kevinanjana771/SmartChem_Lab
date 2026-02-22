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
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
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