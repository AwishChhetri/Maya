import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login.js'
import Board from './Pages/Board.js'
import Home from './Pages/Home.js'
import axios from 'axios';

axios.defaults.baseURL = 'https://puppy-mzmq.onrender.com'; 
// axios.defaults.baseURL = 'http://localhost:8000';
function App() {
  return (
   
      <Routes>
         <Route path="/" element={<Home />} exact/>
        <Route path="/Login" element={<Login />} exact/>
        <Route path="/Board" element={<Board />} exact/>
      </Routes>
     
    
  );
}

export default App;
