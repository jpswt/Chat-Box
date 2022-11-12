import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './components/Chat';

const socket = io('https://chat2-backend.vercel.app', {
	withCredentials: true,
	extraHeaders: {
		'my-chat-header': 'abcd',
	},
});

function App() {
	const [username, setUsername] = useState('');
	const [room, setRoom] = useState('');
	const [showMsg, setShowMsg] = useState(false);

	const joinRoom = () => {
		if (username !== '' && room !== '') {
			socket.emit('join_room', room);
			setShowMsg(true);
		}
	};

	return (
		<div className="relative w-full h-screen ">
			<img
				className="absolute w-full h-full object-cover mix-blend-overlay bg-left-top"
				src="https://images.unsplash.com/photo-1620121478247-ec786b9be2fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2064&q=80"
				alt=""
			/>
			{!showMsg ? (
				<div className="relative flex flex-col justify-center items-center h-full ">
					<h3 className=" text-3xl font-bold text-white block text-center mb-3">
						Chat Box
					</h3>
					<input
						className=" bg-white py-2 px-4 text-gray=500 mb-2 placeholder:text-gray-600 outline-none w-[16rem]"
						type="text"
						placeholder="Name"
						onChange={(e) => setUsername(e.target.value)}
					/>
					<input
						className="bg-white py-2 px-4 text-gray-500 mb-5 placeholder:text-gray-600 outline-none w-[16rem]"
						type="text"
						placeholder="Room ID"
						onChange={(e) => setRoom(e.target.value)}
					/>
					<button
						className="py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-400 border-white border-2 border-opacity-50 "
						onClick={joinRoom}
					>
						Join Chat
					</button>
				</div>
			) : (
				<Chat socket={socket} username={username} room={room} />
			)}
		</div>
	);
}

export default App;
