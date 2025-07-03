import { db } from '../config/db'; // ajusta el path a tu conexión
import { RowDataPacket } from 'mysql2'; //preguntar
import { body } from 'express-validator';

type ActivityType = 'task' | 'notes' | 'email' | 'call';

export interface BaseActivity {
  id: number;
  clientId: number;
  contenido: string;
  body: string;
  subject: string;
  description: string;
  created_at: string;
  summary: string;
  
}

export interface ActivityItem extends BaseActivity {
  tipo: ActivityType;
}

const mapResults = (rows: RowDataPacket[], tipo: ActivityType): ActivityItem[] => {
  return rows.map((row) => ({
    id: row.id,
    clientId: row.clientId,
    contenido: row.contenido,
    body: row.body,
    subject: row.subject,
    description: row.description,
    created_at: row.created_at,
    summary: row.summary,
    tipo,
  }));
};
export const getAllEmails = async () => {
  const [ res ] = await db.query( 'SELECT * FROM emails' );
  return res;
}
export const getAllCalls = async () => {
  const [ res ] = await db.query( 'SELECT * FROM calls' );
  return res;
}

export const getAllClientActivity = async (clientId: string): Promise<ActivityItem[]> => {
  const [tasks] = await db.query<RowDataPacket[]>(
    'SELECT id, client_id, contenido, tipo, created_at FROM tasks WHERE client_id = ?',
    [clientId]
  );
  const [notes] = await db.query<RowDataPacket[]>(
    'SELECT id, client_id, description, created_at FROM notes WHERE client_id = ?',
    [clientId]
  );
  const [emails] = await db.query<RowDataPacket[]>(
    'SELECT id, client_id, subject, body, created_at FROM emails WHERE client_id = ?',
    [clientId]
  );
  const [calls] = await db.query<RowDataPacket[]>(
    'SELECT id, client_id, summary, created_at FROM calls WHERE client_id = ?',
    [clientId]
  );

  return [
    ...mapResults(tasks, 'task'),
    ...mapResults(notes, 'notes'),
    ...mapResults(emails, 'email'),
    ...mapResults(calls, 'call'),
  ];
};
