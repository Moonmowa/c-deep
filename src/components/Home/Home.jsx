// Home.jsx
import React, { useEffect, useRef, useState } from 'react';
import data from '../../data/profile.json';
import Navbar from '../common/NavBar/Navbar';
import { useLocation } from 'react-router-dom';
import './Home.css';
import { getExperience } from '../../util/util';
import About from '../About/About';
import Experience from '../Experience/Experience';

function Home() {
  const { firstName, location } = data;
  const experience = getExperience(data.careerStartDate);
  const locationState = useLocation().state;

  const aboutRef = useRef(null);
  const workRef = useRef(null);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    if (locationState?.scrollTo === 'about') {
      aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (locationState?.scrollTo === 'experience') {
      workRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [locationState]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const aboutTop = aboutRef.current?.offsetTop || 0;
      const workTop = workRef.current?.offsetTop || 0;

      if (scrollY >= workTop - 100) {
        setActiveSection('experience');
      } else if (scrollY >= aboutTop - 100) {
        setActiveSection('about');
      } else {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-container">
      <Navbar activeSection={activeSection} />

      <section className="home-hero">
        <div className="home-left" aria-label="Avatar placeholder">
          <div className="avatar-placeholder">
            <span>👤</span>
          </div>
        </div>

        <div className="home-right">
          <h1 className="random-offset-1">
            Hello, I’m <span className="highlight">{firstName}</span>
          </h1>
          <h2 className="random-offset-2">
            <span className="colorful-text">Front-end Web Developer</span> based in {location}
          </h2>

          <p className="experience-line random-offset-3">
            <button
              type="button"
              className="cta-button inline-button"
              onClick={() => workRef.current?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Experience
            </button>
          </p>
        </div>
      </section>

      <section ref={aboutRef}>
        <About />
      </section>
      <section ref={workRef}>
        <Experience />
      </section>
    </div>
  );
}

export default Home;
