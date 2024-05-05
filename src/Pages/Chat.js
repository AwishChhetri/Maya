import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { Box, Text, Input, Button, Flex, List, ListItem, Spinner } from '@chakra-ui/react';

const Chat = ({ senderId, receiverId, receiverName, roomId }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const socket = io('https://puppy-mzmq.onrender.com');

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket, roomId]); 

  const fetchMessages = useCallback(async () => {
    try {
      const response = await axios.get(`/chat-room-messages?roomId=${roomId}`);
      const { messages } = response.data;
      setMessages(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }, [axios, roomId]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputMessage.trim() !== '') {
      setIsLoading(true); // Set loading state to true when sending message
      socket.emit('chat message', { message: inputMessage, senderId, roomId, receiverId });
      setInputMessage('');
      setIsLoading(false); // Set loading state to false after message is sent
    }
  };

  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" textAlign="center" mb={4}>Chat</Text>
      <List spacing={3} mb={4}>
        {messages.map((message, index) => (
          <ListItem
            key={index}
            textAlign={message.sender === senderId ? 'right' : 'left'}
            fontSize="md"
          >
            {message.senderId === senderId ? 'You' : receiverName}: {message.message}
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
          {/* Show spinner when loading, otherwise show send button */}
          {isLoading ? (
            <Spinner size="sm" />
          ) : (
            <Button colorScheme="blue" type="submit">Send</Button>
          )}
        </Flex>
      </form>
    </Box>
  );
};

export default Chat;
