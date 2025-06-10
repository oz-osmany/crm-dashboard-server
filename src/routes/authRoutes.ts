import express from 'express';
import { loginUser, registerUser } from '../controllers/authController';

const router = express.Router();


router.post('/', loginUser);
router.post('/auth/register', registerUser);

export default router;
