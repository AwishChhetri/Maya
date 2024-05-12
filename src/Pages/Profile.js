import React, { useState, useEffect } from 'react';
import { Box, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalBody, Flex, IconButton } from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';
import { IoIosChatbubbles } from "react-icons/io";
import Chat from '../Pages/Chat.js';
import axios from 'axios';

const Profile = () => {
  const { isOpen: isProfileOpen, onOpen: openProfile, onClose: closeProfile } = useDisclosure();
  const { isOpen: isChatOpen, onOpen: openChat, onClose: closeChat } = useDisclosure();
  const [studentDetails, setStudentDetails] = useState(null);
  const [matchDetails, setMatchDetails] = useState([]);
  const [selectedChatUser, setSelectedChatUser] = useState(null);
  const [chatRoomId, setChatRoomId] = useState(null); // New state to store the chat room ID
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

    if (isProfileOpen) {
      fetchStudentDetails();
    }
  }, [isProfileOpen, userId]);

  const handleNotificationClick = () => {
    openProfile();
  };

  const handleChatIconClick = async (match) => {
    try {
      // Call the server to establish the chat room
      const response = await axios.post('/create-chat-room', {
        senderId: userId,
        receiverId: match.id
      });
      const roomId = response.data.roomId;
      setChatRoomId(roomId); 
      // Set the chat room ID
      console.log("-----",chatRoomId)
      setSelectedChatUser(match);
      closeProfile(); // Close the profile modal
      openChat(); // Open the chat modal
    } catch (error) {
      console.error('Error creating chat room:', error);
    }
    console.log("This is the great")
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
        <FaUser style={{ marginRight: '7px', fontSize: '24px' }} />
        {studentDetails ? (
          <Text fontSize="sm" ml={2} color="blue.500">{studentDetails.VTU}</Text>
        ) : (
          <Text fontSize="sm" ml={2} color="blue.500">Profile</Text>
        )}
      </Box>
      <Modal isOpen={isProfileOpen} onClose={closeProfile}>
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
            <Text pb={2}>
            <span style={{ color: "hsl(330, 70%, 65%)" }}>Cupid:</span>{" "}
  <span style={{ color: "hsl(210, 70%, 65%)" }}>Hey!</span>{" "}Once{" "}
  <span style={{ color: "hsl(330, 70%, 95%)" }}></span>{" "}I find a match for <span style={{ color: "hsl(330, 70%, 55%)" }}>YOU</span>, I will list it below and you can start your conversation.
</Text>
            {matchDetails && matchDetails.map((match, index) => (
              <Box key={index} borderWidth="1px" borderRadius="md" p={3} mb={2} onClick={() => handleChatIconClick(match)}>
                <Flex align="center">
                  <FaUser style={{ marginRight: '4px' }} />
                  <Text fontWeight="bold">{match.name} ({match.VTU})</Text> 
                  <IconButton 
                    icon={<IoIosChatbubbles style={{ fontSize: '34px' }} />} 
                    variant="ghost" 
                    colorScheme="blue" 
                    ml="auto" 
                  />
                </Flex>
              </Box>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isChatOpen} onClose={closeChat}>
        <ModalOverlay />
        <ModalContent maxW="800px"> {/* Increase the max width */}
          <ModalBody>
            {selectedChatUser && (
              <Box mt={6}>
                <Text fontWeight="bold" mb={2}>Chatting with {selectedChatUser.name}</Text>
                {/* Pass the chat room ID to the Chat component */}
                <Chat senderId={userId} receiverId={selectedChatUser.id} receiverName={selectedChatUser.name} roomId={chatRoomId} />
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Profile;
