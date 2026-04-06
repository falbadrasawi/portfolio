import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Fadi Albadrasawi.</p>
      <p>
        Designed and built by me and instant coffee.{' '}
        <a
          href="https://github.com/falbadrasawi/portfolio"
          target="_blank"
          rel="noopener noreferrer"
        >
          View source
        </a>
      </p>
    </footer>
  );
}
