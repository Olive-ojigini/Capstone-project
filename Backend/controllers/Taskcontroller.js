const Task = require('../models/Task');

const createTask = async (req, res) => {
    const { title, description, priority, deadline } = req.body;
    try {
        const task = new Task({ title, description, priority, deadline, userId: req.user.id });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createTask, getTasks };
