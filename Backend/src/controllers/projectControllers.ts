import { Request, Response } from "express";
import Project from "../models/Project";

// CREATE PROJECT
export const createProject = async (req: any, res: Response) => {
  try {
    const { name, description } = req.body;

    const project = await Project.create({
      name,
      description,
      owner: req.user._id,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getProjects = async (req: any, res: Response) => {
  try {
    const projects = await Project.find({
      owner: req.user._id,
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getProjectById = async (req: any, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // OWNERSHIP CHECK
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProject = async (req: any, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);

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
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteProject = async (req: any, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await project.deleteOne();

    res.json({ message: "Project removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};