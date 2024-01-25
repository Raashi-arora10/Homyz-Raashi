const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes.js');
// const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://raashiarora1006:06072022@cluster0.rj72f3s.mongodb.net/estate?retryWrites=true&w=majority');
const db = mongoose.connection;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', authRoutes); 

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
