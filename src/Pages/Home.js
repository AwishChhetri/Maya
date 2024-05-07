import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import floswer from '../Material/flower.gif';

function Home() {
  const navigate = useNavigate();

  const redirectToLogin = () => {
    // Redirect to the login page
    navigate('/login'); // Assuming '/login' is the route to your login page
  };

  return (
    <Box textAlign="center" m={0} backgroundColor="rgb(240, 180, 158)" backgroundImage={`url(${floswer})`} backgroundSize="cover" minHeight="100vh" px={4}>
      <h1 ontSize="md" mt="4" color='red'>For Batch(2025,2026,2027)</h1>
      <Heading as="h1" size="2xl" mt="12" pt={60}color='white'>
         Cupid
      </Heading>
      <Text fontSize="md" mt="4" color='white'>The place where you find you best match.</Text>
      <Button mt="4" colorScheme="gray" onClick={redirectToLogin}>Login</Button>
    </Box>
  );
}

export default Home;
