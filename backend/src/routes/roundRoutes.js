import express from 'express'

import { createRound,startRound,revealRound,getRecentRounds,getRound } from '../controllers/roundController.js'

const router = express.Router()

router.post("/commit",createRound)
router.post("/:id/start",startRound)
router.post("/:id/reveal",revealRound)
router.get("/", getRecentRounds);
router.get("/:id", getRound);

export default router