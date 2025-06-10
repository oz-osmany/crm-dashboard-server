import { db } from '../config/db';

export const getAllUsers = async () => {
  const [rows] = await db.query('SELECT * FROM users');
  return rows;
};

export const createUser = async (name: string, email: string, password: string) => {
  const [result] = await db.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, password]
  );
  return result;
};
export const putUser = async ( name: string, email: string,password: any, id: number ) => {
    
     const [ result ] = await db.query( 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?', [name, email,password, id] );
     return result;
}
export const deleteUser = async (id:number) => {
    const [ result ] = await db.query( 'DELETE from users WHERE id =?', [id] );
    return result;
}