const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const schoolRoutes = require('./routers/schoolRouter'); // Import the routes
const studentRoutes = require('./routers/studentRouter');



const app = express();

// Middleware to parse JSON request body
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/admissionhub').then(console.log('DB connection successful'));

// Use the school routes for the /api endpoint
app.use('/api/v1', schoolRoutes);  // You can prefix the route with /api if you want
app.use('/api/v1', studentRoutes);


app.listen(3000, () => {
    console.log('System is running on port 3000');
})