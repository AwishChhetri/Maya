import React, { useState } from 'react';
import axios from 'axios';
import { Box, Text, Button, IconButton, Flex } from '@chakra-ui/react';
import { FaHeart } from "react-icons/fa";

const StudentCard = ({ name, VTU, degree, id }) => {
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem('_id');

  const submitHandler = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/add-match', {
        userId,
        matchId: id
      });

      if (res.status === 200) {
        console.log('Match request sent:', res.data.message);
      } else if (res.status === 400) {
        console.log('Error:', res.data.error);
      }
    } catch (error) {
      console.error('Error sending match request:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      mb={4}
      p={4}
      position="relative"
      boxShadow="lg"
    >
      <Text fontSize="xl" fontWeight="semibold">{name}</Text>
      <Text fontSize="lg" mt={2}>VTU: {VTU}</Text>
      <Text fontSize="md">Degree: {degree}</Text>
      <Flex justify="flex-end" align="center" mt={2}>
        <Box mr={2} display="flex" alignItems="center" onClick={submitHandler}>
          <IconButton
            size="md"
            colorScheme="red"
            aria-label="Send Match Request"
            icon={<FaHeart />}
            isLoading={loading}
            loadingText="Sending..."
          />
          <Text fontSize="sm" ml={2}>Match Request</Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default StudentCard;
