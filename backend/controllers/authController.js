const jwt = require('jsonwebtoken');

exports.authHandler = (req, res) => {
    const { username, password } = req.body;
    // In a real application, you would validate the username and password against a database
    if (username === 'admin' && password === 'password') {
        const token = jwt.sign({ username, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Authentication failed', error: 'Invalid credentials' });
    }
}