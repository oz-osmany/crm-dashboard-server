// controllers/authController.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { db } from '../config/db';

export const loginUser = async (req: any, res: any) => {
  const { email, password } = req.body;    
  try {
    const [rows]: any = await db.execute('SELECT * FROM users WHERE email = ?', [email]);

    const user = rows[0];
    
    if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({userId: user.id, name: user.name, email: user.email },
       process.env.JWT_SECRET!, 
       { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Error al iniciar sesión', err });
  }
};
export const registerUser = async (req: any, res: any) => {
  const { name, email, password } = req.body;

  try {
    const [existing]: any = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Ya existe un usuario con ese email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    // Puedes devolver un token directamente si deseas
    const [rows]: any = await db.execute('SELECT id FROM users WHERE email = ?', [email]);
    const token = jwt.sign({ userId: rows[0].id }, process.env.JWT_SECRET!, { expiresIn: '1d' });

    return res.status(201).json({ message: 'Usuario creado exitosamente', token });
  } catch (error) {
    return res.status(500).json({ message: 'Error en el registro', error });
  }
};
