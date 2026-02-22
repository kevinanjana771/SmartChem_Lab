import express from "express";
import {
  getAllPracticals,
  getPracticalById,
  getPracticalSteps,
  getPracticalEquipments // Added this import
} from "../controllers/practicalController.js";

const router = express.Router();

/* =========================================
   GET ALL PRACTICALS
   GET /api/practicals
========================================= */
router.get("/", getAllPracticals);

/* =========================================
   GET SINGLE PRACTICAL
   GET /api/practicals/:id
========================================= */
router.get("/:id", getPracticalById);

/* =========================================
   GET STEPS FOR PRACTICAL
   GET /api/practicals/:id/steps
========================================= */
router.get("/:id/steps", getPracticalSteps);

/* =========================================
   GET EQUIPMENTS FOR PRACTICAL (RESTORED)
   GET /api/practicals/:id/equipments
========================================= */
router.get("/:id/equipments", getPracticalEquipments);

export default router;