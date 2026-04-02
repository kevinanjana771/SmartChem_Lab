import express from "express";
import { getUserReport, resetUserProgress } from "../controllers/reportController.js";

const router = express.Router();

router.get("/user/:userId", getUserReport);
router.delete("/reset/:userId", resetUserProgress);

export default router;