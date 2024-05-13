import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useState } from 'react'; // Import useState hook
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { Box, Spinner } from '@chakra-ui/react'; // Import Spinner component from Chakra UI
import { toast } from "react-toastify";
function Login() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false); // State variable for loading

    const handleGoogleLogin = async (response) => {
        setIsLoading(true); // Set loading to true when starting axios call
        try {
            const token = response.credential;

            // Get user info from Google
            const userInfoResponse = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            // Check if email is verified
            emailVerification(userInfoResponse.data);
        } catch (error) {
            console.error(error);
            navigate('/login'); // Redirect to /login on error
        } finally {
            setIsLoading(false); // Set loading to false after axios call completes
        }
    };
  
    
    
    
    const emailVerification = async (data) => {
        if (data.email_verified === true) {
            setIsLoading(true); // Set loading to true when starting axios call
            try {
                // Send email to your backend for further verification
                const backendResponse = await axios.post("/login", {
                    email: data.email
                });
    
                if (backendResponse.status === 200) {
                    console.log("Login successful");
                    const { token, student } = backendResponse.data; // Assuming the token and student data are returned from the backend response
                    localStorage.setItem('token', token); // Save token to localStorage
                    localStorage.setItem('_id', student._id); // Save student _id to localStorage
                    // Token expiration time (5 hours in milliseconds)
                    const expirationTime = Date.now() + 5 * 60 * 60 * 1000;
                    localStorage.setItem('tokenExpiration', expirationTime); // Save token expiration time
                    
                    navigate('/a/board');
                    toast.success("Login successful!");
                } else {
                    
                    toast.error("Use your VTU mail id!");
                    navigate('/login'); // Redirect to /login if backend response is not 200
                }
            } catch (error) {
                toast.error("Use your VTU mail id!");
                navigate('/login'); // Redirect to /login on error
            } finally {
                setIsLoading(false); // Set loading to false after axios call completes
            }
        } else {
            toast.error("Not a verified User!");
            
            navigate('/login'); // Redirect to /login if email is not verified
        }
    };

    return (
        <Box className="App" display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <header className="App-header">
                <h1 ontSize="md" mt="4" color='red'>Login Allowed Only With The VTU mail.</h1>

                {isLoading ? (
                    <Spinner />
                ) : (
                    <>
                        <button onClick={handleGoogleLogin}>
                            <i className="fa-brands fa-google"></i>
                            Continue with Google
                        </button>
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                console.log(credentialResponse.credential);
                                var decoded = jwtDecode(credentialResponse.credential);
                                emailVerification(decoded);
                            }}
                        />
                    </>
                )}
            </header>
        </Box>
    );
}

export default Login;
