// routes/clientRoutes.ts
import express from 'express';
import { createClient, getClients } from '../controllers/clientController';
import { verifyToken } from '../middlewares/auth';

const router = express.Router();

router.post('/', verifyToken, createClient);
router.get('/', verifyToken, getClients);


export default router;

