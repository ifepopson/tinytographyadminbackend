// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {sequelize,User,Order} = require('../db')



require('dotenv').config();

//reset password

router.post("/reset-password",(req,res) => {
    const {email} = req.body;

  


})

// User Registration
router.post('/register', (req, res) => {
    const { fullName, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    
    User.create({
        name: fullName,
        email: email,
        password: hashedPassword
    }).then(user => { // 'user' is the created user object, not 'res'
        console.log(user.id);
        
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 86400 }); // 24 hours
        
        // Respond to the client
        res.status(200).json({
            id: user.id,
            name: user.name,
            accessToken: token
        });
        
        return user;
    }).catch(err => {
        console.error('Failed to create a new record: ', err);
        // Respond with an error status if needed
        res.status(500).json({ error: "Failed to create user" });
    });
    
    
    
    
    
    
});

// User Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        
        console.log(user);
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        
        if (!passwordIsValid) return res.status(401).json({ accessToken: null, message: 'Invalid Password!' });
        
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 86400 }); // 24 hours
        
        if(user.role == "admin"){
            res.status(200).json({ id: user.id, name: user.name,role: user.role, accessToken: token });
            
        }else{
            res.status(401).json({ accessToken: null });
            
        }
        
        
        
        
        
    }).catch(err => {
        console.log(err);
        
        res.status(500).json({error: "User Not Found"})
        
    })
    
    
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
