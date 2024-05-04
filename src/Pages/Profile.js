import React, { useState, useEffect } from 'react';
import { Box, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalBody, Flex, IconButton } from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';
import { FcCancel } from 'react-icons/fc';
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import Chat from '../Pages/Chat.js'
import { IoIosChatbubbles } from "react-icons/io";

const Profile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [studentDetails, setStudentDetails] = useState(null);
  const [matchDetails, setMatchDetails] = useState([]);
  const userId = localStorage.getItem('_id');

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.post('/student', { userId: userId });
        setStudentDetails(response.data.student);
        setMatchDetails(response.data.matchRequestDetails);
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };

    if (isOpen) {
      fetchStudentDetails();
    }
  }, [isOpen, userId]);

  const handleNotificationClick = () => {
    onOpen();
  };

  // const Delete = async (approvalStatus, vtu) => {
  //   try {
  //     await axios.post('/approve', {
  //       id: vtu,
  //       approvalStatus: approvalStatus,
  //       userId: userId 
  //     });
  //     console.log('Approval submitted successfully');
  //   } catch (error) {
  //     console.error('Error submitting approval:', error);
  //   }
  // };

  return (
    <>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        mb={4}
        p={4}
        onClick={handleNotificationClick}
        cursor="pointer"
        display="flex"
        alignItems="center"
      >
        <FaUser style={{ marginRight: '7px', fontSize: '24px' }} />
        {studentDetails ? (
          <Text fontSize="sm" ml={2} color="blue.500">{studentDetails.VTU}</Text>
        ) : (
          <Text fontSize="sm" ml={2} color="blue.500">Click here...</Text>
        )}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="800px"> {/* Increase the max width */}
          <ModalBody>
             <Text fontWeight="bold" mt={6}>Profile</Text>
            <Box p={6} borderWidth="1px" borderRadius="md" boxShadow="md">
              <Text fontSize="xl" fontWeight="semibold">{studentDetails?.Name}</Text>
              <Text fontSize="lg" mt={2}>VTU: {studentDetails?.VTU}</Text>
              <Text fontSize="md">Degree: {studentDetails?.Degree}</Text>
            </Box>
            <Text fontWeight="bold" mt={6}>Matches:</Text>
            {matchDetails && matchDetails.map((match, index) => (
              <Box key={index} borderWidth="1px" borderRadius="md" p={3} mb={2}>
              <Flex align="center">
                <FaUser style={{ marginRight: '4px' }} />
                <Text fontWeight="bold">{match.name} ({match.VTU})</Text> 
                <IconButton icon={<IoIosChatbubbles style={{ fontSize: '34px' }} />} variant="ghost" colorScheme="blue" ml="auto" />
                <Chat sendId={match.id} />
                {/* <IconButton icon={<MdDelete />} variant="ghost" colorScheme="red" ml={2} onClick={() => deleteMatch(match.id)} style={{ marginLeft: 'auto' }} /> */}
              </Flex>
            </Box>
            
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Profile;
