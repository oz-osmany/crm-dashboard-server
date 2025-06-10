// controllers/clientController.ts
import { Request, Response } from 'express';
import { db } from '../config/db';
import jwt from 'jsonwebtoken';


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
export const getClients = async (req: any, res: any) => {
  try {
    const [result]: any = await db.query( 'SELECT * FROM clients' );
    res.json(result)

  } catch (error) {
    return res.status(500).json({ message: 'Error al crear cliente', error });
    
  }
}
