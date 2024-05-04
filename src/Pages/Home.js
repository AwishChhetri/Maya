import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Heading, Text, Button } from '@chakra-ui/react';

function Home() {
  const navigate = useNavigate();

  const redirectToLogin = () => {
    // Redirect to the login page
    navigate('/login'); // Assuming '/login' is the route to your login page
  };

  return (
    <Box textAlign="center">
      <Heading as="h1" size="xl" mt="8">Puppy Love!</Heading>
      <Text fontSize="lg" mt="4">Please log in to continue:</Text>
      <Button mt="4" colorScheme="blue" onClick={redirectToLogin}>Login</Button>
    </Box>
  );
}

export default Home;
