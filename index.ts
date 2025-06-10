import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './src/routes/userRoutes';
import authRoutes from './src/routes/authRoutes';
import clientRoutes from './src/routes/clientRoutes';
dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());


app.use('/api', userRoutes);
app.use('/clients', clientRoutes);
app.use('/auth/login', authRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
