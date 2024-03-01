const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, getUserByUsername } = require('../db/dbQueries'); // Create the user profile inside the 
const app = express(); // Create the server
const cors = require('cors'); // CORS is used to allow requests from the client
app.use(cors());
app.use(express.json());
const router = express.Router();
app.use(cors({
    origin: 'http://localhost:3001/auth' // replace with your origin
}));
router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await createUser(req.body.username, hashedPassword, req.body.role || 'user');
        res.json(user);
    } catch (err) {
        console.error("Error occurred", err);
        res.status(500).json({ error: err.message, password: req.body.password });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await getUserByUsername(username);
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        if (user.role === 'admin') {
            res.json({ token, role: user.role });
        } else if (user.role === 'user') {
            res.json({ token, role: user.role });
        } else if (user.role === "admin") {
            res.redirect('https://localhost:3001/quiz');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while logging in the user' });
    }
});


function restrictToUserType(req, res, next) {
    const token = req.headers['authorization'].split(' ')[1]; // Extract the token from the header

    if (!token) {
        return res.status(403).json({ message: 'No token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to authenticate token.' });
        }
    });
}

app.get('/quiz', restrictToUserType, (req, res) => {
    res.redirect('localhost:3001/auth/login');
});

module.exports = router;