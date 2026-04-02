import express from "express";
import { getQuestionsByPracticalId, saveQuizResult } from "../controllers/quizController.js";

const router = express.Router();

// Route to get questions by Practical ID
router.get("/:id", getQuestionsByPracticalId);

// Route to submit quiz results
router.post("/submit", saveQuizResult);

export default router;