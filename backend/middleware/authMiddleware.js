const jwt = require('jsonwebtoken');

exports.isAdmin = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded.admin){
            return res.status(401).json({ message: 'Unauthorized: does not have admin access' });
        }
        req.admin = decoded; // Attach user ID to the request object
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

exports.isAuthorized = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user ID to the request object
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};