import React, { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';
import { Box, Text, Input, Button, Flex, List, ListItem } from '@chakra-ui/react';
import axios from 'axios';

const MessageItem = ({ message, senderId }) => (
  <ListItem
    textAlign={message.senderId === senderId ? 'right' : 'left'}
    fontSize="md"
  >
    <Flex justifyContent={message.senderId === senderId ? 'flex-end' : 'flex-start'}>
      <Box borderRadius="lg" p={2} bg={message.senderId === senderId ? 'blue.500' : 'gray.200'} color={message.senderId === senderId ? 'white' : 'black'}>
        {message.message}
      </Box>
    </Flex>
  </ListItem>
);

const Chat = ({ senderId, receiverId, receiverName, roomId }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const socket = io('https://puppy-mzmq.onrender.com'); // assuming your Socket.IO server is running locally on port 8000
  const username = "Abish"; // Current user's username

  const fetchMessages = useCallback(async () => {
    try {
      const response = await axios.get(`/chat-room-messages?roomId=${roomId}`);
      const { messages } = response.data;
      setMessages(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }, [roomId]);

  useEffect(() => {
    // Fetch messages when the component mounts
    fetchMessages();

    // Listen for incoming messages
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Clean up socket on unmount
    return () => {
      socket.disconnect();
    };
  }, [socket, fetchMessages]);

  const handleInputChange = useCallback((event) => {
    setInputMessage(event.target.value);
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    if (inputMessage.trim() !== '') {
      // Emit the message to the server
      socket.emit('chat message', { message: inputMessage, senderId, roomId });
      setInputMessage('');
    }
  }, [socket, inputMessage, senderId, roomId]);

  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" textAlign="center" mb={4}>Chat</Text>
      <List spacing={3} mb={4}>
        {messages.map((message, index) => (
          <MessageItem key={index} message={message} senderId={senderId} />
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
