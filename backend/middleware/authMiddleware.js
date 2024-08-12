exports.isAdmin = (req, res, next) => {
    // In a real application, you would check if the user is authenticated and has admin privileges
    // For this example, we'll just assume the user is an admin if they provide an 'admin_token' in the headers
    const adminToken = req.headers['admin_token'];
    if (adminToken === 'secret_admin_token') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }
};