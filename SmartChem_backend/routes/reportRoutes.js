import express from "express";
import { getUserReport } from "../controllers/reportController.js";

const router = express.Router();

router.get("/user/:userId", getUserReport);

export default router;