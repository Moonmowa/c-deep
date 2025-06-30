import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar({ activeSection }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScrollTo = (section) => {
    setMenuOpen(false);
    navigate('/', { state: { scrollTo: section } });
  };

  const handleInsightsClick = () => {
    setMenuOpen(false);
    if (!location.pathname.includes('/articles')) {
      navigate('/articles');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/cdeep.png" onClick={() => handleScrollTo('home')} alt="Logo" />
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
          <button className={activeSection === 'home' ? 'active' : ''} onClick={() => handleScrollTo('home')}>
            HOME
          </button>
        </li>
        <li>
          <button className={activeSection === 'about' ? 'active' : ''} onClick={() => handleScrollTo('about')}>
            ABOUT
          </button>
        </li>
        <li>
          <button className={activeSection === 'experience' ? 'active' : ''} onClick={() => handleScrollTo('experience')}>
            EXPERIENCE
          </button>
        </li>
        <li>
          <button className={activeSection === 'insights' ? 'active' : ''} onClick={handleInsightsClick}>
            INSIGHTS
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
