import logo from './logo.svg';
import './App.css';
import Header from './components/header'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/splash'
import Login from './components/Login'
import Register from './components/Register'
import Main from './components/main'


function App() {
  return (
    <Router>
      <Routes>
      <Route
      path="/"
      element={<MainPage />}
      /> 
      <Route
      path="/login"
      element={<Login />} />
      <Route
      path="/rooms"
      element={<Main />}
      />
      <Route
      path="/register"
      element={<Register />} />

      </Routes>
    </Router> 
  );
}

export default App;
