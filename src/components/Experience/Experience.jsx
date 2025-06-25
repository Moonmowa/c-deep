import React, { useState, useEffect } from 'react';
import data from '../../data/profile.json';
import './Experience.css';
import RolesResponsibilities from '../Roles/RolesResponsibilities';

function Experience() {
    const experienceData = data.experience;
    const [index, setIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [fadeKey, setFadeKey] = useState(0);

    const total = experienceData.length;

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const next = () => {
        setFadeKey(prev => prev + 1);
        setIndex((prev) => (prev + (isMobile ? 1 : 2)) % total);
    };

    const prev = () => {
        setFadeKey(prev => prev + 1);
        setIndex((prev) => (prev - (isMobile ? 1 : 2) + total) % total);
    };

    const getVisibleCards = () => {
        const count = isMobile ? 1 : 2;
        let visible = experienceData.slice(index, index + count);
        if (visible.length < count && total > 1) {
            visible = visible.concat(experienceData.slice(0, count - visible.length));
        }
        return visible;
    };

    return (
        <section className="experience-section" id="experience">
            <h2>Professional Experience</h2>

            <div className="experience-layout">
                <div className="roles-container">
                    <RolesResponsibilities isMobile={isMobile} />
                </div>

                <div className="carousel-wrapper">
                    {!isMobile && (
                        <button className="arrow left-arrow" onClick={prev} aria-label="Previous">
                            &#10094;
                        </button>
                    )}

                    <div key={fadeKey} className="carousel fade-slide">
                        {getVisibleCards().map((item, i) => (
                            <div className="experience-card" key={`${item.title}-${i}`}>
                                <div className="card-header">
                                    <img src={item.logo} alt={`${item.client} logo`} className="logo" />
                                    <div>
                                        <h3>{item.title}</h3>
                                        <p className="client">{item.client}</p>
                                        <p className="date">{item.date}</p>
                                    </div>
                                </div>
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

                    {!isMobile && (
                        <button className="arrow right-arrow" onClick={next} aria-label="Next">
                            &#10095;
                        </button>
                    )}
                </div>
            </div>

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
        </section>
    );
}

export default Experience;
