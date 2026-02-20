import express from "express";
import { getEquipmentById, getAllEquipment } from "../controllers/equipmentController.js";

const router = express.Router();

// Route to get all equipment
router.get("/", getAllEquipment);

// Route to get a specific equipment by ID
router.get("/:id", getEquipmentById);

export default router;