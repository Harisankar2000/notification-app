// server.js
const app = require('./app');
const http = require('http');
const socketIo = require('socket.io');
const { setupSocket } = require('./sockets/notificationSocket'); // Socket.IO setup function

// Create an HTTP server
const server = http.createServer(app);

// Setup Socket.IO for real-time notifications
const io = socketIo(server);
setupSocket(io); // Initialize Socket.IO events

// Define the port from environment variables or default to 3000
const PORT = process.env.PORT || 3000;

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
