import express from "express"
import { registerUsers,registerUser } from "../controllers/user.controller.js";

const router = express.Router()

router.post('/registers', registerUsers)
router.post('/register', registerUser)

export default router;