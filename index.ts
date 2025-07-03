import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import userRoutes from './src/routes/userRoutes';
import authRoutes from './src/routes/authRoutes';
import clientRoutes from './src/routes/clientRoutes';
import dealRoutes from './src/routes/dealRoutes';
import taskRoutes from './src/routes/taskRoutes';
import activityRoutes from './src/routes/activityRoutes';

dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // solo se activa en desarrollo
}
app.use(express.json());


app.use('/api', userRoutes);
app.use('/clients', clientRoutes);
app.use('/auth', authRoutes);
app.use('/deals', dealRoutes);
app.use('/tasks', taskRoutes);
app.use("/activity", activityRoutes);

const puerto = process.env.PORT
app.listen( puerto, () => {
  console.log(`Servidor backend corriendo en http://localhost:${puerto}`);
});
