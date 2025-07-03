import express from 'express';
import { addTask, deleteTask, getAllTasks, getTaskById, updateTask } from '../controllers/taskController';
import { verifyToken } from '../middlewares/auth';

const router = express.Router();

router.get('/', verifyToken,getAllTasks);
router.get('/:id',verifyToken,getTaskById);
router.post('/',verifyToken, addTask);
router.put('/:id',verifyToken, updateTask);
router.delete('/:id',verifyToken,deleteTask);

export default router;