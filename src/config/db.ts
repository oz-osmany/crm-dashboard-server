import { createPool, Pool } from 'mysql2/promise';

export const db: Pool = createPool({
  host: 'localhost',
  user: 'root',
  password: '', // pon aquí tu contraseña si la tienes
  database: 'skillmarket',
});
