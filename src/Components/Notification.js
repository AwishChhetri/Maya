import React, { useState, useEffect } from 'react';
import { Box, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalBody, Flex, IconButton } from '@chakra-ui/react';
import { IoNotifications } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';
import { FcApproval, FcCancel } from 'react-icons/fc';
import axios from 'axios';

const Notification = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [matchRequestDetails, setMatchRequestDetails] = useState([]);
  const userId = localStorage.getItem('_id');

  useEffect(() => {
    const fetchMatchRequestDetails = async () => {
      try {
        const response = await axios.get(`/matchRequest/${userId}`);
        setMatchRequestDetails(response.data.matchRequestDetails);
      } catch (error) {
        console.error('Error fetching match request details:', error);
      }
    };

    if (isOpen) {
      fetchMatchRequestDetails();
    }
  }, [isOpen, userId]);

  const submitApproval = async (approvalStatus, vtu) => {
    try {
      await axios.post('/approve', {
        id: vtu,
        approvalStatus: approvalStatus,
        userId: userId 
      });
      console.log('Approval submitted successfully');
    } catch (error) {
      console.error('Error submitting approval:', error);
    }
  };

  const handleNotificationClick = () => {
    onOpen();
  };

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
        <IoNotifications style={{ marginRight: '7px', fontSize: '24px' }} />
        {matchRequestDetails && matchRequestDetails.length > 0 ? (
          <Text fontSize="sm" ml={2} color="blue.500">You have {matchRequestDetails.length} new match requests</Text>
        ) : (
          <Text fontSize="sm" ml={2} color="blue.500">No requests yet! Have Patience.</Text>
        )}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="600px"> {/* Set max width here */}
          <ModalBody>
            <Text fontWeight="bold">Match Requests:</Text>
            <Text>You will have a match if you 'click' the match icon.</Text>
            {matchRequestDetails.map((request, index) => (
              <Box key={index} borderWidth="1px" borderRadius="md" p={3} mb={2}>
                <Flex align="center">
                  <FaUser style={{ marginRight: '4px' }} />
                  <Text fontWeight="bold">Name:</Text> {request.name} ({request.VTU})
                  <IconButton icon={<FcApproval />} variant="ghost" colorScheme="green" ml={6} onClick={() => submitApproval(true, request.id)}/> Match
                  <IconButton icon={<FcCancel />} variant="ghost" colorScheme="red" ml={6} onClick={() => submitApproval(false, request.id)}/>Reject
                </Flex>
              </Box>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Notification;
