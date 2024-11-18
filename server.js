// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Create an express app and an HTTP server
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
const io = socketIo(server);

// Serve static files (for the front-end)
app.use(express.static('public'));

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('a user connected');
  
  // Listen for chat messages from clients
  socket.on('chat message', (msg) => {
    console.log('Message received:', msg);
    // Broadcast the message to all clients
    io.emit('chat message', msg);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
