import React, { useState, useEffect } from 'react';
import { Radio, RadioGroup, VStack, Button, Text, useRadioGroup, useRadio, Box, HStack, CircularProgress } from '@chakra-ui/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

function RadioCard({ children, isChecked, color, ...props }) {
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <VStack as="label" alignItems="start">
      <input {...input} />
      <HStack {...checkbox} spacing={2} cursor="pointer">
        <Box
          borderWidth="1px"
          borderRadius="md"
          boxShadow="md"
          px={5}
          py={3}
          bgColor={isChecked ? color : 'white'}
          color={isChecked ? 'white' : 'black'}
          _checked={{
            bg: color,
            color: 'white',
            borderColor: color,
          }}
          _focus={{
            boxShadow: 'outline',
          }}
        >
          {children}
        </Box>
      </HStack>
    </VStack>
  );
}

const Question = ({ question, options, selectedValue, onChange }) => {
  const [boxColor, setBoxColor] = useState('teal.600');
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: question,
    value: selectedValue,
    onChange,
  });

  const group = getRootProps();

  return (
    <VStack spacing={2} {...group}>
      <Text color="black" fontSize={18} fontWeight="bold">{question}</Text>
      {options.map((option, index) => {
        const radio = getRadioProps({ value: `${index + 1}` });
        return (
          <RadioCard key={index} {...radio} color={boxColor}>
            {option}
          </RadioCard>
        );
      })}
    </VStack>
  );
};

const Form = () => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [sex, setSex] = useState('');
  const [name, setName] = useState('');
  const [lookingFor, setLookingFor] = useState('');
  const [pickerStatus, setPickerStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem('_id');
  const navigate = useNavigate();

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
        setPickerStatus(response.data.PickerStatus);
        setName(response.data.name)
      })
      .catch(error => {
        console.log('Check your Network!');
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
      setLoading(true); // Set loading state to true
      // Check if all questions are answered
      const isAllQuestionsAnswered = questions.every(question => selectedOptions[question.key]);
      if (!isAllQuestionsAnswered || !sex || !lookingFor) {
        toast.warning('Please fill all the fields.');
        setLoading(false); // Reset loading state
        return; // Exit early if any field is empty
      }

      // Check if Picker status is false
      if (pickerStatus === true) {
        toast.info("Form already submitted !");
        setLoading(false); // Reset loading state
        return;
      }
      const selectedValuesArray = Object.values(selectedOptions);

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
        lookingFor,
        pickerStatus
      });

      if (response.status === 200) {
        navigate('/board')
        toast.success("Your preferences have been received!")
      } else {
        toast.error("Failed to submit!")
      }

      setLoading(false); // Reset loading state
    } catch (error) {
      console.error('Error sending data:', error);
      toast.error("Failed to submit!")
      setLoading(false); // Reset loading state
    }
  };

  return (
    <VStack spacing={4} align="center" p={6}>
      <Text color="black" fontWeight="bold" fontSize={20}>{name}</Text>

      {/* Display an inline message if Picker status is false */}
      {pickerStatus === true && (
        <div>
        <Text color="red" align="center">Form already submitted.</Text>
        <Text color="gray.400">Cupid is constantly trying to find your match!</Text></div>
      )}

      {/* Render the form only if the test is not taken */}
      {pickerStatus !== true && (
        <div>
          <VStack spacing={8}>
            <HStack spacing={4}>
              <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                mb={4}
                p={4}
                position="relative"
                boxShadow="lg"
              >
                <Question
                  question="Your gender:"
                  options={["Male", "Female"]}
                  selectedValue={sex}
                  onChange={setSex}
                />
              </Box>
              <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                mb={4}
                p={4}
                position="relative"
                boxShadow="lg"
              >
                <Question
                  question="You are looking for"
                  options={["Male", "Female"]}
                  selectedValue={lookingFor}
                  onChange={setLookingFor}
                />
              </Box>
            </HStack>

            <VStack spacing={4}>
              {questions.map(({ question, options, key }) => (
                <Box
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  mb={4}
                  p={4}
                  position="relative"
                  boxShadow="lg"
                >
                  <Question
                    key={key}
                    question={question}
                    options={options}
                    selectedValue={selectedOptions[key]}
                    onChange={(value) => handleRadioChange(key, value)}
                  />
                </Box>
              ))}
            </VStack>
          </VStack>

          <Button color="teal.600" size="lg" align="right" spacing={4} onClick={handleSubmit}>
            {loading ? <CircularProgress isIndeterminate color="teal.600" size="24px" /> : "Submit"}
          </Button>
        </div>
      )}
    </VStack>
  );
};

export default Form;
