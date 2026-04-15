import express from "express";
import { verifyRound } from "../controllers/roundController.js";

const router = express.Router();

router.get("/verify", verifyRound);

export default router;