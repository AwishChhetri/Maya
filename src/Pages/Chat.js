import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Box, Text, Input, Button, Flex, List, ListItem } from '@chakra-ui/react';

const Chat = ({ senderId, receiverId, receiverName }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const socket = io('https://puppy-mzmq.onrender.com'); // assuming your Socket.IO server is running locally on port 8000
  const username = "Abish"; // Current user's username

  useEffect(() => {

    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Clean up socket on unmount
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputMessage.trim() !== '') {
      // Send the message to the server along with the sender's and receiver's IDs
      socket.emit('chat message', { message: inputMessage, senderId, receiverId });
      setInputMessage('');
    }
  };

  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" textAlign="center" mb={4}>Chat</Text>
      <List spacing={3} mb={4}>
        {messages.map((message, index) => (
          <ListItem
            key={index}
            textAlign={message.sender === username ? 'right' : 'left'}
            fontSize="md"
          >
            {message.sender === username ? 'You' : message.sender}: {message.message}
          </ListItem>
        ))}
      </List>
      <form onSubmit={handleSubmit}>
        <Flex alignItems="center">
          <Input
            type="text"
            value={inputMessage}
            onChange={handleInputChange}
            placeholder="Type your message..."
            mr={2}
          />
          <Button colorScheme="blue" type="submit">Send</Button>
        </Flex>
      </form>
    </Box>
  );
};

export default Chat;
