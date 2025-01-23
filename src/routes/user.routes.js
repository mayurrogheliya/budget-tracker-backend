import { Router } from "express";
import { createUser, loginUser, logoutUser, verifyEmail } from "../controllers/user.controller.js";
import authenticateUser from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/', createUser);
router.post('/login', loginUser);
router.post('/logout', authenticateUser, logoutUser);
router.get('/verify-email/:token', verifyEmail);

export default router;