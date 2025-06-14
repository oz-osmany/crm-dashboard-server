import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import userRoutes from './src/routes/userRoutes';
import authRoutes from './src/routes/authRoutes';
import clientRoutes from './src/routes/clientRoutes';
dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // solo se activa en desarrollo
}
app.use(express.json());


app.use('/api', userRoutes);
app.use('/clients', clientRoutes);
app.use('/auth/login', authRoutes);

const puerto = process.env.PORT
app.listen( puerto, () => {
  console.log(`Servidor backend corriendo en http://localhost:${puerto}`);
});
