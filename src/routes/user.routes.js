import { Router } from "express";
import { createUser, loginUser, logoutUser } from "../controllers/user.controller.js";
import authenticateUser from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/', createUser);
router.post('/login', loginUser);
router.post('/logout', authenticateUser, logoutUser);

export default router;