import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { Box, Text, Input, Button, Flex, List, ListItem, Spinner } from '@chakra-ui/react';

const Chat = ({ senderId, receiverId, receiverName, roomId }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [socket, setSocket] = useState(null);
  const chatBoxRef = useRef(null);

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
      scrollToBottom();
    });

    socket.on('chat message', (msg) => {
      if (msg.content.trim() !== '') { // Check if the message content is not empty
        setMessages((prevMessages) => [...prevMessages, msg]);
        scrollToBottom();
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
          scrollToBottom();
        } else {
          // Handle error scenario if necessary
          setIsLoading(false);
        }
      });
    }
  };

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  return (
    <div>
      <Box height="400px" overflowY="auto" ref={chatBoxRef}>
        <Text fontSize="xl" fontWeight="bold" textAlign="center" mb={4}>Chat</Text>
        <List spacing={3} mb={4}>
          {messages.map((message, index) => (
            <ListItem
              key={index}
              textAlign={message.senderId === senderId ? 'right' : 'left'}
              fontSize="md"
            >
              <Box pr={6}>{message.senderId === senderId ? 'You' : receiverName}<Box fontWeight="bold" color="blue.300">{message.content}</Box><Box color='gray.300'>{(new Date(message.timestamp).toString() === 'Invalid Date') ? 'now' : new Date(message.timestamp).toLocaleString()}</Box></Box>
            </ListItem>
          ))}
        </List>
      </Box>
      <form onSubmit={handleSubmit} style={{ marginTop: "auto", marginBottom: "1rem" }}>
        <Flex alignItems="center" flexDirection={{ base: 'column', md: 'row' }}>
          <Input
            type="text"
            value={inputMessage}
            onChange={handleInputChange}
            placeholder="Type your message..."
            mb={{ base: 2, md: 0 }}
          />
          {isLoading ? (
            <Spinner size="sm" />
          ) : (
            <Button colorScheme="blue" type="submit" ml={{ base: 0, md: 2 }}>Send</Button>
          )}
        </Flex>
      </form>
    </div>
  );
};

export default Chat;
