import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './state/AuthContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

function Home() {
  const { user } = useAuth();
  return (
    <div style={{ padding: 24 }}>
      <h1>MERN Auth</h1>
      {user ? (
        <p>Welcome, {user.name}</p>
      ) : (
        <p>Please <Link to="/login">login</Link> or <Link to="/register">register</Link>.</p>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}


