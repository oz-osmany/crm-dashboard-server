import { Request, Response } from 'express';
import { getAllUsers, createUser, putUser, deleteUser } from '../models/userModel';
import bcrypt from 'bcrypt';
import { db } from '../config/db'; 


export const getUsers = async (_req: Request, res: Response) => {
  const users = await getAllUsers();
  res.json(users); 
};

export const addUser = async ( req: any, res: any ) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await createUser(name, email, hashedPassword);
  res.json({ message: 'Usuario creado', result });
};

export const updateUser = async ( req: any, res: any ) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const result = await putUser(name, email, hashedPassword, id);
        res.json({ message: 'Usuario actualizado', result})
        
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el usuario', error });
    }
     
    
}
export const removeUser = async ( req: any, res: any ) => {
    const { id } = req.params;
    try {
        const result = await deleteUser( id);
        res.json({ message: 'Usuario eliminado',result})
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar el usuario', error });
    }
}
