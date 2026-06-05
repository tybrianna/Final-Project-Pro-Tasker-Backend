"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.getProjectById = exports.getProjects = exports.createProject = void 0;
const Project_1 = __importDefault(require("../models/Project"));
// CREATE PROJECT
const createProject = async (req, res) => {
    try {
        const { name, description } = req.body;
        const project = await Project_1.default.create({
            name,
            description,
            owner: req.user._id,
        });
        res.status(201).json(project);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.createProject = createProject;
const getProjects = async (req, res) => {
    try {
        const projects = await Project_1.default.find({
            owner: req.user._id,
        });
        res.json(projects);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.getProjects = getProjects;
const getProjectById = async (req, res) => {
    try {
        const project = await Project_1.default.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        // OWNERSHIP CHECK
        if (project.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }
        res.json(project);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.getProjectById = getProjectById;
const updateProject = async (req, res) => {
    try {
        const project = await Project_1.default.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        if (project.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }
        project.name = req.body.name || project.name;
        project.description = req.body.description || project.description;
        const updated = await project.save();
        res.json(updated);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.updateProject = updateProject;
const deleteProject = async (req, res) => {
    try {
        const project = await Project_1.default.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        if (project.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }
        await project.deleteOne();
        res.json({ message: "Project removed" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.deleteProject = deleteProject;
