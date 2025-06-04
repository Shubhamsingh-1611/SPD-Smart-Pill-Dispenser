import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import reg from '../assets/reg.svg'; // Adjust the path as necessary

function PatientRegistrationForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [medicalHistory, setMedicalHistory] = useState('');

    const navigate = useNavigate(); // Hook to programmatically navigate

    const handleSubmit = async (e) => {

        e.preventDefault();

        const userData = {
            firstName,
            lastName,
            email,
            password,
            phone,
            address,
            dateOfBirth,
            medicalHistory,
        };
   console.log(userData); // Log the user data to the console for debugging
   
        try {
            // Send data to the backend using Axios
            const response = await axios.post(
                'http://localhost:3000/api/patients/register', // Replace with your actual backend API URL
                userData,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('Registration successful:', response.data);
           toast.success('Register Sucessfully!!');
            navigate('/login');
// Redirect to the login page after successful registration
            // Handle success (e.g., redirect, show success message)
        } catch (error) {
            console.error('Registration failed:', error);
            toast.error(error.response.data.message);
            // Handle error (e.g., display error message to the user)
        }
    };

    return (
        <div className="bg-blue-50 py-12 mt-[60px]">
            <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden md:max-w-4xl">
                <div className="md:grid md:grid-cols-2 md:gap-4">
                    <div className="px-5 py-7">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                            Patient Registration
                        </h2>
                        <form onSubmit={handleSubmit}>
                            {/* First Name */}
                            <div className="mb-4">
                                <label
                                    htmlFor="firstName"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    First Name*
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            {/* Last Name */}
                            <div className="mb-4">
                                <label
                                    htmlFor="lastName"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Last Name*
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            {/* Email */}
                            <div className="mb-4">
                                <label
                                    htmlFor="email"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Email*
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
                            {/* Password */}
                            <div className="mb-4">
                                <label
                                    htmlFor="password"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Password*
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
                            {/* Phone */}
                            <div className="mb-4">
                                <label
                                    htmlFor="phone"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            {/* Address */}
                            <div className="mb-4">
                                <label
                                    htmlFor="address"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Address
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            {/* Date of Birth */}
                            <div className="mb-4">
                                <label
                                    htmlFor="dateOfBirth"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    id="dateOfBirth"
                                    value={dateOfBirth}
                                    onChange={(e) => setDateOfBirth(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            {/* Medical History */}
                            <div className="mb-6">
                                <label
                                    htmlFor="medicalHistory"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Medical History
                                </label>
                                <textarea
                                    id="medicalHistory"
                                    value={medicalHistory}
                                    onChange={(e) => setMedicalHistory(e.target.value)}
                                    rows="4"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                ></textarea>
                            </div>
                            {/* Submit Button */}
                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                    {/* Right Side (Optional: Could be used for an image or additional info) */}
                    <div className="hidden md:flex items-center justify-center bg-white p-5">
                        {/* You can add an image here or any other content */}
                        {/* <img src="your-image.jpg" alt="Registration" className="max-w-full h-auto" /> */}
                        <p className="text-blue-500 italic">
                           <img src={reg} alt="Registration Illustration" className='h-full' />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientRegistrationForm;