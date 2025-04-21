import React from 'react';
import styles from './Home.module.css';
import fadiImage from '../assets/fadiImage.PNG';  // <-- correct relative path & exact filename


export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.overlay}>
      <img
          src={fadiImage}
          alt="Fadi Albadrasawi"
          className={styles.heroImage}
        />
        <h1 className={styles.title}>Fadi Albadrasawi</h1>
        <p className={styles.subtitle}>
          Frontend Developer | Product Designer
        </p>
        <br></br>
        <p>If you need a Website or Mobile Application or VR/AR/MR experience or the Impossible then I'm your guy.</p>
      </div>



    </div>
  );
}
