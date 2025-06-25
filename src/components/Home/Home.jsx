import React, { useEffect, useRef } from 'react';
import data from '../../data/profile.json';
import Navbar from '../common/NavBar/Navbar';
import { useLocation } from 'react-router-dom';
import './Home.css';
import { getExperience } from '../../util/util';
import About from '../About/About';
// import Contact from '../Contact/Contact';
import Work from '../Work/Work';
import Experience from '../Experience/Experience';

function Home() {
  const { name, location } = data;
  const locationState = useLocation().state;
  const experience = getExperience(data.careerStartDate);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const workRef = useRef(null);


  useEffect(() => {
    if (locationState?.scrollTo === 'about') {
      aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (locationState?.scrollTo === 'contact') {
      contactRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (locationState?.scrollTo === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (locationState?.scrollTo === 'experience'){
       workRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [locationState]);
  
  return (
    <div className="home-container">
      <Navbar />

      <section className="home-hero">
        <div className="home-left">
          <div className="avatar-placeholder">
            <span>👤</span>
          </div>
        </div>

        <div className="home-right">
          <h1>Hello, I’m <span className="highlight">{name}</span></h1>
          <h2>Front-end Developer based in {location}</h2>
          <p className="experience-line">{experience} of experience in web development</p>
          <p>
            I craft performant, elegant, and scalable web interfaces using React, Angular, and TypeScript.
          </p>
          <button className="cta-button" onClick={() => workRef.current?.scrollIntoView({ behavior: 'smooth' })}>
            Professional Experience
          </button>
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
