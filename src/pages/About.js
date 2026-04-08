import React from 'react';
import styles from './About.module.css';
import profilePic from '../assets/fadiImage-optimized.jpg';

export default function About() {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>About Me</h2>

      <div className={styles.content}>
        <div className={styles.profilePanel}>
          <div className={styles.profileFrame}>
            <img
              src={profilePic}
              alt="Fadi Albadrasawi"
              className={styles.profilePic}
              width="640"
              height="749"
              loading="lazy"
              decoding="async"
              sizes="(max-width: 760px) 150px, 150px"
            />
          </div>
        </div>
        <div className={styles.copyColumn}>
          <p className={styles.bio}>
            I'm a web developer
            with a BA in Digital Media from the University of Central Florida. My studies focused on web design and social platforms. I founded Printii, an AI 3D Printing startup, and I am currently researching the economic
            decision-making process behind virtual environments with physical
            goods and services.
          </p>
          <p className={styles.bio}>
            My current clients include some of the largest healthcare and education staffing
            companies in the United States.
          </p>
          <p className={styles.bio}>
            Outside of work you can find me with my daughter on the playground or trying to break 180ft to no avail at the driving range.
          </p>
        </div>
      </div>

      <div className={styles.sections}>
        <div className={styles.section}>
          <h3>Skills</h3>
          <ul>
            <li>JavaScript (ES6+), React, Three.js</li>
            <li>PHP, HTML, CSS</li>
            <li>C# + Unity</li>
            <li>Git and GitHub</li>
            <li>AWS</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h3>Interests</h3>
          <ul>
            <li>3D Printing and Digital Fabrication</li>
            <li>Manufacturing Logistics</li>
            <li>UX Research and Accessibility</li>
            <li>Disruptive Technologies</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
