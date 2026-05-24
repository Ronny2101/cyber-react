'use client';

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import "../../../css/carousel.css";


interface ImageItem {
  id: number | string;
  src: string;
}

const IMAGES_DATA: ImageItem[] = [
  { id: 1, src: '/img/camera.AVIF'},
  { id: 2, src: '/img/mac.jpg' },
  { id: 3, src: '/img/smart1.JPG' },
  { id: 4, src: '/img/camera1.AVIF' },
  { id: 5, src: '/img/mac1.jpg' },
  { id: 6, src: '/img/smart5.JPG' },
  { id: 7, src: '/img/mac2.jpg' },
  { id: 8, src: '/img/camera2.AVIF' },
  { id: 9, src: '/img/smart3.JPG' },
  { id: 10, src: '/img/mac3.jpg' },
  { id: 11, src: '/img/camera3.AVIF' },
  { id: 12, src: '/img/smart4.JPG' },
  { id: 13, src: '/img/smart2.JPG' },
  { id: 14, src: '/img/mac4.jpg' },
  { id: 15, src: '/img/camera4.AVIF' },
  { id: 16, src: '/img/smart6.JPG' },
  { id: 17, src: '/img/camera5.AVIF' },
  { id: 18, src: '/img/smart7.JPG' },
  { id: 19, src: '/img/camera6.AVIF' },
  { id: 20, src: '/img/smart8.JPG' },
  { id: 21, src: '/img/camera7.AVIF' },
  { id: 22, src: '/img/smart9.JPG' },
  { id: 23, src: '/img/camera8.AVIF' },
  { id: 24, src: '/img/smart10.JPG' },
  { id: 25, src: '/img/camera9.AVIF' },
  { id: 26, src: '/img/camera10.AVIF' },
];

export default function Carousel(): JSX.Element {
  const [images, setImages] = useState<ImageItem[]>(IMAGES_DATA);

  const handleMove = (direction: number) => {
    setImages((prevImages) => {
      const imgArrCopy = [...prevImages];

      if (direction > 0) {
        const firstItem = imgArrCopy.shift();
        if (!firstItem) return prevImages;
        imgArrCopy.push({ ...firstItem, id: Math.random() });
      } else {
        const lastItem = imgArrCopy.pop();
        if (!lastItem) return prevImages;
        imgArrCopy.unshift({ ...lastItem, id: Math.random() });
      }

      return imgArrCopy;
    });
  };

  const variants: Variants = {
    active: {
      x: `calc(-50% + 0px)`,
      width: '30rem',
      scale: 1.01,
      opacity: 1,
      zIndex: 5,
    },
    level1: (pos: number) => ({
      x: `calc(-50% + ${pos * 670}px)`,
      width: '28rem',
      scale: 0.9,
      opacity: 0.9,
      zIndex: 4,
    }),
    level2: (pos: number) => ({
      x: `calc(-50% + ${pos * 145}px)`,
      width: '14rem',
      scale: 0.75,
      opacity: 0.7,
      zIndex: 3,
    }),
    level3: (pos: number) => ({
      x: `calc(-50% + ${pos * 108}px)`,
      width: '10rem',
      scale: 0.6,
      opacity: 0.5,
      zIndex: 2,
    }),
    hidden: (pos: number) => ({
      x: `calc(-50% + ${pos * 90}px)`,
      width: 0,
      scale: 0.25,
      opacity: 0,
      zIndex: 1,
    }),
  };

  return (
    <div className="carousel-container">
      {images.map((image, i) => {
        const position = i - Math.floor(images.length / 2);

        const imgLevel =
          position === 0
            ? 'active'
            : Math.abs(position) === 1
            ? 'level1'
            : Math.abs(position) === 2
            ? 'level2'
            : Math.abs(position) === 3
            ? 'level3'
            : 'hidden';

        return (
          <motion.div
            key={image.id}
            initial={false}
            className="carousel-item"
            animate={imgLevel}
            custom={position}
            variants={variants}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          >
            <img
              src={image.src}
              className="carousel-image"
              alt={`Carousel image ${i + 1}`}
            />
          </motion.div>
        );
      })}

      <button
        onClick={() => handleMove(-1)}
        className="carousel-btn left-btn"
      >
        ◀
      </button>
      <button
        onClick={() => handleMove(1)}
        className="carousel-btn right-btn"
      >
        ▶
      </button>
    </div>
  );
}