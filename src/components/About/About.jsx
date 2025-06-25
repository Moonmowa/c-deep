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
            With <strong>{years}+ years</strong> of experience delivering high-quality, scalable interfaces across domains like ERP, e-commerce, finance, telecom, and travel.
          </p>

          <p className="about-text">
            My core stack includes React, Angular, TypeScript, and modern web standards like HTML, CSS, and Bootstrap. I’ve worked closely with clients and cross-functional teams to build intuitive UIs, optimize performance, and solve real-world problems through thoughtful front-end architecture.
          </p>

          <p className="about-text">
            My career started at Circle Square Technologies, a startup where I transitioned from intern to full-time developer. I worked directly with clients and helped rebuild SmartERP — migrating it from AngularJS to Angular 7.
          </p>

          <p className="about-text">
            That early experience shaped my ability to own complex front-end systems — a skill I've continued to build across every project I've taken on since.
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
