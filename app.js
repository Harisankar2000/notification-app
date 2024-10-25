// app.js
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');
const authRoutes = require('./routes/authRoutes'); // Authentication routes
const notificationRoutes = require('./routes/notificationRoutes'); // Notification routes
const { sequelize } = require('./models'); // Sequelize models for database sync
const { setupSocket } = require('./sockets/notificationSocket'); // Socket.IO setup

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
