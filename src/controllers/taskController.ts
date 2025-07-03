import { Request, Response } from "express"
import { createTask, getTasks, tasksById, updateTareas } from "../models/taskModel"



export const getAllTasks = async ( req: Request, res:Response ) => {
    const tasks = await getTasks();
    res.json( tasks );
}
export const getTaskById = async ( req: Request, res:Response ) => {
    try {
        const { id }= req.params;
        const tasks = await tasksById( id );
        res.json(tasks);
    } catch (error) {
        console.error(error);
     res.status(500).json({ message: "Error fetching client task" });
    }
    
}
export const addTask = async ( req: any, res:Response ) => {
    const { title, description, status, due_date, client_id} = req.body;
    const user_id = req.userId;//viene de la verificacion del middleware
    const tasks = await createTask(title, description, status, due_date, client_id, user_id );
    res.json( tasks );
}
export const updateTask = async ( req: Request, res:Response ) => {
    const  { status} = req.body;
      const { id } =req.params;
      const result = await updateTareas(  status, parseInt(id) );
      res.json(result)
}
export const deleteTask = ( req: Request, res:Response ) => {
    
}


