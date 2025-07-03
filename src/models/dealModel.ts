import { db } from '../config/db';

interface Tipo{
    client_id: string;
    title:string;
    amount: number;
    status:string;
    close_date:string;
    notes: string
}

export const newDeal = async (data: Tipo) => {
    const { client_id, title, amount, status, close_date, notes }= data
    const [ result ] = await db.query( 'INSERT INTO deals (client_id, title, amount, status,close_date, notes) VALUES (?,?,?,?,?,?)',
        [ client_id, title, amount, status,close_date, notes ] );
    return result;
}

export const getAllDeal = async () => {
    const [ result ] = await db.query( 'SELECT * FROM deals' );
    return result;
}
export const getIdDeal = async ( id: string ) => {
    const [ result ] = await db.query( 'SELECT * FROM deals WHERE client_id=?', [ id ] );
    return result;
}

export const putDeal = async ( id: string, data:Tipo ) => {
    const { client_id, title, amount, status, notes }= data;
    const [ result ] = await db.query( 'UPDATE deals SET client_id=?, title=?, amount=?, status=?, notes=?  WHERE id=? ',
         [ client_id,title,amount,status, notes, id] );
    return result;
}

export const removeDeal = async ( id:string) => {
    const [ result ] = await db.query( 'DELETE FROM deals WHERE id=?', [ id ] );
    return result;

}