import { db } from '../config/db';

export const getAllClients = async ()=> {

    const [ res ] = await db.query( 'SELECT * FROM clients' );
    return res;
}

export const removeCLient = async ( id: number ) => {
    try {
        const [result] = await db.query( 'DELETE FROM clients WHERE id=?', [id] );
        return result;
        
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    throw new Error('No se pudieron obtener los clientes');

}
}