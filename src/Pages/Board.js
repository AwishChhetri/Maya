import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Text, Center, Spinner, Heading, Flex, Select, Input } from '@chakra-ui/react';
import StudentCard from '../Components/Student.js';
import Notification from '../Components/Notification.js';
import Profile from './Profile.js';
import backgroundVideo from '../Material/flower.gif';

const Board = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      let res;
      if (category === 'All') {
        res = await axios.get('/students');
      } else {
        res = await axios.post('/students', { Degree: category });
      }
      let filteredData = res.data;
      if (searchTerm) {
        filteredData = filteredData.filter(product =>
          product.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.VTU.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      setProducts(filteredData); 
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (category || searchTerm) {
      fetchData();
    }
  }, [category, searchTerm]);

  return (
    <div style={{ position: 'relative' }}>
      <Flex justifyContent="space-between" alignItems="center">
        <Notification />
        <Profile />
      </Flex>
      <Center minH="100vh">
        <Box maxW="600px" w="100%" p={4}>
          <Flex direction="column" align="center" justify="center" mb={8}>
            <Heading as="h1" size="2xl" color="teal.600" fontWeight="bold" textAlign="center" mb={4}>
              You deserve the best!
            </Heading>
            <Text fontSize="lg" mt={2} color="teal.500" textAlign="center">
              Search For Your Partner.
            </Text>
          </Flex>
          <Flex mb={4} justify="space-between" align="center">
            <Text fontSize="lg">Partner's Department:</Text>
            <Select value={category} onChange={handleCategoryChange} w="50%">
              <option value="">Select Department</option>
              <option value="All">All departments</option>
              <option value="B.Tech - Aeronautical Engineering">B.Tech - Aeronautical Engineering</option>
              <option value="B.Tech - Bio-Medical Engineering">B.Tech - Bio-Medical Engineering</option>
              <option value="B.Tech - Bio-Technology Engineering">B.Tech - Bio-Technology Engineering</option>
              <option value="B.Tech - Civil Engineering">B.Tech - Civil Engineering</option>
              <option value="B.Tech - Electrical and Electronics Engineering">B.Tech - Electrical and Electronics Engineering</option>
              <option value="B.Tech - Computer Science Engineering">B.Tech - Computer Science Engineering</option>
              <option value="B.Tech - Electronics and Communication Engineering">B.Tech - Electronics and Communication Engineering</option>
              <option value="B.Tech - Mechanical Engineering">B.Tech - Mechanical Engineering</option>
              <option value="B.Tech - Information Technology">B.Tech - Information Technology</option>
            </Select>
          </Flex>
          <Flex mb={4} justify="space-between" align="center">
            <Text fontSize="lg">Search:</Text>
            <Input value={searchTerm} onChange={handleSearchTermChange} w="50%" placeholder="Enter VTU or Name" />
          </Flex>
          {loading ? (
            <Center>
              <Spinner size="xl" />
            </Center>
          ) : (
            products.length ? (
              products.map((product, index) => (
                <StudentCard
                  key={index}
                  name={product.Name}
                  VTU={product.VTU}
                  degree={product.Degree}
                  id={product._id}
                />
              ))
            ) : (
              <Text color="red.300" >Start your search!</Text>
            )
          )}
        </Box>
      </Center>
    </div>
  );
}

export default Board;
