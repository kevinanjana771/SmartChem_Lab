import express from "express";
import { googleLogin } from "../controllers/authController.js";
import { signup, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/google", googleLogin);
router.post("/signup", signup);
router.post("/login", login);

export default router;
