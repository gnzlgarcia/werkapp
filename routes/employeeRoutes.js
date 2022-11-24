import express from "express";
const router = express.Router();
import {
    agregarEmpleado,
    obtenerEmpleados,
    obtenerEmpleado,
    actualizarEmpleado,
    eliminarEmpleado
} from "../controllers/employeeController.js"
import checkAuth from "../middleware/authMiddleware.js"

router
    .route('/')
    .post(checkAuth, agregarEmpleado)
    .get(checkAuth, obtenerEmpleados);

router
.route('/:id')
.get(checkAuth, obtenerEmpleado)
.put(checkAuth, actualizarEmpleado)
.delete(checkAuth, eliminarEmpleado);

export default router;