import React from 'react';
import styles from './Home.module.css';
import fadiImage from '../assets/fadiImage-optimized.jpg';

export default function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Web & App Developer</p>
          <h1 className={styles.title}>Fadi Albadrasawi</h1>
          <p className={styles.subtitle}>
            I build high performing, search engine optimized and accessibile digital experiences
            that shape a great future for your next project.
          </p>
          <p className={styles.lede}>
            From websites and mobile apps to VR and AR experiences, there's no better feeling than
            turning ambitious ideas into real life user applications.
          </p>
        </div>

        <div className={styles.portraitPanel}>
          <div className={styles.portraitFrame}>
            <img
              src={fadiImage}
              alt="Fadi Albadrasawi"
              className={styles.heroImage}
              width="640"
              height="749"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              sizes="(max-width: 820px) 165px, 195px"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
