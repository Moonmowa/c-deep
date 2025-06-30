import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import data from '../../data/profile.json';
import './Home.css';
import About from '../About/About';
import Experience from '../Experience/Experience';

function Home({ setActiveSection }) {
  const { firstName, location } = data;
  const locationState = useLocation().state;

  const aboutRef = useRef(null);
  const workRef = useRef(null);
  const homeRef = useRef(null);
  const [activeSectionLocal, setActiveSectionLocal] = useState('home');

  useEffect(() => {
    setActiveSection(activeSectionLocal);
  }, [activeSectionLocal, setActiveSection]);

useEffect(() => {
  if (!locationState?.scrollTo) return;

  const targetRef =
    locationState.scrollTo === 'about'
      ? aboutRef
      : locationState.scrollTo === 'experience'
      ? workRef
      : homeRef;

  const scrollToTarget = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      requestAnimationFrame(scrollToTarget);
    }
  };

  scrollToTarget();
}, [locationState]);
useEffect(() => {
  let scrollTimeout = null;

  const handleScroll = () => {
    if (scrollTimeout) clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
      const aboutTop = aboutRef.current?.getBoundingClientRect().top;
      const workTop = workRef.current?.getBoundingClientRect().top;
      const threshold = 300;

      if (typeof workTop === 'number' && workTop <= threshold) {
        setActiveSectionLocal("experience");
      } else if (typeof aboutTop === 'number' && aboutTop <= threshold) {
        setActiveSectionLocal("about");
      } else {
        setActiveSectionLocal("home");
      }
    }, 100);
  };
  window.addEventListener("scroll", handleScroll);
  return () => {
    clearTimeout(scrollTimeout);
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

  return (
    <div className="home-container" ref={homeRef}>
      <section className="home-hero" id="home">
        <div className="home-left">
          <div className="avatar-placeholder">
            <span>👤</span>
          </div>
        </div>

        <div className="home-right">
          <h1>Hello, I’m <span className="highlight">{firstName}</span></h1>
          <h2><span className="colorful-text">Front-end Web Developer</span> based in {location}</h2>

          <p className="experience-line">
            <button className="cta-button inline-button" onClick={() => workRef.current?.scrollIntoView({ behavior: 'smooth' })}>
              View Experience
            </button>
          </p>
        </div>
      </section>

      <section id="about" ref={aboutRef}>
        <About />
      </section>

      <section id="experience" ref={workRef}>
        <Experience />
      </section>
    </div>
  );
}

export default Home;
