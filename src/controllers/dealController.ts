import { Request, Response } from 'express';
import { db } from '../config/db';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import { getAllDeal, getIdDeal, newDeal, putDeal, removeDeal } from '../models/dealModel';

export const createDeal = async (req: any, res:any) =>{
    const rows:any = await newDeal(req.body);
    res.json({ message: 'Deal creado'}, rows);        
   
}

export const getDeal = async ( req: Request, res: Response ) => {
    const rows = await getAllDeal();
    res.json( rows );
}

export const getDealById = async ( req: Request, res: Response ) => {
    const id = req.params.id;
    const rows = await getIdDeal( id );
    res.json( rows );
}

export const updateDeal = async ( req: Request, res: Response ) => {
    const data = req.body;
    const id = req.params.id
    try {
        const rows = await putDeal( id, data);
        res.json({ message: 'Deal eliminado',rows})

    } catch (error) {
        res.status(500).json({ message: 'Error updating deal', error });
    }
}
export const deleteDeal = async ( req: Request, res: Response ) => {
    const id = req.params.id;
    try {
        const rows = await removeDeal( id );
    } catch (error) {
        res.status(500).json({ message: 'No se pudo borrar e deal', error})
    }

    
}