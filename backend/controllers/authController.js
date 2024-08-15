const jwt = require('jsonwebtoken');
const { instance: store } = require('../store/inMemoryStore');
const authMiddleware = require('../middleware/authMiddleware');

exports.login = (req, res) => {

    const { email, password } = req.body;
    try{

        // Find the user by email
        const user = store.getUserByEmail(email);

        if(email==='admin@gmail.com'){

            // Generate JWT token
            const token = jwt.sign({ id: user.id, admin: true }, process.env.JWT_SECRET, { expiresIn: '1h' });
            // Set token in the cookie
            setTokenCookie(res, token);

            return res.status(200).json({ message: 'Login successful' });
        }

        
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // Set token in the cookie
        setTokenCookie(res, token);

        res.status(200).json({ message: 'Login successful' });
        
    }catch(error){
        console.log(`Error while loging in for email : ${email} , error : `,error);
        res.status(500).json({message:'Invalid Credentials', error: 'Invalid Credentials'});
    }

}
const setTokenCookie = (res, token) => {
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600000 // 1 hour
    });
};

exports.signup = (req,res) => {
    const {username, password, email} = req.body;
    try{
        const user = store.addUser({username,password,email});
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        setTokenCookie(res, token);

        res.status(201).json({ message: 'User registered successfully' });
    }catch(error){
        console.log(`Error while siginup for email : ${email} , error : `,error);
        res.status(500).json({message:'Something went wrong while signing up', error: 'Something went wrong'});
    }
}