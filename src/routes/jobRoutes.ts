import { Router } from "express";
import { getJobById, getJobs } from "../controllers/jobController";
import { authMiddleware } from "../utils/authMiddleware";

const router = Router();

router.get("/", getJobs);
router.get("/:id", authMiddleware, getJobById);

export default router;
