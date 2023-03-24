const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');

const server = http.createServer(app);
const { Server } = require("socket.io");
/* const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  }); */

  const io = new Server(server, {
    cors: {
      origin: "https://blender-codeyourwaytofreedom.vercel.app",
      methods: ["GET", "POST"]
    }
  });

app.use(cors({ origin: true, credentials: true }));

io.on('connection', (socket) => {
  console.log('connected');

  // on message
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', "I am happy to help you. how can I help?");
  });
});

server.listen(80, () => {
  console.log('listening on 80');
});