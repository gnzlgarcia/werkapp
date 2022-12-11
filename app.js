import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import conectarDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

dotenv.config();

conectarDB();

const dominiosPermitidos = [process.env.FRONTEND_URL];

const corsOption = {

    origin: function(origin, callback) {
        if(dominiosPermitidos.indexOf(origin) !== -1) {
            //El origen del request está permitido
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
}

app.use(cors(corsOption));

app.use('/api/users', userRoutes);
app.use('/api/employees', employeeRoutes);

app.listen(PORT, () => {
    console.log(`Servidor escuhando en http://localhost:${PORT}`);
})
