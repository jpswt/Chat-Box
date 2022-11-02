import React, { useState } from 'react';

function Chat(props) {
	const { socket, username, room } = props;
	const [msg, setMsg] = useState('');
	const [msgList, setMsgList] = useState([]);
	return <div>Chat</div>;
}

export default Chat;
