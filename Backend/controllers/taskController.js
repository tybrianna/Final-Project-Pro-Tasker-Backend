const Task = require(
  "../models/Task"
);

const createTask = async (
  req,
  res
) => {
  const task =
    await Task.create({
      title: req.body.title,
      description:
        req.body.description,
      project: req.body.project,
    });

  res.status(201).json(task);
};

module.exports = {
  createTask,
};