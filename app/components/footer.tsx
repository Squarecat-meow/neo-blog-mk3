'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

gsap.registerPlugin(useGSAP);

export default function Footer() {
  useGSAP(() => {
    gsap.fromTo(
      'footer',
      {
        xPercent: 50,
        scaleX: 0,
      },
      {
        xPercent: 0,
        scaleX: 1,
        duration: 0.5,
        ease: 'power3.inOut',
      },
    );
    gsap.fromTo(
      '.footer-text',
      {
        opacity: 0,
      },
      {
        delay: 0.7,
        opacity: 1,
        duration: 0.05,
        stagger: {
          each: 0.1,
          from: 'start',
          repeat: 6,
          yoyo: true,
        },
        ease: 'rough',
        onComplete: () => {
          gsap.set('.footer-text', { opacity: 1 });
        },
      },
    );
  });

  return (
    <footer className="font-serif w-full lg:w-3/4 pt-4 pb-8 sm:flex sm:flex-col lg:grid lg:grid-cols-6 border-t border-t-black">
      <span className="footer-text text-gray-300 text-xs text-center tracking-[0.5em]">
        © 2026.
      </span>
      <span className="footer-text col-span-5 text-gray-300 text-xs text-center tracking-[0.5em]">
        NO TRACKING. NO COOKIES. JUST WORDS.
      </span>
    </footer>
  );
}
