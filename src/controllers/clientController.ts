// controllers/clientController.ts
import { Request, Response } from 'express';
import { db } from '../config/db';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import { getAllClients, removeCLient } from '../models/clientModel';


export const createClient = async (req: any, res: any) => {
  const { name, email, phone, status, notes} = req.body;
  const userId = req.userId;
  // console.log(userId)
  try {
    const [result] = await db.execute(
      'INSERT INTO clients (name, email, phone, status, notes, user_id) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, phone, status, notes, userId]
    );
    const [rows]: any = await db.execute('SELECT id FROM clients WHERE email = ?', [email]);
    const token = jwt.sign({ userId: rows[0].id }, process.env.JWT_SECRET!, { expiresIn: '1d' });

    return res.status(201).json({ message: 'Cliente creado', clientId: (result as any).insertId });
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear cliente', error });
  }
};
export const getClients = async (req: Request, res: Response) => {
  const clientes = await getAllClients();
  res.json(clientes);
  
}

export const deleteClient = async ( req:any, res: any ) => {
  const { id }=req.params;

  const result = await removeCLient( id );
  res.json({ message: 'Usuario eliminado',result})
  
}
