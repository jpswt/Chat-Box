const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3001',
		methods: ['GET', 'POST'],
	},
});

io.on('connection', (socket) => {
	console.log(`User connected: ${socket.id}`);

	socket.on('disconnect', () => {
		console.log('User disconnected', socket.id);
	});
});

const PORT = 8000;
server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
