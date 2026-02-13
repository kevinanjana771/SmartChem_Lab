import express from "express";
import { getEquipmentById } from "../controllers/equipmentController.js";

const router = express.Router();

// Route to get a specific equipment by ID (which includes parts)
router.get("/:id", getEquipmentById);

export default router;