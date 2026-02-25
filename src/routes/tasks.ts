/** @format */
import express from 'express';
import { createNewTask, deleteTask, getAllTasks, getTask, updateTask } from '../controllers/tasks';
const router = express.Router();

router.get('/', getAllTasks);
router.get('/:id', getTask);
router.post('/', createNewTask);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
