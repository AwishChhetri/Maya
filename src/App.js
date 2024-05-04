import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login.js'
import Board from './Pages/Board.js'
import axios from 'axios';

axios.defaults.baseURL = 'https://maya-anjz.onrender.com'; 
function App() {
  return (
   
      <Routes>
        <Route path="/" element={<Login />} exact/>
        <Route path="/Board" element={<Board />} exact/>
      </Routes>
     
    
  );
}

export default App;
