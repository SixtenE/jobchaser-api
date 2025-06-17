import { Router } from "express";
import {
  bookmarkJob,
  getJobs,
  removeBookmark,
} from "../controllers/jobController";
import { authMiddleware } from "../utils/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getJobs);
router.post("/:id/bookmark", authMiddleware, bookmarkJob);
router.delete("/:id/bookmark", authMiddleware, removeBookmark);

export default router;
