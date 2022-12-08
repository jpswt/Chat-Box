const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
	},
});

// const io = new Server(httpServer, {
// 	origins: ['http://localhost:3000/'],
// 	methods: ['GET', 'POST'],

// handlePreflightRequest: (req, res) => {
// 	res.writeHead(200, {
// 		'Access-Control-Allow-Origin': 'https://chat2-roan.vercel.app',
// 		'Access-Control-Allow-Methods': 'GET,POST',
// 		'Access-Control-Allow-Headers': 'my-custom-header',
// 		'Access-Control-Allow-Credentials': true,
// 	});
// 	res.end();
// },
// });

io.on('connection', (socket) => {
	socket.removeAllListeners();
	console.log(`User Connected: ${socket.id}`);

	socket.on('join_room', (data) => {
		socket.join(data);
		console.log(`User with ID: ${socket.id} joined room: ${data}`);
	});

	socket.on('send_message', (data) => {
		socket.to(data.room).emit('receive_message', data);
	});

	socket.on('disconnect', () => {
		console.log('User Disconnected', socket.id);
	});
});

const PORT = 8080;
httpServer.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
