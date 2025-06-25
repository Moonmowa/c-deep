import React, { useEffect, useState } from 'react';
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

function Skills() {
  const [startIndex, setStartIndex] = useState(0);
  const itemsToShow = 3;
  const totalSkills = skills.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % totalSkills);
    }, 2000); // every 2 seconds
    return () => clearInterval(interval);
  }, [totalSkills]);

  const visibleSkills = [];
  for (let i = 0; i < itemsToShow; i++) {
    visibleSkills.push(skills[(startIndex + i) % totalSkills]);
  }

  return (
    <section className="skills-section" id="skills">
      <div className="skills-carousel">
        {visibleSkills.map((skill) => (
          <div key={skill.name} className="skill-item">
            <img src={skill.icon} alt={skill.name} />
            <p>{skill.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
