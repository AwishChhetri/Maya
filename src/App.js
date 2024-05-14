import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login.js'
import Board from './Pages/Board.js'
import Home from './Pages/Home.js'
import axios from 'axios';
import Chat from './Pages/Chat.js';
import Form from './Pages/Form.js';
import {PrivateRoute} from './Routes/PrivateRoute.js'
//  axios.defaults.baseURL = 'http://cupidpuppy-env.eba-3rwswcn9.ap-south-1.elasticbeanstalk.com'; 
//  axios.defaults.baseURL = 'http://localhost:8000';



axios.defaults.baseURL = 'https://puppy-mzmq.onrender.com';

function App() {
  return (
   
      <Routes>
         <Route path="/" element={<Home />} exact/>
         <Route path="/login" element={<Login />} exact/>
         <Route path="/a" element={<PrivateRoute />} >
           <Route path="form" element={<Form/>} exact/>
           <Route path="Board" element={<Board />} exact/>

           
        </Route>
      </Routes>
     
    
  );
}

export default App;
