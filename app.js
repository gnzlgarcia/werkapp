import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/db.js';
import userRoutes from './routes/userRoutes.js'


const app = express();
const PORT = process.env.PORT || 4000;
dotenv.config();

conectarDB();

app.use('/api/userRoutes', userRoutes);

app.listen(PORT, () => {
    console.log(`Servidor escuhando en http://localhost:${PORT}`);
})
