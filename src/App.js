import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login.js'
import Board from './Pages/Board.js'
import Home from './Pages/Home.js'
import axios from 'axios';
import Chat from './Pages/Chat.js';
import Form from './Pages/Form.js'
//  axios.defaults.baseURL = 'http://cupidpuppy-env.eba-3rwswcn9.ap-south-1.elasticbeanstalk.com/'; 
//  axios.defaults.baseURL = 'http://localhost:8000';



axios.defaults.baseURL = 'https://puppy-mzmq.onrender.com';

function App() {
  return (
   
      <Routes>
         <Route path="/" element={<Home />} exact/>
        <Route path="/Login" element={<Login />} exact/>
        <Route path="/Board" element={<Board />} exact/>
        <Route path="/Chat" element={<Chat/>} exact/>
        <Route path="/form" element={<Form/>} exact/>
      </Routes>
     
    
  );
}

export default App;
