import Employee from "../models/Employee.js";

const agregarEmpleado = async (req, res) => {
    const employee = new Employee(req.body);
    employee.userId = req.user._id;

    try {
        const savedEmployee = await employee.save();
        res.json(savedEmployee);
        console.log(employee);
    } catch (error) {
        console.log(error);
    }

};

const obtenerEmpleados = async (req, res) => {
    const employees = await Employee.find().where('userId').equals(req.user);

    res.json(employees);
};

const obtenerEmpleado = async (req, res) => {
    const { id } = req.params;
    const employee = await Employee.findById(id);

    if (!employee) {
        return res.status(404).json({ msg: 'No encontrado' })
    }

    if (employee.userId._id.toString() !== req.user._id.toString()) {
        return res.json({ msg: 'Acción no valida' });
    }

    res.json(employee);
};

const actualizarEmpleado = async (req, res) => {
    const { id } = req.params;
    const employee = await Employee.findById(id);

    if (!employee) {
        return res.status(404).json({ msg: 'No encontrado' })
    }

    if (employee.userId._id.toString() !== req.user._id.toString()) {
        return res.json({ msg: 'Acción no valida' });
    }

    //Actualizar paciente
    employee.name = req.body.name || employee.name;
    employee.email = req.body.email || employee.email;
    employee.password = req.body.password || employee.password;
    employee.dateOfBirth = req.body.dateOfBirth || employee.dateOfBirth;
    employee.contactNumber = req.body.contactNumber || employee.contactNumber;
    employee.department = req.body.department || employee.department;
    try {
        const updatedEmployee = await employee.save();
        res.json(updatedEmployee);
    } catch (error) {
        console.log(error);
    }
};

const eliminarEmpleado = async (req, res) => {
    const { id } = req.params;
    const employee = await Employee.findById(id);

    if (!employee) {
        return res.status(404).json({ msg: 'No encontrado' })
    }

    if (employee.userId._id.toString() !== req.user._id.toString()) {
        return res.json({ msg: 'Acción no valida' });
    };

    try {
        await employee.deleteOne();
        res.json({msg: 'Empleado eliminado correctamente' })
    } catch (error) {
        console.log(error);
    }
};

export {
    agregarEmpleado,
    obtenerEmpleados,
    obtenerEmpleado,
    actualizarEmpleado,
    eliminarEmpleado
}