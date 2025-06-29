import React, { useState, useEffect } from 'react';
import data from '../../data/profile.json';
import './Experience.css';
import RolesResponsibilities from '../Roles/RolesResponsibilities';

function Experience() {
  const experienceData = data.experience;
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [fadeKey, setFadeKey] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const total = experienceData.length;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const next = () => {
    setFadeKey(prev => prev + 1);
    setIndex(prev => (prev + 1) % total);
  };

  const prev = () => {
    setFadeKey(prev => prev + 1);
    setIndex(prev => (prev - 1 + total) % total);
  };

  const getVisibleCards = () => {
    const count = isMobile ? 1 : 2;
    let visible = experienceData.slice(index, index + count);
    if (visible.length < count && total > 1) {
      visible = visible.concat(experienceData.slice(0, count - visible.length));
    }
    return visible;
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const distance = touchStartX - touchEndX;
      const threshold = 50;

      if (distance > threshold) next();
      else if (distance < -threshold) prev();
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <section className="experience-section" id="experience">
      <div className="experience-layout">
        <div className="carousel-wrapper">
          <h2>Professional Experience</h2>

          {!isMobile && (
            <button className="arrow left-arrow" onClick={prev} aria-label="Previous">
              &#10094;
            </button>
          )}

          {/* Only this wrapper is swipe-sensitive */}
          <div
            className="carousel-touch-wrapper"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div key={fadeKey} className="carousel fade-slide">
              {getVisibleCards().map((item, i) => (
                <div className="experience-card" key={`${item.title}-${i}`}>
                  {!isMobile && <div className="date-banner">{item.date}</div>}

                  <div className="card-header">
                    <img src={item.logo} alt={`${item.client} logo`} className="logo" />
                    <div>
                      <h3>{item.title}</h3>
                      <p className="client">{item.client}</p>
                      <span className="mobilefix-20250627083036-client-tag">{item.company}</span>
                    </div>
                  </div>

                  {isMobile && <div className="date-banner">{item.date}</div>}

                  <p className="description">{item.description}</p>

                  <div className="technologies">
                    {item.technologies.map((tech) => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>

                  <ul className="learnings">
                    {item.keyLearnings.map((learn, idx) => (
                      <li key={idx}>{learn}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {!isMobile && (
            <button className="arrow right-arrow" onClick={next} aria-label="Next">
              &#10095;
            </button>
          )}

          {isMobile && (
            <div className="carousel-dots">
              {experienceData.map((_, i) => (
                <span
                  key={i}
                  className={`dot ${i === index ? 'active' : ''}`}
                  onClick={() => {
                    setFadeKey(prev => prev + 1);
                    setIndex(i);
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="roles-container">
          <h3 className="roles-heading">Roles & Responsibilities</h3>
          <RolesResponsibilities isMobile={isMobile} />
        </div>
      </div>
    </section>
  );
}

export default Experience;
