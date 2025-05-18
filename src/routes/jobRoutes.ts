import { Router } from "express";
import {
  bookmarkJob,
  getJobById,
  getJobs,
  removeBookmark,
} from "../controllers/jobController";
import { authMiddleware } from "../utils/authMiddleware";

const router = Router();

router.get("/", getJobs);
router.get("/:id", authMiddleware, getJobById);
router.post("/:id/bookmark", authMiddleware, bookmarkJob);
router.delete("/:id/bookmark", authMiddleware, removeBookmark);

export default router;
