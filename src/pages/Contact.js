// src/pages/Contact.js
import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import styles from './Contact.module.css';

export default function Contact() {
  // — state for form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  // — validation errors
  const [errors, setErrors] = useState({});
  // — tracks if we showed success message
  const [success, setSuccess] = useState(false);

  // simple field‐by‐field validation
  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email) {
      errs.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errs.email = 'Email is invalid';
    }
    if (!formData.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  // keep track of each field
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // on submit, validate & send via EmailJS
  const handleSubmit = e => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    const SERVICE_ID  = 'service_mqfxlrf';
    const TEMPLATE_ID = 'template_3o6955o';
    // (emailjs.init was called once in index.js with your PUBLIC_KEY)

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, {
        from_name:  formData.name,
        from_email: formData.email,
        message:    formData.message,
      })
      .then(() => {
        setSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      })
      .catch(err => {
        console.error('EmailJS error:', err);
        setErrors({ form: 'Failed to send. Please try again later.' });
      });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Contact Me</h2>

      {success && <p className={styles.success}>✅ Your message has been sent!</p>}
      {errors.form && <p className={styles.error}>{errors.form}</p>}

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.field}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>

        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>

        <div className={styles.field}>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
          />
          {errors.message && <span className={styles.error}>{errors.message}</span>}
        </div>

        <button type="submit" className={styles.submit}>
          Send Message
        </button>
      </form>

      <div className={styles.socials}>
        <h3>Connect with Me</h3>
        <ul>
          <li>
            <a
              href="https://www.linkedin.com/in/fadi-albadrasawi123/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href="https://github.com/falbadrasawi"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/babasheepclothingco/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/@bigfadi"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

