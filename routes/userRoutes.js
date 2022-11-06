import express from 'express';
import { perfil, registrar } from '../controllers/userController.js';
const router = express.Router();

/* GET users listing. */
router.get('/', registrar);

router.get('/perfil', perfil);

export default router;