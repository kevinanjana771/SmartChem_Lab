import express from "express";
import {
  getAllPracticals,
  getPracticalById,
  getPracticalSteps,
  getPracticalEquipments, 
  getPracticalChemicals,
  trackPracticalCompletion
} from "../controllers/practicalController.js";

const router = express.Router();


//GET ALL PRACTICALS
//GET /api/practicals

router.get("/", getAllPracticals);


//GET SINGLE PRACTICAL
//GET /api/practicals/:id

router.get("/:id", getPracticalById);


//GET STEPS FOR PRACTICAL
//GET /api/practicals/:id/steps

router.get("/:id/steps", getPracticalSteps);


//GET EUIPMENTS FOR PRACTICAL (RESTORED)
//GET /api/practicals/:id/equipments

router.get("/:id/equipments", getPracticalEquipments);

router.get("/:id/chemicals", getPracticalChemicals);

router.post("/:id/complete", trackPracticalCompletion);

export default router;