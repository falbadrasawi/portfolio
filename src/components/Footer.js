import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Fadi Albadrasawi.</p>
      <p>
        Built with Instant Coffee •{' '}
        <a href="https://github.com/falbadrasawi/portfolio" target="_blank" rel="noopener noreferrer">
          Source
        </a>
      </p>
    </footer>
  );
}
