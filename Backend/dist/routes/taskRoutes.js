"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskControllers_1 = require("../controllers/taskControllers");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// CREATE TASK
router.post("/", authMiddleware_1.protect, taskControllers_1.createTask);
// GET TASKS FOR A PROJECT
router.get("/project/:projectId", authMiddleware_1.protect, taskControllers_1.getTasksByProject);
// UPDATE TASK
router.put("/:id", authMiddleware_1.protect, taskControllers_1.updateTask);
// DELETE TASK
router.delete("/:id", authMiddleware_1.protect, taskControllers_1.deleteTask);
exports.default = router;
