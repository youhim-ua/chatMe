const http = require('http');
const app = require('../app');
const server = http.createServer(app);
const io = require('socket.io')(server);

const PORT = 3000;

const startServer = () => server.listen(PORT);
startServer();

io.on('connection', (socket) => {
  console.log('New user connected!');

  socket.username = 'Anonym';

  socket.on('change_username', (data) => {
    socket.username = data.username;
  });

  socket.on('new_message', (data) => {
    io.sockets.emit('new_message', { username: socket.username, message: data.message });
  });
});
