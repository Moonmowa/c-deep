import React, { useState, useEffect } from 'react';
import './Skills.css';

const skills = [
  { name: 'React', icon: 'https://cdn.worldvectorlogo.com/logos/react-2.svg' },
  { name: 'Angular', icon: 'https://cdn.worldvectorlogo.com/logos/angular-icon-1.svg' },
  { name: 'JavaScript', icon: 'https://cdn.worldvectorlogo.com/logos/logo-javascript.svg' },
  { name: 'TypeScript', icon: 'https://cdn.worldvectorlogo.com/logos/typescript.svg' },
  { name: 'Git', icon: 'https://cdn.worldvectorlogo.com/logos/git-icon.svg' },
  { name: 'HTML5', icon: 'https://cdn.worldvectorlogo.com/logos/html-1.svg' },
  { name: 'CSS3', icon: 'https://cdn.worldvectorlogo.com/logos/css-3.svg' },
  { name: 'Bootstrap', icon: 'https://cdn.worldvectorlogo.com/logos/bootstrap-5-1.svg' },
  { name: 'Material UI', icon: 'https://cdn.worldvectorlogo.com/logos/material-ui-1.svg' },
];

const animationDuration = 18; // total animation duration in seconds
const delayStep = 2;          // delay per item in seconds

function Skills() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const totalMs = animationDuration * 1000;
    let startTime = performance.now();

    const id = setInterval(() => {
      const elapsed = (performance.now() - startTime) % totalMs;
      const index = Math.floor(elapsed / (delayStep * 1000)) % skills.length;
      setCurrentIndex(index);
    }, 100);

    return () => clearInterval(id);
  }, []);

  const prevIndex = (currentIndex - 1 + skills.length) % skills.length;

  return (
    <section className="skills-section" id="skills">
      <div className="skills-carousel">
        {skills.map((skill, index) => {
          const delay = index * delayStep;
          const isActive = index === currentIndex;
          const isPrev = index === prevIndex;

          return (
            <div
              key={index}
              className="skill-item"
              style={{
                animationDelay: `${delay}s`,
                animationDuration: `${animationDuration}s`,
                zIndex: isActive ? 20 : isPrev ? 10 : 0,
              }}
            >
              <img src={skill.icon} alt={skill.name} />
              <p>{skill.name}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Skills;
