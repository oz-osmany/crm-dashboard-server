import { db } from '../config/db';

export const getAllClients = async ()=> {

    const [ res ] = await db.query( 'SELECT * FROM clients' );
    return res;
}
export const getClient = async ( id:number)=> {

    const [ res ] = await db.query( 'SELECT * FROM clients WHERE id=?',[id] );
    console.log(res)
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

export const updateCliente = async ( name:string, email: string, phone:string, status:string,notes: string, id: number ) => {
    try {
        // console.log(name);
        const [result] = await db.query( 'UPDATE clients SET name=?, email=?, phone=?, status=?, notes=? WHERE id=?', [name, email, phone,status,notes, id] )
        return result;
    } catch (error) {
        
    }
}