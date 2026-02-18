import express from "express";
import { getAllPracticals, getPracticalById } from "../controllers/practicalController.js";

const router = express.Router();

// Route to get all practicals
router.get("/", getAllPracticals);

// Route to get a specific practical by ID
router.get("/:id", getPracticalById);

export default router;