require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes'); // Authentication routes
const notificationRoutes = require('./routes/notificationRoutes'); // Notification routes
const sequelize = require('./config/database');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/users', authRoutes);
app.use('/notifications', notificationRoutes);

// Database connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

module.exports = app;