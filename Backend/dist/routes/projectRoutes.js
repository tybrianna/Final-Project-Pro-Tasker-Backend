"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectControllers_1 = require("../controllers/projectControllers");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// ALL PROTECTED
router.route("/")
    .post(authMiddleware_1.protect, projectControllers_1.createProject)
    .get(authMiddleware_1.protect, projectControllers_1.getProjects);
router.route("/:id")
    .get(authMiddleware_1.protect, projectControllers_1.getProjectById)
    .put(authMiddleware_1.protect, projectControllers_1.updateProject)
    .delete(authMiddleware_1.protect, projectControllers_1.deleteProject);
exports.default = router;
