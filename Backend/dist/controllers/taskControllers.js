"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTasksByProject = exports.getAllTasks = exports.createTask = void 0;
const Task_1 = __importDefault(require("../models/Task"));
const Project_1 = __importDefault(require("../models/Project"));
// CREATE TASK
const createTask = async (req, res) => {
    try {
        const { title, description, type, projectId, dueDate } = req.body;
        const project = await Project_1.default.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        // OWNERSHIP CHECK
        if (project.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }
        const task = await Task_1.default.create({
            title,
            description,
            type,
            project: projectId,
            dueDate,
        });
        res.status(201).json(task);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.createTask = createTask;
// GET ALL TASKS FOR USER
const getAllTasks = async (req, res) => {
    try {
        const projects = await Project_1.default.find({ owner: req.user._id });
        const projectIds = projects.map((p) => p._id);
        const tasks = await Task_1.default.find({ project: { $in: projectIds } }).populate("project");
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.getAllTasks = getAllTasks;
const getTasksByProject = async (req, res) => {
    try {
        const project = await Project_1.default.findById(req.params.projectId);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        if (project.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }
        const tasks = await Task_1.default.find({
            project: req.params.projectId,
        });
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.getTasksByProject = getTasksByProject;
const updateTask = async (req, res) => {
    try {
        const task = await Task_1.default.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        const project = await Project_1.default.findById(task.project);
        if (project?.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }
        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.status = req.body.status || task.status;
        task.type = req.body.type || task.type;
        task.dueDate = req.body.dueDate || task.dueDate;
        const updated = await task.save();
        res.json(updated);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.updateTask = updateTask;
const deleteTask = async (req, res) => {
    try {
        const task = await Task_1.default.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        const project = await Project_1.default.findById(task.project);
        if (project?.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }
        await task.deleteOne();
        res.json({ message: "Task deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.deleteTask = deleteTask;
