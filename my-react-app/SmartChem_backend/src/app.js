import express from "express";
import cors from "cors";
import equipmentRoutes from "./routes/equipmentRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/equipment", equipmentRoutes);

export default app;
