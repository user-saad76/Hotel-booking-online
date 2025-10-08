import express from "express";
import { getAIRecommendations } from "../controllers/ai.controller.js";
const router = express.Router();

router.post("/ai/recommend", getAIRecommendations);

export default router;
