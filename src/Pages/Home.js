import React from 'react';
import { useNavigate } from 'react-router-dom';
import floswer from '../Material/flower.gif';
import {Link} from "react-router-dom"
import { Box, Text, Center, Spinner, Heading, Flex, Select, Input, Button } from '@chakra-ui/react';
function Home() {


 

  return (
    <Box textAlign="center" m={0} backgroundColor="rgb(240, 180, 158)" backgroundImage={`url(${floswer})`} backgroundSize="cover" minHeight="100vh" px={2}>
      <h1 ontSize="md" mt="4" color='white'>...</h1>
      <Heading as="h1" size="2xl" mt="12" pt={60}color='pink.400' >
         Cupid
      </Heading>
      <Text fontSize="md" mt="4" color='black.400' pb={8}>The place to connect with the best match.</Text>
      <Button
              colorScheme="pink"
              bgGradient="linear(to-r, red.400, pink.400)"
              _hover={{
                bgGradient: 'linear(to-r, pink.400, red.400)',
              }}
             py={4}
              mb={2}
            ><Link to='/login'>
              Login</Link>
            </Button>
    </Box>
  );
}

export default Home;
