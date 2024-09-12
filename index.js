const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const { v2 } = require('cloudinary');
const schoolRoutes = require('./routers/schoolRouter'); // Import the routes
const studentRoutes = require('./routers/studentRouter');
const applicationRoutes = require('./routers/applicationRouter');
const recievedNotificationRouter = require('./routers/recievedNotificationRouter')


const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: './config.env'});



// Middleware to parse JSON request body
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/admissionhub').then(console.log('DB connection successful'));

// Use the school routes for the /api endpoint
app.use('/api/v1', schoolRoutes);  // You can prefix the route with /api if you want
app.use('/api/v1', studentRoutes);
app.use('/api/v1/application', applicationRoutes);
app.use('/api/v1/notification', recievedNotificationRouter)

app.listen(3000, () => {
    console.log('System is running on port 3000');
})