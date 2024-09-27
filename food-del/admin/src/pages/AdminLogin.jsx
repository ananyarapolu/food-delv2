// import React, { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { url } from '../assets/assets'; 
// import { AuthContext } from '../App';

// const AdminLogin = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();
//     const { login } = useContext(AuthContext);
  
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       try {
//         const response = await fetch(`${url}/api/admin/login`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ email, password }),
//         });
        
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
        
//         const data = await response.json();
//         if (data.success) {
//           login(data.token);  // Use the login function from context
//           toast.success('Login successful');
//           navigate('/admin/list');
//         } else {
//           toast.error(data.message || 'Login failed');
//         }
//       } catch (error) {
//         console.error('Login error:', error);
//         toast.error(`An error occurred: ${error.message}`);
//       }
//     };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
//         <h3 className="text-2xl font-bold text-center">Admin Login</h3>
//         <form onSubmit={handleSubmit}>
//           <div className="mt-4">
//             <div>
//               <label className="block" htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 placeholder="Email"
//                 className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mt-4">
//               <label className="block">Password</label>
//               <input
//                 type="password"
//                 placeholder="Password"
//                 className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="flex items-baseline justify-between">
//               <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Login</button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { url } from "../assets/assets";
import "./AdminLogin.css"; // Import the custom CSS file

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${url}/api/admin/login`, { email, password });
      if (data.success) {
        localStorage.setItem("adminToken", data.token); // Store token in localStorage
        toast.success("Login successful!");
        navigate("/add"); // Redirect to add page or dashboard
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Login failed!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Admin Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
