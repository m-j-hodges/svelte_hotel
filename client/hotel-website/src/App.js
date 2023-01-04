import logo from './logo.svg';
import './App.css';
import Header from './components/header'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/splash'
import Login from './components/Login'
import Register from './components/Register'
import Main from './components/main'
import AuthService from './utils/auth'
import Amenities from './components/Amenities'
import Premier from './components/Premier'




function App() {
let imgSrc1="img/lobby.jpeg"
let imgSrc2="img/hotel_room.jpeg"
let imgSrc3="img/hotel_breakfast.jpeg"

  return (

    <Router>
      <Routes>
      <Route
      path="/"
      element={<MainPage imgSrc1={imgSrc1} imgSrc2={imgSrc2} imgSrc3={imgSrc3}/>}
      /> 
      <Route
      path="/login"
      element={<Login />} />
      <Route
      path="/rooms"
      element={AuthService.loggedIn()? <Main /> : <Login props="please login to view rooms." />}
      />
      <Route
      path="/register"
      element={<Register />} />
      <Route
      path="/amenities"
      element={<Amenities />} />
      <Route
      path="/premier"
      element={<Premier />} />

      </Routes>
    </Router> 
  );
}

export default App;
