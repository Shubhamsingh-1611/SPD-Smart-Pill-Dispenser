import React, { useState } from 'react';

import axios from 'axios';
import { Link ,useNavigate} from 'react-router-dom'; // If you're using React Router
import { toast } from 'react-toastify';
import login from  '../assets/login.png' // Adjust the path as necessary




function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  let navigate = useNavigate(); // Initialize useNavigate hook

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    try {
      const response = await axios.post(
        'http://localhost:3000/api/patients/login', // Replace with your backend URL
        { email, password },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Login successful:', response.data);

      // Store the token (e.g., in localStorage)
      localStorage.setItem('token', response.data.token);
      toast.success("Logged in Sucessfully!")
    navigate('/patientD'); // Redirect to the user dashboard or another protected route
   
    } catch (error) {
      console.error('Login failed:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        setError('Invalid email or password'); // A generic error message
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="bg-blue-50 py-12 mt-[60px]">
      <div className="max-w-md mx-auto bg-white shadow-xl rounded-lg overflow-hidden md:max-w-2xl">
        <div className="md:grid md:grid-cols-2">
          <div className="w-full py-10 px-5 md:px-10">
            <div className="text-center mb-5">
              <h1 className="font-bold text-2xl text-gray-800">
                Patient Login
              </h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              {error && <p className="text-red-500 text-sm italic mb-4">{error}</p>}
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Log In
                </button>
                {/* Optional: Link to registration page */}
                {/* {Link && ( //  Only render if Link is available}
                  <Link
                    to="/register"
                    className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  >
                    Register
                  </Link>
                )} */}
              </div>
            </form>
          </div>
          {/* Right Side (Optional: Could be used for an image or additional info) */}
          <div className="hidden md:flex items-center justify-center bg-white p-5">
            {/* You can add an image here or any other content */}
            {/* <img src="your-image.jpg" alt="Login" className="max-w-full h-auto" /> */}
            <p className="text-blue-500 italic">
              <img src={login}  />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
