import React, { useState, useEffect } from 'react';

function Chat(props) {
	const { socket, username, room } = props;
	const [msg, setMsg] = useState('');
	const [msgList, setMsgList] = useState([]);

	const sendMsg = async () => {
		if (msg !== '') {
			const msgData = {
				room: room,
				user: username,
				message: msg,
			};
			await socket.emit('send msg', msgData);
			setMsgList((list) => [...list, msgData]);
			setMsg('');
		}
	};

	// useEffect(() => {
	// 	socket.on('receive msg', (data) => {
	// 		setMsg((list) => [...list, data]);
	// 	});
	// }, [socket]);

	return (
		<div className="relative flex flex-col h-full justify-center items-center">
			<div className=" w-[25rem] py-2 bg-neutral-700 text-white rounded-t-md text-center text-xl font-bold  ">
				Coffee Chat Room
			</div>
			<div className="w-[25rem] h-[20rem] bg-white text-stone-900 border-2 border-black border-t-0 "></div>
			<div className="w-[25rem] h-[3rem] bg-white text-stone-700 border-2 border-black border-t-0 flex justify-between">
				<input
					className="mx-2 my-2 mx-0 w-full outline-none "
					type="text"
					value={msg}
					placeholder="Type Text"
					onChange={(e) => {
						setMsg(e.target.value);
					}}
					onKeyUp={(e) => {
						e.key === 'Enter' && sendMsg();
					}}
				/>
				<button
					onClick={sendMsg}
					className=" text-lg border-l-2 border-black px-2 bg-cyan-600 text-white hover:bg-cyan-400 "
				>
					Send
				</button>
			</div>
		</div>
	);
}

export default Chat;
