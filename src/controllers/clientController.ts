// controllers/clientController.ts
import { Request, Response } from 'express';
import { db } from '../config/db';
import jwt from 'jsonwebtoken';
import { getAllClients, getClient, removeCLient, updateCliente } from '../models/clientModel';


export const createClient = async (req: any, res: any) => {
  const { name, email, phone, status} = req.body;
  const userId = req.userId;
  try {
    const [result] = await db.execute(
      'INSERT INTO clients (name, email, phone, status, user_id) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone, status, userId]
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
export const getClientById = async (req: Request, res: Response) => {
  const { id }=req.params;
    console.log(id)

  const ids= parseInt( id);
  const clientes = await getClient( ids );
  res.json(clientes);
  
}

export const deleteClient = async ( req:any, res: any ) => {
  const { id }=req.params;
  const result = await removeCLient( id );
  res.json({ message: 'Usuario eliminado',result})
  
}
export const updateClient = async ( req:any, res: any ) =>{
  const  { name,email, phone, estatus} = req.body;
  const { id } =req.params;
  const result = await updateCliente( name,email, phone, estatus, id );
  res.json({ message: 'Cliente actualizado' },result)
}
