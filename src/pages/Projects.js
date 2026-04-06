import React, { useState } from 'react';
import styles from './Projects.module.css';

import proj1Img1 from '../assets/shft1-optimized.jpg';
import proj1Img2 from '../assets/shft2.png';
import proj1Img3 from '../assets/shft3.png';
import proj2Img1 from '../assets/printii1-optimized.jpg';
import proj2Img2 from '../assets/printii2-optimized.jpg';
import proj2Img3 from '../assets/printii3-optimized.jpg';
import proj3Img1 from '../assets/exerciseAppDesign-optimized.jpg';

const projects = [
  {
    title: 'TheSHFTApp',
    link: 'https://www.theshftapp.com/',
    description:
      'I served as Product Designer for TheSHFTApp, using Photoshop and Figma to shape the component system and translate the design into developer-ready JSX.',
    images: [
      { src: proj1Img1, width: 1400, height: 2352 },
      { src: proj1Img2, width: 790, height: 1711 },
      { src: proj1Img3, width: 782, height: 1698 },
    ],
  },
  {
    title: 'Printii',
    link: 'https://www.figma.com/proto/YjKJjD5fgtLJjj921xPjpr/PrintiiFinalPrototype?node-id=14-2792&p=f&t=5B6bpmTw4O9P5XKw-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1',
    linkText: 'Printii Prototype',
    description:
      'I designed the full Printii prototype in Figma and continue to develop the product direction around a direct-to-consumer text-to-print workflow powered by Three.js, PHP, and MySQL.',
    images: [
      { src: proj2Img1, width: 1400, height: 915 },
      { src: proj2Img2, width: 1400, height: 931 },
      { src: proj2Img3, width: 1400, height: 934 },
    ],
  },
  {
    title: 'Exercise App',
    link: 'https://falbadrasawi.github.io/react-exercise-app/',
    linkText: 'Visit Exercise App',
    description:
      'A React-based exercise application deployed to GitHub Pages with a simple, focused experience built on JSX, CSS, and reusable UI structure.',
    images: [{ src: proj3Img1, width: 1400, height: 1144 }],
  },
];

function ImageCarousel({ images, onImageClick }) {
  const [current, setCurrent] = useState(0);
  const currentImage = images[current];

  const prev = () => setCurrent((index) => (index - 1 + images.length) % images.length);
  const next = () => setCurrent((index) => (index + 1) % images.length);

  return (
    <div className={styles.carousel}>
      <div className={styles.previewFrame}>
        <img
          src={currentImage.src}
          alt={`Screenshot ${current + 1} of ${images.length}`}
          className={styles.image}
          onClick={() => onImageClick(current)}
          width={currentImage.width}
          height={currentImage.height}
          loading="lazy"
          decoding="async"
          sizes="(max-width: 860px) calc(100vw - 2.4rem), 420px"
        />
      </div>

      <div className={styles.indicator}>
        <button
          type="button"
          onClick={prev}
          className={styles.navButton}
          aria-label="Previous"
        >
          &lt;
        </button>
        <span className={styles.counter}>
          {current + 1} / {images.length}
        </span>
        <button
          type="button"
          onClick={next}
          className={styles.navButton}
          aria-label="Next"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default function Projects() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState([]);
  const [modalIndex, setModalIndex] = useState(0);

  const openModal = (images, index) => {
    setModalImages(images);
    setModalIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);
  const modalPrev = () =>
    setModalIndex((index) => (index - 1 + modalImages.length) % modalImages.length);
  const modalNext = () =>
    setModalIndex((index) => (index + 1) % modalImages.length);

  return (
    <div className={styles.container}>
      {projects.map((project) => (
        <article key={project.title} className={styles.project}>
          <div className={styles.projectHeader}>
            <div>
              <h2 className={styles.title}>{project.title}</h2>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                {project.linkText || project.link}
              </a>
            </div>
          </div>

          <div className={styles.content}>
            <ImageCarousel
              images={project.images}
              onImageClick={(index) => openModal(project.images, index)}
            />
            <p className={styles.description}>{project.description}</p>
          </div>
        </article>
      ))}

      {modalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className={styles.modalClose}
              aria-label="Close"
              onClick={closeModal}
            >
              x
            </button>

            <div className={styles.modalCarousel}>
              <button
                type="button"
                onClick={modalPrev}
                className={styles.modalArrow}
                aria-label="Previous"
              >
                &lt;
              </button>
              <img
                src={modalImages[modalIndex].src}
                alt={`Screenshot ${modalIndex + 1}`}
                className={styles.modalImage}
                width={modalImages[modalIndex].width}
                height={modalImages[modalIndex].height}
                decoding="async"
              />
              <button
                type="button"
                onClick={modalNext}
                className={styles.modalArrow}
                aria-label="Next"
              >
                &gt;
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
