import React from 'react';
import styles from './Home.module.css';
import fadiImage from '../assets/fadiImage.PNG';

export default function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Frontend Developer and Product Designer</p>
          <h1 className={styles.title}>Fadi Albadrasawi</h1>
          <p className={styles.subtitle}>
            I build clear, polished digital experiences that balance product
            thinking, interface design, and frontend execution.
          </p>
          <p className={styles.lede}>
            From websites and mobile apps to VR, AR, and MR concepts, I enjoy
            turning ambitious ideas into work that feels intuitive on day one.
          </p>
        </div>

        <div className={styles.portraitPanel}>
          <img
            src={fadiImage}
            alt="Fadi Albadrasawi"
            className={styles.heroImage}
          />
        </div>
      </section>
    </div>
  );
}
