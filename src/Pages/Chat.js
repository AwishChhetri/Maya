import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Box, Text, Input, Button, Flex, List, ListItem, Spinner } from '@chakra-ui/react';

const Chat = ({ senderId, receiverId, receiverName, roomId }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [socket, setSocket] = useState(null);
  
  useEffect(() => {
    const newSocket = io('https://puppy-mzmq.onrender.com');
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.emit('connected', roomId);

    socket.on('previous_messages', (msg) => {
      setMessages(msg);
    });

    socket.on('chat message', (msg) => {
      if (msg.content.trim() !== '') { // Check if the message content is not empty
        setMessages((prevMessages) => [...prevMessages, msg]);
      }
    });

    return () => {
      socket.off('previous_messages');
      socket.off('chat message');
    };
  }, [socket, roomId]);

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputMessage.trim() !== '') {
      setInputMessage('');
      setIsLoading(true);
  
      socket.emit('chat message', { content: inputMessage, senderId, roomId, receiverId }, (ack) => {
        if (ack && ack.success) {
          setIsLoading(false); // Set loading state to false after message is sent successfully
        } else {
          // Handle error scenario if necessary
          setIsLoading(false);
        }
      });
    }
  };
  
  

  return (
    <div>
    <Box height="600px" overflowY="auto">
    <Text fontSize="xl" fontWeight="bold" textAlign="center" mb={4}>Chat</Text>
    <List spacing={3} mb={4}>
      {messages.map((message, index) => (
        <ListItem
          key={index}
          textAlign={message.senderId === senderId ? 'right' : 'left'}
          fontSize="md"
        >
          <Box>{message.senderId === senderId ? 'You' : receiverName}<Box color="blue.300">{message.content}</Box><Box color='gray.300'>{(new Date(message.timestamp).toString() === 'Invalid Date') ? 'now' : new Date(message.timestamp).toLocaleString()}</Box></Box>
        </ListItem>
      ))}
    </List>
    </Box>
    <form onSubmit={handleSubmit} style={{ marginTop: "auto", marginBottom: "1rem" }}>
      <Flex alignItems="center">
        <Input
          type="text"
          value={inputMessage}
          onChange={handleInputChange}
          placeholder="Type your message..."
          mr={2}
        />
        {isLoading ? (
          <Spinner size="sm" />
        ) : (
          <Button colorScheme="blue" type="submit">Send</Button>
        )}
      </Flex>
    </form>
    </div>
  
  );
};

export default Chat;
