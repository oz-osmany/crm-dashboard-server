import { db } from "../config/db";


export const getTasks = async () => {
    const [ result ] = await db.query( 'SELECT * FROM tasks' );
    return result;
}
export const tasksById = async ( id:string) => {
    const [tasks] = await db.query(
          "SELECT * 'task' AS type FROM tasks WHERE client_id = ?",
          [id]
        );
    return tasks;
}

export const createTask = async ( 
    title: string,
    description: string,
    status: string,
    due_date: string,
    client_id: string,
    user_id: number) => {
    const [ result ] = await db.query(
         'INSERT INTO tasks (title, description, status, due_date, client_id, user_id) VALUES (?,?,?,?,?,?)',
        [ title,description,status,due_date,client_id,user_id] );
    return result;
}
export const updateTareas = async ( status:string, id: number ) => {
    try {
        const [result] = await db.query( 'UPDATE tasks SET status=? WHERE id=?', [status, id] )
        return result;
    } catch (error) {
        
    }
}