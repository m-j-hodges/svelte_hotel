import React, {Component, useState} from 'react'
import { useEffect } from 'react';
import AuthService from '../utils/auth'
import Premier from './Premier'

export default function Header() {

  const [newUser, setnewUser] = useState('')
  const [loggedInStatus, setLoggedInStatus] = useState(AuthService.loggedIn())
useEffect(() => {
  if(localStorage.getItem('id_token')) {
  const userProfile = AuthService.getProfile()
  if(userProfile) {
  setnewUser(userProfile.data.username)  
  }
}
  console.log(AuthService.loggedIn())
}, [])

return (
<div>
  <header>
    <nav className="navbar bg-dark navbar-expand-lg">
    <div className="container-fluid"> 
    <div className="myHeader m-2 d-block"><img alt="Svelte Hotel Logo" src="/img/logo.png"></img></div>
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    <li className='navbar-item m-2 p-2'><a className="my-text" href="/">Home</a></li>
    <li className='navbar-item m-2 p-2'><a className="my-text" href="/login">Login</a></li>
    <li className="navbar-item dropdown m-2 p-2">
          <a className="my-text dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Amenities
          </a>
          <ul className="dropdown-menu">
            <li><a className="menu-item dropdown-item custom-menu" href="/rooms">Rooms</a></li>
            <li><a className="menu-item dropdown-item custom-menu" href="/amenities">Amenities</a></li>
            <li><a className="menu-item dropdown-item custom-menu" href="#">Location</a></li>
          </ul>
        </li>
    <li className="navbar-item m-2 p-2"><a className="my-text" href="/book">Make a Reservation</a></li>
    {newUser ? <li className='navbar-item m-2 p-2 text-white custom-menu'>Welcome {newUser}</li> : ''}
    {loggedInStatus ? <li onClick={()=> AuthService.logout()} className='navbar-item m-2 p-2 text-white custom-menu'>Logout</li> : ''}
    </ul>
    <a href="/premier">
    {loggedInStatus ? <img className="custom-img mx-3" src="img/shopping_cart.png"></img> : ''}
    </a>
    </div>
    </nav>
    </header> 

</div> 
);

}