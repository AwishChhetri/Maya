import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8000');

const Chat = ({ userId }) => {
  const SENDER_ID = localStorage.getItem('_id');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Join the chat room when component mounts
    socket.emit('join', userId);

    // Listen for incoming messages
    socket.on('chatMessage', ({ senderId, message }) => {
      // Process incoming message
      setMessages(prevMessages => [...prevMessages, { senderId, message }]);
    });

    // Clean up on component unmount
    return () => {
      socket.disconnect();
    };
  }, [userId]);

  const sendMessage = () => {
    // Send message to server
    socket.emit('chatMessage', { senderId: SENDER_ID, receiverId: userId, message });
    setMessage('');
  };

  return (
    <div>
      <h2>Chat</h2>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <span>{msg.senderId}: </span>
            <span>{msg.message}</span>
          </div>
        ))}
      </div>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
