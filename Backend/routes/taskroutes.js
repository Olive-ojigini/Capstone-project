const express = require('express');
const { createTask, getTasks } = require('..Taskcontroller/controllers/');
const authMiddleware = require('..authmiddleware/middleware/');
const router = express.Router();

router.post('/', authMiddleware, createTask);
router.get('/', authMiddleware, getTasks);

module.exports = router;
