import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

dotenv.config();

conectarDB();

app.use('/api/users', userRoutes);
app.use('/api/employees', employeeRoutes);

app.listen(PORT, () => {
    console.log(`Servidor escuhando en http://localhost:${PORT}`);
})
