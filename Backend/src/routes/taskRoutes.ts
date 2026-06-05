import express from "express";
import {
  createTask,
  getTasksByProject,
  updateTask,
  deleteTask,
} from "../controllers/taskControllers";

import { protect } from "../middleware/authMiddleware";

const router = express.Router();

// CREATE TASK
router.post("/", protect, createTask);

// GET TASKS FOR A PROJECT
router.get("/project/:projectId", protect, getTasksByProject);

// UPDATE TASK
router.put("/:id", protect, updateTask);

// DELETE TASK
router.delete("/:id", protect, deleteTask);

export default router;