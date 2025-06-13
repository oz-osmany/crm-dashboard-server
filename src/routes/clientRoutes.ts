// routes/clientRoutes.ts
import express from 'express';
import { createClient, getClients, deleteClient, updateClient, getClientById } from '../controllers/clientController';
import { verifyToken } from '../middlewares/auth';

const router = express.Router();

router.post('/', verifyToken, createClient);
router.get('/', verifyToken, getClients);
router.get('/:id', verifyToken, getClientById);
router.delete('/:id', verifyToken, deleteClient);
router.put('/:id', verifyToken, updateClient);



export default router;

