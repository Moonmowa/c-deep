import React from 'react';
import './About.css';
import data from '../../data/profile.json';
import { getYearsOfExperience } from '../../util/util';
import Skills from '../Skills/Skills';

function About() {
  const years = getYearsOfExperience(data.careerStartDate);

  return (
    <section className="about-container" id="about">
      <div className="about-inner">
        <div className="about-text-column">
          <h2 className="about-title">About Me</h2>

          <p className="about-text">
            I’ve spent the last <strong>{years}+ years</strong> crafting clean, scalable, and high-performing interfaces — across industries like <span className="highlight">ERP</span>, <span className="highlight">e-commerce</span>, <span className="highlight">finance</span>, <span className="highlight">telecom</span>, and <span className="highlight">travel</span>.
          </p>

          <p className="about-text">
            My core toolkit includes <span className="highlight">React</span>, <span className="highlight">Angular</span>, <span className="highlight">JavaScript/TypeScript</span>, and modern web standards like <span className="highlight">HTML</span>, <span className="highlight">CSS</span>, and <span className="highlight">Bootstrap</span>. I’ve worked closely with clients and teams to bring ideas to life — building intuitive UIs, improving performance, and solving meaningful front-end challenges.
          </p>

          <p className="about-text">
            Along the way, I’ve learned to adapt with evolving technologies, approach problems with curiosity, and focus on what truly matters — the user experience.
          </p>

          <p className="about-text">
            These days, I love building thoughtful, creative <span className="highlight">React-based solutions</span> that are not just functional, but also maintainable and future-ready.
          </p>
        </div>

        <div className="skills-column">
          <Skills />
        </div>
      </div>
    </section>
  );
}

export default About;
