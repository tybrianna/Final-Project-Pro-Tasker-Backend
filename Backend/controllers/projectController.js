const Project = require(
  "../models/Project"
);

const createProject = async (
  req,
  res
) => {
  const project =
    await Project.create({
      name: req.body.name,
      description:
        req.body.description,
      owner: req.user._id,
    });

  res.status(201).json(project);
};