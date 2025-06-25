import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
function Navbar() {
  const navigate = useNavigate();

  const handleScrollTo = (section) => {
    navigate('/', { state: { scrollTo: section } });
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src='/cdeep_logo.jpg' />
      </div>

      <ul className="navbar-menu">
        <li><button onClick={() => handleScrollTo('home')}>Home</button></li>
        <li><button onClick={() => handleScrollTo('about')}>About</button></li>
        <li><button onClick={() => handleScrollTo('experience')}>Experience</button></li>
        {/* <li><button onClick={() => handleScrollTo('contact')}>Contact</button></li> */}
      </ul>
    </nav>
  );
}

export default Navbar;
