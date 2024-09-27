// import React from 'react'
// import Navbar from './components/Navbar/Navbar'
// import Sidebar from './components/Sidebar/Sidebar'
// import { Route, Routes } from 'react-router-dom'
// import Add from './pages/Add/Add'
// import List from './pages/List/List'
// import Orders from './pages/Orders/Orders'
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const App = () => {
//   return (
//     <div className='app'>
//       <ToastContainer />
//       <Navbar />
//       <hr />
//       <div className="app-content">
//         <Sidebar />
//         <Routes>
//           <Route path="/add" element={<Add />} />
//           <Route path="/list" element={<List />} />
//           <Route path="/orders" element={<Orders />} />
//         </Routes>
//       </div>
//     </div>
//   )
// }

// export default App


// import React from 'react';
// import { Route, Routes, Navigate } from 'react-router-dom';
// import Navbar from './components/Navbar/Navbar';
// import Sidebar from './components/Sidebar/Sidebar';
// import Add from './pages/Add/Add';
// import List from './pages/List/List';
// import Orders from './pages/Orders/Orders';
// import AdminLogin from './pages/AdminLogin';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const App = () => {
//   const isAuthenticated = () => !!localStorage.getItem('adminToken');

//   return (
//     <div className='app'>
//       <ToastContainer />
//       <Routes>
//         <Route path="/admin/login" element={<AdminLogin />} />
//         <Route
//           path="/admin/*"
//           element={
//             isAuthenticated() ? (
//               <>
//                 <Navbar />
//                 <hr />
//                 <div className="app-content">
//                   <Sidebar />
//                   <Routes>
//                     <Route path="add" element={<Add />} />
//                     <Route path="list" element={<List />} />
//                     <Route path="orders" element={<Orders />} />
//                   </Routes>
//                 </div>
//               </>
//             ) : (
//               <Navigate to="/admin/login" replace />
//             )
//           }
//         />
//         <Route path="*" element={<Navigate to="/admin/login" replace />} />
//       </Routes>
//     </div>
//   );
// };

// export default App;


// import React, { useState, useEffect, createContext } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
// import Navbar from './components/Navbar/Navbar';
// import Sidebar from './components/Sidebar/Sidebar';
// import Add from './pages/Add/Add';
// import List from './pages/List/List';
// import Orders from './pages/Orders/Orders';
// import AdminLogin from './pages/AdminLogin';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// export const AuthContext = createContext(null);

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('adminToken');
//     if (token) {
//       // Here you might want to verify the token with your backend
//       setIsAuthenticated(true);
//     }
//   }, []);

//   const login = (token) => {
//     localStorage.setItem('adminToken', token);
//     setIsAuthenticated(true);
//     navigate('/admin/list');
//   };

//   const logout = () => {
//     localStorage.removeItem('adminToken');
//     setIsAuthenticated(false);
//     navigate('/admin/login');
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       <div className='app'>
//         <ToastContainer />
//         {isAuthenticated && <Navbar />}
//         <div className="app-content">
//           {isAuthenticated && <Sidebar />}
//           <Routes>
//             <Route path="/admin/login" element={isAuthenticated ? <Navigate to="/admin/list" replace /> : <AdminLogin />} />
//             <Route path="/admin/*" element={isAuthenticated ?
//               <Routes>
//                 <Route path="/admin/add" element={<Add />} />
//                 <Route path="/admin/list" element={<List />} />
//                 <Route path="/admin/orders" element={<Orders />} />
//                 <Route path="*" element={<Navigate to="/admin/list" replace />} />
//               </Routes>
//               : <Navigate to="/admin/login" replace />
//             } />
//             <Route path="*" element={<Navigate to="/admin/login" replace />} />
//           </Routes>
//         </div>
//       </div>
//     </AuthContext.Provider>
//   );
// };

// export default App;



import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/protectedRoute";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='app'>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/add" element={<ProtectedRoute><Add /></ProtectedRoute>} />
          <Route path="/list" element={<ProtectedRoute><List /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  )
}

export default App;
