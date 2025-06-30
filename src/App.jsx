import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Articles from './components/Articles/Articles';
import Navbar from './components/common/NavBar/Navbar';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <Router>
      <Navbar activeSection={activeSection} />
      <Routes>
        <Route path="/" element={<Home setActiveSection={setActiveSection} />} />
        <Route path="/articles" element={<Articles setActiveSection={setActiveSection} />} />
      </Routes>
    </Router>
  );
}

export default App;
