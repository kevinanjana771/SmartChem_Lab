import express from "express";
import { getEquipmentById, getAllEquipment, updateEquipmentScale, trackEquipmentView } from "../controllers/equipmentController.js";

const router = express.Router();

// Route to get all equipment
router.get("/", getAllEquipment);

// Route to get a specific equipment by ID
router.get("/:id", getEquipmentById);

// Route to update equipment scale
router.patch("/:id/scale", updateEquipmentScale);

// Route to track equipment view
router.post("/:id/view", trackEquipmentView);

export default router;