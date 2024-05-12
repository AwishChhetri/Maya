import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import {ChakraProvider} from '@chakra-ui/react'
import {GoogleOAuthProvider}  from '@react-oauth/google'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="256259579819-u79c4gl86ep0l5dpnkcd4kotd00r6rdg.apps.googleusercontent.com">
  <ChakraProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </ChakraProvider>
    </GoogleOAuthProvider>
    <ToastContainer autoClose={500}/>
  </React.StrictMode>
);



