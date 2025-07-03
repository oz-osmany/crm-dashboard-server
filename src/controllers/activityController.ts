import { Request, Response } from 'express';
import { getAllCalls, getAllClientActivity, getAllEmails } from '../models/activityModel';

import {db} from "../config/db";

// NOTAS
export const createNote = async (req:any, res:any) => {
  const { client_id, user_id, description } = req.body;
  try {
    await db.query(
      "INSERT INTO notes (client_id, user_id, description) VALUES (?, ?, ?)",
      [client_id, user_id, description]
    );
    res.status(201).json({ message: "Note created" });
  } catch (error) {
    res.status(500).json({ message: "Error creating note" });
  }
};

// EMAILS
export const createEmail = async (req:any, res:any) => {
  const { client_id, user_id, subject, body } = req.body;
  try {
    await db.query(
      "INSERT INTO emails (client_id, user_id, subject, body) VALUES (?, ?, ?, ?)",
      [client_id, user_id, subject, body]
    );
    res.status(201).json({ message: "Email created" });
  } catch (error) {
    res.status(500).json({ message: "Error creating email" });
  }
};

// CALLS
export const createCall = async (req:any, res:any) => {
  const { client_id, user_id, summary } = req.body;
  try {
    await db.query(
      "INSERT INTO calls (client_id, user_id, summary) VALUES (?, ?, ?)",
      [client_id, user_id, summary]
    );
    res.status(201).json({ message: "Call logged" });
  } catch (error) {
    res.status(500).json({ message: "Error logging call" });
  }
};

// export const getClientTasks = async (req: any, res: any) => {
//   const { clientId } = req.params;
//   const [rows] = await db.query(
//     "SELECT id, title, description, status, created_at FROM tasks WHERE client_id = ?",
//     [clientId]
//   );
//   const tasks = Array.isArray(rows) ? rows : [];
//   res.json(tasks.map((row: any) => ({ ...row, type: "task" })));
// };

// export const getClientNotes = async (req: any, res: any) => {
//   const { clientId } = req.params;
//   const [rows] = await db.query(
//     "SELECT id, description, created_at FROM notes WHERE client_id = ?",
//     [clientId]
//   );
//   const tasks = Array.isArray(rows) ? rows : [];

//   res.json(tasks.map((row: any) => ({ ...row, type: "note" })));
// };
// export const getClientEmails = async (req: any, res: any) => {
//   const { clientId } = req.params;
//   const [rows] = await db.query(
//       "SELECT id, subject, body AS description, created_at, 'email' AS type FROM emails WHERE client_id = ?",
//     [clientId]
//   );
//   const tasks = Array.isArray(rows) ? rows : [];

//   res.json(tasks.map((row: any) => ({ ...row, type: "note" })));
// };
// export const getClientCalls = async (req: any, res: any) => {
//   const { clientId } = req.params;
//   const [rows] = await db.query(
//           "SELECT id, summary AS description, created_at, 'call' AS type FROM calls WHERE client_id = ?",
//       [clientId]
//   );
//   const tasks = Array.isArray(rows) ? rows : [];

//   res.json(tasks.map((row: any) => ({ ...row, type: "note" })));
// };

// Igual para emails y calls



type ActivityType = 'task' | 'notes' | 'email' | 'call';

interface BaseActivity {
  id: number;
  clientId: number;
  contenido: string;
  created_at: string;
  
}

interface ActivityItem extends BaseActivity {
  type: ActivityType;
}

export const getClientActivity = async (req: Request, res: Response) => {
  const clientId = req.params.clientId;

  try {
    const activities = await getAllClientActivity(clientId);

    // Ordenar por created_at descendente
    activities.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    res.json(activities);
  } catch (error) {
    console.error('Error al obtener actividades:', error);
    res.status(500).json({ message: 'Error al obtener actividades del cliente' });
  }
};

export const getEmails = async ( req: Request, res: Response ) => {
  try {
    const activities = await getAllEmails();
    res.json(activities)
    
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los emails' });
    
  }
}
export const getCalls = async ( req: Request, res: Response ) => {
  try {
    const activities = await getAllCalls();
    res.json(activities)
    
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los calls' });
    
  }
}
