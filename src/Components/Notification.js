import React, { useState, useEffect } from 'react';
import { Box, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalBody, Flex, IconButton, Spinner } from '@chakra-ui/react';
import { GiHeartWings } from "react-icons/gi";
import { FaUser } from 'react-icons/fa';
import { FcApproval, FcCancel } from 'react-icons/fc';
import axios from 'axios';

const Notification = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [matchRequestDetails, setMatchRequestDetails] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state for match and reject icons
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
      setLoading(true); // Set loading to true when submitting approval
      await axios.post('/approve', {
        id: vtu,
        approvalStatus: approvalStatus,
        userId: userId 
      });
      console.log('Approval submitted successfully');
    } catch (error) {
      console.error('Error submitting approval:', error);
    } finally {
      setLoading(false); // Set loading back to false after submission
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
        <GiHeartWings  style={{ marginRight: '7px', fontSize: '24px' }} />
        {matchRequestDetails && matchRequestDetails.length > 0 ? (
          <Text fontSize="sm" ml={2} color="blue.500">You have liked {matchRequestDetails.length} people.</Text>
        ) : (
          <Text fontSize="sm" ml={2} color="blue.500">Your Likes</Text>
        )}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="600px"> {/* Set max width here */}
          <ModalBody>
            <Text fontWeight="bold">Your Likes</Text>
            
            <Text>
            <span style={{ color: "hsl(330, 70%, 65%)" }}>Cupid</span>{" "}will match you if there happens to be a mutual liking.{" "}
  <span style={{ color: "hsl(210, 70%, 65%)" }}>Good news!</span>{" "}
  <span style={{ color: "hsl(330, 70%, 65%)" }}>Cupid</span>{" "}won't let anyone know that you have liked their profile.
</Text>
            {matchRequestDetails.map((request, index) => (
              <Box key={index} borderWidth="1px" borderRadius="md" p={3} mb={2}>
                <Flex align="center">
                  <FaUser style={{ marginRight: '4px' }} />
                  <Text fontWeight="bold">{request.name}</Text>({request.VTU})
                  <IconButton
                    icon={<FcApproval />}
                    variant="ghost"
                    colorScheme="green"
                    ml={6}
                    onClick={() => submitApproval(true, request.id)}
                    isLoading={loading && loading === request.id} // Show loader if loading is true and matches the request ID
                  />
                  <IconButton
                    icon={<FcCancel />}
                    variant="ghost"
                    colorScheme="red"
                    ml={6}
                    onClick={() => submitApproval(false, request.id)}
                    isLoading={loading && loading === request.id} // Show loader if loading is true and matches the request ID
                  />
                  {loading && loading === request.id && <Spinner size="sm" color="blue.500" ml={2} />} {/* Show spinner if loading is true and matches the request ID */}
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
