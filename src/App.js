import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import EditorPage from './components/EditorPage';
import UserDocuments from './components/UserDocuments';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [documentContent, setDocumentContent] = useState('');

  const handleLogin = (userId) => {
    setIsLoggedIn(true);
    setUserId(userId);
  
    // Check the value of the token here
    const token = localStorage.getItem('jwt');
    console.log('Token from local storage:', token);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserId(null);
    setDocumentContent('');
    
    // Clear the token on logout
    localStorage.removeItem('jwt');
  };
  

  return (
    <Router>
      <div className='min-h-screen bg-[#D2AEF6]'>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/editor" replace /> 
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/editor"
            element={
              isLoggedIn ? (
                <>
                <div className='flex justify-end p-2 mx-2'>

                <button onClick={handleLogout} className="  bg-[#b254ff] text-white py-2 px-6 rounded-lg hover:bg-[#7A3AAD]">
                  Logout
                </button>
                </div>
                 
                  <EditorPage
                    userId={userId}
                    documentContent={documentContent}
                    setDocumentContent={setDocumentContent}
                  />
                  <UserDocuments
                    userId={userId}
                    setDocumentContent={setDocumentContent}
                  />
                </>
              ) : (
                <Navigate to="/" replace /> 
              )
            }
          />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
