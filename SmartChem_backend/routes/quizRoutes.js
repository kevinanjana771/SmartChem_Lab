import express from "express";
import { getQuestionsByPracticalId } from "../controllers/quizController.js";

const router = express.Router();

// Route to get questions by Practical ID
router.get("/:id", getQuestionsByPracticalId);

export default router;