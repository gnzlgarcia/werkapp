import generateId from "../helpers/generateId.js";
import generateJWT from "../helpers/generateJWT.js";
import User from "../models/User.js";

const registrar = async (req, res) => {
    const { email } = req.body;

    //Prevenir usuario duplicado
    const userExist = await User.findOne({ email });
    if (userExist) {
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({ msg: error.message })
    }

    try {
        //Guarda nuevo usuario
        const user = new User(req.body);
        const saveUser = await user.save();

        res.json(saveUser);
    } catch (error) {
        console.log(error);
    }
};

const perfil = (req, res) => {
    const { user } = req;
    res.json({ perfil: user });
};

//Confirmar usuario
const confirmar = async (req, res) => {
    const { token } = req.params;

    try {
        const userConfirm = await User.findOne({ token });
        if (!userConfirm) {
            const error = new Error('Token no encontrado');
            return res.status(404).json({ msg: error.message });
        }
        userConfirm.token = null;
        userConfirm.confirmed = true;
        await userConfirm.save();
        console.log('Usuario Confirmado Correctamente');
    } catch (error) {
        console.log(error);
    }

    // res.json({ msg: 'Confirmando cuenta...' });
};

const autenticar = async (req, res) => {
    const { email, password } = req.body;

    // Comprobar si un usuario existe
    const user = await User.findOne({ email });
    if (!user) {
        const error = new Error('El usuario NO existe');
        return res.status(404).json({ msg: error.message });
    }

    // Comprobar si un usuario esta confirmado
    if (!user.confirmed) {
        const error = new Error('El usuario NO a sido confirmado');
        return res.status(403).json({ msg: error.message });
    }

    // Comprobar password
    if (await user.checkPassword(password)) {
        res.json({ token: generateJWT(user.id) });
    } else {
        const error = new Error('Password incorrecto');
        return res.status(403).json({ msg: error.message });
    }
}

const olvidePassword = async (req, res) => {
    const { email } = req.body;

    //Comprobar si usuario existe
    const userExist = await User.findOne({ email });
    if (!userExist) {
        const error = new Error('El usuario no existe');
        return res.status(400).json({ msg: error.message })
    }

    try {
        //Generar nuevo token y guardarlo
        userExist.token = generateId();
        await userExist.save();

        res.json({ msg: "Hemos enviado un mail con las instrucciones" });
    } catch (error) {
        console.log(error);
    }
}

const comprobarToken = async (req, res) => {
    const { token } = req.params;

    //Comprobar si el token es valido
    const validToken = await User.findOne({ token });
    if (validToken) {
        res.json({ msg: "Token valido, el usuario es existe" });
    } else {
        const error = new Error('Token no valido');
        return res.status(400).json({ msg: error.message });
    }
}

const nuevoPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    //Comprobar si el token es valido
    const user = await User.findOne({ token });
    if (!user) {
        const error = new Error('Hubo un error');
        return res.status(400).json({ msg: error.message });
    }
    
    try {
        //Generar nuevo token y guardarlo
        user.token = null;
        user.password = password;
        await user.save();

        res.json({msg: "Password cambiado correctamente"});
        
    } catch (error) {
        console.log(error);
    }
}

export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword
}; 