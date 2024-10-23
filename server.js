// server.js
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

require('./db')

const userRoutes = require('./routes/user'); // Import the user routes

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Use the user routes
app.use('/api', userRoutes); // Prefix the user routes with /api

app.use((req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
  });
  
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
