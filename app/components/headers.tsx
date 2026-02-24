'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import DrawSVGPlugin from 'gsap/DrawSVGPlugin';
import Link from 'next/link';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP, DrawSVGPlugin);

export default function Headers() {
  const lineRef = useRef<SVGPathElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    gsap.set(lineRef.current, { drawSVG: '0%' });
    gsap.fromTo(
      'header',
      {
        xPercent: -50,
        scaleX: 0,
      },
      {
        xPercent: 0,
        scaleX: 1,
        duration: 0.5,
        ease: 'power3.inOut',
      },
    );
    gsap.to(lineRef.current, {
      delay: 0.3,
      drawSVG: '100%',
      duration: 1,
      ease: 'power3.inOut',
    });
    gsap.fromTo(
      '.header',
      { opacity: 0 },
      {
        delay: 0.3,
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
          gsap.set(textRef.current, { opacity: 1 });
        },
      },
    );
  });

  return (
    <header className="w-full lg:w-3/4 pt-12 lg:pt-20 pb-4 flex justify-center items-end border-b border-b-black">
      <Link href={'/'} className="w-3xl">
        <div className="w-full flex justify-between items-end">
          <span className="header text-key text-2xl">＊＊＊</span>
          <div className="relative">
            <h1 className="header font-gloock text-7xl" ref={textRef}>
              Mina&apos;s Garden
            </h1>
            <svg
              viewBox="0 0 673 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute bottom-0"
            >
              <path
                ref={lineRef}
                d="M3.50083 5.99997C20.5008 -2.00003 41.5008 13 69.5008 13C97.5008 13 119.001 3.5 130.501 3.5C159.001 3.5 159.001 15 187.501 16C216.001 17 238.001 20.5 253.001 13.5C268.001 6.49998 293.206 4.51423 323.001 13.5C354.501 23 380.001 5.99997 396.501 5.99997C427.001 5.99997 447.313 10.1162 465.501 13.5C487.001 17.5 496.288 18.9473 526.001 13.5C556.001 7.99999 575.001 18.5 590.001 18.5C610.501 18.5 619.501 7.99999 633.501 7.99999C647.501 7.99999 663.001 20 669.501 20"
                stroke="#F96E5B"
                strokeWidth="7"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="header text-key text-2xl">＊＊＊</span>
        </div>
      </Link>
    </header>
  );
}
