import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  const navLinkClass = ({ isActive }) =>
    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;

  return (
    <nav className={styles.navbar} aria-label="Primary">
      <div className={styles.brand}>
        <Link to="/">Fadi Albadrasawi</Link>
      </div>

      <ul className={styles.navLinks}>
        <li>
          <NavLink to="/" className={navLinkClass} end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/projects" className={navLinkClass}>
            Projects
          </NavLink>
        </li>
        <li>
          <NavLink to="/consultation" className={navLinkClass}>
            Consultation
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
