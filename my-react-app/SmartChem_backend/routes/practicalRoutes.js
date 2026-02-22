import express from "express";
import {
  getAllPracticals,
  getPracticalById,
  getPracticalSteps
} from "../controllers/practicalController.js";

const router = express.Router();

//GET ALL PRACTICALS
//GET /api/practicals

router.get("/", getAllPracticals);

//GET SINGLE PRACTICAL
//GET /api/practicals/:id
//Fetches data from the 'practical' table
router.get("/:id", getPracticalById);

//GET STEPS FOR PRACTICAL
//GET /api/practicals/:id/steps
//Fetches data from the 'practical_steps' table

router.get("/:id/steps", getPracticalSteps);

export default router;