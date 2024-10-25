const setupSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('sendNotification', (notification) => {
      io.to(notification.receiverId).emit('newNotification', notification);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};

module.exports = setupSocket;