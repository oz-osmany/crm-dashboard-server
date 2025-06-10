import express from 'express';
import { addUser, getUsers, updateUser, removeUser} from '../controllers/userController';
import { userValidator } from '../validators/useValidator';
import { validate } from '../middlewares/validate';

const router = express.Router(); //Divide las rutas en archivos separados


router.get('/', getUsers);
router.post('/',userValidator, addUser);
router.put('/:id',userValidator, validate, updateUser);
router.delete('/:id', removeUser);
export default router;
