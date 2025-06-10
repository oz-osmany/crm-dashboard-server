// routes/clientRoutes.ts
import express from 'express';
import { createClient, getClients, deleteClient } from '../controllers/clientController';
import { verifyToken } from '../middlewares/auth';

const router = express.Router();

router.post('/', verifyToken, createClient);
router.get('/', verifyToken, getClients);
router.delete('/:id', verifyToken, deleteClient);



export default router;

