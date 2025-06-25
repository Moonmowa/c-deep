import React from 'react';
import './RolesResponsibilities.css';

const roles = [
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/1055/1055687.png',
    text: 'Developed responsive and interactive user interfaces using React and Angular, ensuring a seamless experience across all devices.',
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/1023/1023656.png',
    text: 'Collaborated with UI/UX designers to translate design mockups into functional code, improving user experience.',
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/681/681494.png',
    text: 'Integrated front-end interfaces with back-end APIs, ensuring smooth communication and functionality.',
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/3103/3103446.png',
    text: 'Built reusable components and implemented modern design patterns to streamline development and maintain consistency.',
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/633/633759.png',
    text: 'Optimized the performance of web applications for faster load times and better responsiveness.',
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111288.png',
    text: 'Worked with version control tools like Git, managing deployments on platforms like Azure and AWS.',
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/595/595067.png',
    text: 'Ensured code quality and stability through unit testing, writing test cases, and resolving production issues efficiently.',
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/1055/1055644.png',
    text: 'Engaged in Agile/Scrum processes, collaborating within cross-functional teams to meet project goals and deadlines.',
  },
];

function RolesResponsibilities({ isMobile }) {
  return (
    <section className="roles-section" id="roles-responsibilities">
      {isMobile && <h2>Roles & Responsibilities</h2>}
      <ul className="roles-list">
        {roles.map((role, i) => (
          <li key={i}>
            <img src={role.icon} alt="icon" className="role-icon" />
            {role.text}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default RolesResponsibilities;
