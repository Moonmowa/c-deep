import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScrollTo = (section) => {
    setMenuOpen(false); // close menu on navigation
    navigate('/', { state: { scrollTo: section } });
  };

  const handleInsightsClick = () => {
    setMenuOpen(false); // close menu on navigation
    if (!window.location.href.includes('articles')) {
      navigate('articles');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/cdeep_logo_t.png" alt="Logo" />
      </div>

      <div
        className="hamburger"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') setMenuOpen((open) => !open);
        }}
      >
        &#9776;
      </div>

      <ul className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
        <li>
          <button onClick={() => handleScrollTo('home')}>HOME</button>
        </li>
        <li>
          <button onClick={() => handleScrollTo('about')}>ABOUT</button>
        </li>
        <li>
          <button onClick={() => handleScrollTo('experience')}>EXPERIENCE</button>
        </li>
        <li>
          <button onClick={handleInsightsClick}>INSIGHTS</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
