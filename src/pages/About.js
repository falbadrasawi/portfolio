import React from 'react';
import styles from './About.module.css';
import profilePic from '../assets/fadiImage.PNG';

export default function About() {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>About Me</h2>

      <div className={styles.content}>
        <img
          src={profilePic}
          alt="Fadi Albadrasawi"
          className={styles.profilePic}
        />
        <p className={styles.bio}>
          I'm Fadi Albadrasawi, a frontend developer and product designer
          pursuing a BA in Digital Media with a concentration in web design and
          social platforms. I founded Printii, an additive manufacturing
          startup, and I am currently researching the economic
          decision-making process behind virtual environments with physical
          goods and services.
        </p>
      </div>

      <div className={styles.sections}>
        <div className={styles.section}>
          <h3>Skills</h3>
          <ul>
            <li>JavaScript (ES6+), React, Three.js</li>
            <li>HTML + CSS</li>
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
