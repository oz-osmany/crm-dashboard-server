import express from 'express';
import { verifyToken } from '../middlewares/auth';
import { createDeal, deleteDeal, getDeal, getDealById, updateDeal } from '../controllers/dealController';


const routes = express.Router();

routes.get('/', getDeal);
routes.get('/:id', verifyToken,getDealById);
routes.post('/', createDeal);
routes.put('/:id',verifyToken, updateDeal);
routes.delete('/:id',verifyToken, deleteDeal);

export default routes;