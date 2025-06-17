import { Router } from "express";
import { signIn, signUp, verifyAuth } from "../controllers/authController";

const router = Router();

router.post("/sign-in", signIn);
router.post("/sign-up", signUp);
router.post("/verify", verifyAuth);

export default router;
