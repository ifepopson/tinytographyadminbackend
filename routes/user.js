// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('../db')

require('dotenv').config();

// User Registration
router.post('/register', (req, res) => {
    const { fullName, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
        if (err) return res.status(500).json({ message: 'Error registering user.' });
        res.status(201).json({ id: result.insertId, username });
    });
});

// User Login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) return res.status(500).json({ message: 'Error on server.' });
        if (results.length === 0) return res.status(404).json({ message: 'User not found.' });

        const user = results[0];
        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) return res.status(401).json({ accessToken: null, message: 'Invalid Password!' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 86400 }); // 24 hours
        res.status(200).json({ id: user.id, username: user.username, accessToken: token });
    });
});

// Middleware to Authenticate Token
function auth(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(403).json({ message: 'No token provided!' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Unauthorized!' });
        req.userId = decoded.id;
        next();
    });
}

// Protected Route Example
router.get('/protected', auth, (req, res) => {
    res.status(200).json({ message: 'This is a protected route!' });
});

// Export the router
module.exports = router;
