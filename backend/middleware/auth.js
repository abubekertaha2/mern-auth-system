//backend/middleware/auth.js
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const protect = async (req, res, next) => {
    // old method for local storage of token
    // let token;
    // if (req.headers.authorization && 
    //     req.headers.authorization.startsWith('Bearer')) {
    //     token = req.headers.authorization.split(' ')[1];
    // }
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        console.error('Error in auth middleware:', error);
        return res.status(401).json({ message: 'Not authorized, token failed' });
    }
}

export default protect;