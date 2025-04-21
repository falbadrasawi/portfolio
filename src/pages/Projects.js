import React, { useState } from 'react';
import styles from './Projects.module.css';

// — import your project images here
import proj1Img1 from '../assets/shft1.png';
import proj1Img2 from '../assets/shft2.png';
import proj1Img3 from '../assets/shft3.png';
import proj2Img1 from '../assets/printii1.png';
import proj2Img2 from '../assets/printii2.png';
import proj2Img3 from '../assets/printii3.png';
import proj3Img1 from '../assets/exerciseAppDesign.png';

const projects = [
  {
    title: 'TheSHFTApp',
    link: 'https://www.theshftapp.com/',
    description:
      'I was the Product Designer for TheSHFTApp. Utilized Photoshop and Figma to build the components and converted the design to JSX using a plugin to export and send to the development team.',
    images: [proj1Img1, proj1Img2, proj1Img3],
  },
  {
    title: 'Printii',
    link: 'https://www.figma.com/proto/YjKJjD5fgtLJjj921xPjpr/PrintiiFinalPrototype?node-id=14-2792&p=f&t=5B6bpmTw4O9P5XKw-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1',
    linkText: 'Printii Prototype',
    description:
      'I was the Product Designer for the Printii app, building the entire prototype in Figma. I am also the developer of the application utilizing the three.js JS framework, PHP and MySQL to support the backend. Currently in mid-development with existing proof of concept. This text-to-3D print direct consumer services application is scheduled for full deployment Q2 2026',
    images: [proj2Img1, proj2Img2, proj2Img3],
  },
  {
    title: 'Exercise App',
    link: 'https://falbadrasawi.github.io/react-exercise-app/',
    linkText: 'Link to App',
    description:
      'A simple exercise application developed using the React framework and deployed to GH Pages. Standard use of JSX, CSS and HTML',
    images: [proj3Img1],
  },
];

function ImageCarousel({ images, onImageClick }) {
  const [current, setCurrent] = useState(0);
  const prev = () =>
    setCurrent((i) => (i - 1 + images.length) % images.length);
  const next = () => setCurrent((i) => (i + 1) % images.length);

  return (
    <div className={styles.carousel}>
      <img
        src={images[current]}
        alt={`Screenshot ${current + 1} of ${images.length}`}
        className={styles.image}
        onClick={() => onImageClick(current)}
      />

      <div className={styles.indicator}>
        <button onClick={prev} className={styles.navButton} aria-label="Previous">
          ‹
        </button>
        <span className={styles.counter}>
          {current + 1} / {images.length}
        </span>
        <button onClick={next} className={styles.navButton} aria-label="Next">
          ›
        </button>
      </div>
    </div>
  );
}

export default function Projects() {
  // Lightbox state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState([]);
  const [modalIndex, setModalIndex] = useState(0);

  const openModal = (images, idx) => {
    setModalImages(images);
    setModalIndex(idx);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);
  const modalPrev = () =>
    setModalIndex((i) => (i - 1 + modalImages.length) % modalImages.length);
  const modalNext = () =>
    setModalIndex((i) => (i + 1) % modalImages.length);

  return (
    <div className={styles.container}>
      {projects.map((project, i) => (
        <div key={i} className={styles.project}>
          <h2 className={styles.title}>{project.title}</h2>
          <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.link}
    >
      {project.linkText || project.link}
    </a>

          <div className={styles.content}>
            <ImageCarousel
              images={project.images}
              onImageClick={(idx) => openModal(project.images, idx)}
            />
            <p className={styles.description}>{project.description}</p>
          </div>

          <hr className={styles.divider} />
        </div>
      ))}

      {modalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.modalClose}
              aria-label="Close"
              onClick={closeModal}
            >
              ×
            </button>

            <div className={styles.modalCarousel}>
              <button
                onClick={modalPrev}
                className={styles.modalArrow}
                aria-label="Previous"
              >
                ‹
              </button>
              <img
                src={modalImages[modalIndex]}
                alt={`Screenshot ${modalIndex + 1}`}
                className={styles.modalImage}
              />
              <button
                onClick={modalNext}
                className={styles.modalArrow}
                aria-label="Next"
              >
                ›
              </button>
            </div>

            <div className={styles.modalIndicator}>
              {modalIndex + 1} / {modalImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
