import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const checkAuth = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select("-password -token -confirmed");
            
            return next();
            
        } catch (error) {
            error = new Error('Token no válido');
            return res.status(403).json({ msg: error.message });
        }
    } 
    
    if (!token) {
        const error = new Error('Token no válido o inexistente');
        return res.status(403).json({ msg: error.message });
    }

    return next();
};

export default checkAuth;