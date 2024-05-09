import React, { useState } from 'react';
import { Radio, RadioGroup, VStack, Button, Text } from '@chakra-ui/react';

const Form = () => {
  // State to store the selected options for each question
  const [selectedOptions, setSelectedOptions] = useState({
    sex: '',
    lookingFor: '',
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: '',
    question6: '',
    question7: '',
    question8: '',
    question9: '',
    question10: ''
  });

  // Function to handle radio button change for each question
  const handleRadioChange = (question, value) => {
    setSelectedOptions({
      ...selectedOptions,
      [question]: value
    });
  };

  // Function to handle form submission
  const handleSubmit = () => {
    console.log('Selected options:', selectedOptions);
  };

  return (
    <VStack spacing={4}>
      <Text color="black" fontWeight="bold">Your sex</Text>
      <RadioGroup isRequired onChange={(value) => handleRadioChange('sex', value)} value={selectedOptions['sex']}>
        <Radio value="Male">Male</Radio>
        <Radio value="Female">Female</Radio>
        <Radio value="Others">Others</Radio>
      </RadioGroup>
      <Text color="black" fontWeight="bold">You are looking for</Text>
      <RadioGroup isRequired onChange={(value) => handleRadioChange('lookingFor', value)} value={selectedOptions['lookingFor']}>
        <Radio value="Male">Male</Radio>
        <Radio value="Female">Female</Radio>
        <Radio value="Others">Others</Radio>
      </RadioGroup>

      <Text color="black" fontWeight="bold">What are your long-term goals beyond university, and how do you see a partner fitting into those plans?</Text>
      <RadioGroup isRequired onChange={(value) => handleRadioChange('question1', value)} value={selectedOptions['question1']}>
        <Radio value="Career aspirations">Career aspirations</Radio>
        <Radio value="Personal growth objectives">Personal growth objectives</Radio>
        <Radio value="Relationship and family goals">Relationship and family goals</Radio>
      </RadioGroup>

<Text color="black" fontWeight="bold">What role does trust play in your relationships, and how do you establish and maintain it?</Text>
      <RadioGroup onChange={(value) => handleRadioChange('question3', value)} value={selectedOptions['question3']}>
        <Radio value="Building trust over time through honesty and reliability">Building trust over time through honesty and reliability</Radio>
        <Radio value="Being transparent about feelings and intentions">Being transparent about feelings and intentions</Radio>
        <Radio value="Setting boundaries and respecting each other's privacy">Setting boundaries and respecting each other's privacy</Radio>
      </RadioGroup>
<Text color="black" fontWeight="bold">How do you prioritize self-care and personal well-being while being in a relationship?</Text>
      <RadioGroup onChange={(value) => handleRadioChange('question4', value)} value={selectedOptions['question4']}>
        <Radio value="Balancing time between personal and relationship commitments">Balancing time between personal and relationship commitments</Radio>
        <Radio value="Supporting each other's individual growth and goals">Supporting each other's individual growth and goals</Radio>
        <Radio value="Communicating needs for alone time or self-care activities">Communicating needs for alone time or self-care activities</Radio>
      </RadioGroup>
<Text color="black" fontWeight="bold">What does commitment mean to you, and how do you demonstrate it in a relationship?</Text>
      <RadioGroup onChange={(value) => handleRadioChange('question5', value)} value={selectedOptions['question5']}>
        <Radio value="Investing time and effort into building a strong foundation">Investing time and effort into building a strong foundation</Radio>
        <Radio value="Being emotionally available and supportive">Being emotionally available and supportive</Radio>
        <Radio value="Making sacrifices for the well-being of the relationship">Making sacrifices for the well-being of the relationship</Radio>
      </RadioGroup>
<Text color="black" fontWeight="bold">How do you navigate differences in values or beliefs with a partner?</Text>
      <RadioGroup onChange={(value) => handleRadioChange('question6', value)} value={selectedOptions['question6']}>
        <Radio value="Respecting each other's perspectives while finding common ground">Respecting each other's perspectives while finding common ground</Radio>
        <Radio value="Having open and honest discussions about values and beliefs">Having open and honest discussions about values and beliefs</Radio>
        <Radio value="Agreeing to disagree on certain topics while focusing on shared values">Agreeing to disagree on certain topics while focusing on shared values</Radio>
      </RadioGroup>
<Text color="black" fontWeight="bold">What are your views on intimacy in a relationship, both physical and emotional?</Text>
      <RadioGroup onChange={(value) => handleRadioChange('question7', value)} value={selectedOptions['question7']}>
        <Radio value="Valuing both physical and emotional connection">Valuing both physical and emotional connection</Radio>
        <Radio value="Building intimacy through trust, communication, and vulnerability">Building intimacy through trust, communication, and vulnerability</Radio>
        <Radio value="Respecting boundaries and pacing intimacy based on comfort levels">Respecting boundaries and pacing intimacy based on comfort levels</Radio>
      </RadioGroup>
<Text color="black" fontWeight="bold">How do you manage expectations in a relationship, both your own and your partner's?</Text>
      <RadioGroup onChange={(value) => handleRadioChange('question8', value)} value={selectedOptions['question8']}>
        <Radio value="Setting realistic expectations and communicating them clearly">Setting realistic expectations and communicating them clearly</Radio>
        <Radio value="Being flexible and adaptable to changing circumstances">Being flexible and adaptable to changing circumstances</Radio>
        <Radio value="Discussing expectations openly and revisiting them as needed">Discussing expectations openly and revisiting them as needed</Radio>
      </RadioGroup>
<Text color="black" fontWeight="bold">What role do friendships and social circles play in your life, and how do you integrate them into your relationship?</Text>
      <RadioGroup onChange={(value) => handleRadioChange('question9', value)} value={selectedOptions['question9']}>
        <Radio value="Balancing time between friends and partner">Balancing time between friends and partner</Radio>
        <Radio value="Introducing partner to friends and participating in social activities together">Introducing partner to friends and participating in social activities together</Radio>
        <Radio value="Maintaining independence while still prioritizing quality time with partner">Maintaining independence while still prioritizing quality time with partner</Radio>
      </RadioGroup>
<Text color="black" fontWeight="bold">How do you envision handling long-distance or post-graduation transitions in a relationship?</Text>
      <RadioGroup onChange={(value) => handleRadioChange('question10', value)} value={selectedOptions['question10']}>
        <Radio value="Communicating openly about future plans and expectations">Communicating openly about future plans and expectations</Radio>
        <Radio value="Prioritizing regular communication and visits when apart">Prioritizing regular communication and visits when apart</Radio>
        <Radio value="Being supportive of each other's individual pursuits while maintaining connection">Being supportive of each other's individual pursuits while maintaining connection</Radio>
      </RadioGroup>

      <Button colorScheme="blue" onClick={handleSubmit}>Submit</Button>
    </VStack>
  );
}

export default Form;
