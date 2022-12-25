import React, {Component} from 'react'

export default class Header extends Component {
  state = {
    title: 'Welcome to the Svelte Hotel!'
  };

render() {
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
            <li><a className="menu-item dropdown-item" href="/rooms">Rooms</a></li>
            <li><a className="menu-item dropdown-item" href="#">Facilities</a></li>
            <li><a className="menu-item dropdown-item" href="#">Location</a></li>
          </ul>
        </li>
    <li className="navbar-item m-2 p-2"><a className="my-text" href="/book">Make a Reservation</a></li>
    </ul>
    </div>
    </nav>
    </header> 

</div> 
);
}
}