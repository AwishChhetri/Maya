import React, { useState, useEffect } from 'react';
import { Radio, RadioGroup, VStack, Button, Text } from '@chakra-ui/react';
import axios from 'axios';

const Question = ({ question, options, selectedValue, onChange }) => {
  return (
    <VStack spacing={2}>
      <Text color="black" fontWeight="bold">{question}</Text>
      <RadioGroup onChange={onChange} value={selectedValue}>
        {options.map((option, index) => (
          <Radio key={index} value={`${index + 1}`}>{option}</Radio>
        ))}
      </RadioGroup>
    </VStack>
  );
};

const Form = () => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [sex, setSex] = useState('');
  const [lookingFor, setLookingFor] = useState('');
  const [pickerStatus, setPickerStatus] = useState(null);
  const userId = localStorage.getItem('_id');

  const questions = [
    {
      question: "What are your long-term goals beyond university, and how do you see a partner fitting into those plans?",
      options: ["Career aspirations", "Personal growth objectives", "Relationship and family goals"],
      key: 'question1'
    },
    {
      question: "What role does trust play in your relationships, and how do you establish and maintain it?",
      options: ["Building trust over time through honesty and reliability", "Being transparent about feelings and intentions", "Setting boundaries and respecting each other's privacy"],
      key: 'question3'
    },
    {
      question: "How do you prioritize self-care and personal well-being while being in a relationship?",
      options: ["Balancing time between personal and relationship commitments", "Supporting each other's individual growth and goals", "Communicating needs for alone time or self-care activities"],
      key: 'question4'
    },
    {
      question: "What does commitment mean to you, and how do you demonstrate it in a relationship?",
      options: ["Investing time and effort into building a strong foundation", "Being emotionally available and supportive", "Making sacrifices for the well-being of the relationship"],
      key: 'question5'
    },
    {
      question: "How do you navigate differences in values or beliefs with a partner?",
      options: ["Respecting each other's perspectives while finding common ground", "Having open and honest discussions about values and beliefs", "Agreeing to disagree on certain topics while focusing on shared values"],
      key: 'question6'
    },
    {
      question: "What are your views on intimacy in a relationship, both physical and emotional?",
      options: ["Valuing both physical and emotional connection", "Building intimacy through trust, communication, and vulnerability", "Respecting boundaries and pacing intimacy based on comfort levels"],
      key: 'question7'
    },
    {
      question: "How do you manage expectations in a relationship, both your own and your partner's?",
      options: ["Setting realistic expectations and communicating them clearly", "Being flexible and adaptable to changing circumstances", "Discussing expectations openly and revisiting them as needed"],
      key: 'question8'
    },
    {
      question: "What role do friendships and social circles play in your life, and how do you integrate them into your relationship?",
      options: ["Balancing time between friends and partner", "Introducing partner to friends and participating in social activities together", "Maintaining independence while still prioritizing quality time with partner"],
      key: 'question9'
    },
    {
      question: "How do you envision handling long-distance or post-graduation transitions in a relationship?",
      options: ["Communicating openly about future plans and expectations", "Prioritizing regular communication and visits when apart", "Being supportive of each other's individual pursuits while maintaining connection"],
      key: 'question10'
    }
  ];
  useEffect(() => {
    // Fetch student details and Picker status
    axios.post('/studentDetails', { userId })
      .then(response => {
        console.log('Student details:', response.data);
        setPickerStatus(response.data.PickerStatus);
      })
      .catch(error => {
        console.error('Error fetching student details:', error);
      });
  }, [userId]);

  const handleRadioChange = (question, value) => {
    setSelectedOptions({
      ...selectedOptions,
      [question]: value
    });
  };

  const handleSubmit = async () => {
    try {
      // Check if all questions are answered
      const isAllQuestionsAnswered = questions.every(question => selectedOptions[question.key]);
      if (!isAllQuestionsAnswered || !sex || !lookingFor) {
        console.log('Please fill out all fields.');
        return; // Exit early if any field is empty
      }
  
      // Check if Picker status is false
      if (pickerStatus === false) {
        console.log('Test already taken');
        return;
      }
      const selectedValuesArray = Object.values(selectedOptions);
      // If all fields are filled and Picker status is true, proceed with submission
      console.log('Selected options:', selectedValuesArray);
  
      // Extract only the values from selectedOptions
      const selectedValues = {};
      for (const key in selectedOptions) {
        if (selectedOptions.hasOwnProperty(key)) {
          selectedValues[key] = selectedOptions[key].value;
        }
      }
  
      // Send data to the server
      const response = await axios.post('/cupidPicker', {
        selectedOptions: selectedValuesArray, // Send only the values to the backend
        userId,
        sex,
        lookingFor
      });
  
      console.log('Server response:', response.data);
      // Optionally, you can perform additional actions based on the server response
    } catch (error) {
      console.error('Error sending data:', error);
      // Handle error appropriately
    }
  };
  

  return (
    <VStack spacing={4}>
      {/* Display an inline message if Picker status is false */}
      {pickerStatus === true && (
        <Text color="red">Test already taken</Text>
      )}

      {/* Render the form only if the test is not taken */}
      {pickerStatus !== true && (
        <div>
          <Text color="black" fontWeight="bold">Your sex</Text>
          <RadioGroup isRequired onChange={(value) => setSex(value)} value={sex}>
            <Radio value="Male">Male</Radio>
            <Radio value="Female">Female</Radio>
            <Radio value="Others">Others</Radio>
          </RadioGroup>
          <Text color="black" fontWeight="bold">You are looking for</Text>
          <RadioGroup isRequired onChange={(value) => setLookingFor(value)} value={lookingFor}>
            <Radio value="Male">Male</Radio>
            <Radio value="Female">Female</Radio>
            <Radio value="Others">Others</Radio>
          </RadioGroup>

          {questions.map(({ question, options, key }) => (
            <Question
              key={key}
              question={question}
              options={options}
              selectedValue={selectedOptions[key]}
              onChange={(value) => handleRadioChange(key, value)}
            />
          ))}

          <Button colorScheme="blue" onClick={handleSubmit}>Submit</Button>
        </div>
      )}
    </VStack>
  );
};

export default Form;

