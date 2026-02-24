'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import DrawSVGPlugin from 'gsap/DrawSVGPlugin';
import Link from 'next/link';
import { useRef, useState } from 'react';

gsap.registerPlugin(useGSAP, DrawSVGPlugin);

function NavbarButton({ href }: { href: string }) {
  const [isHover, setIsHover] = useState(false);
  const circleRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    gsap.set(circleRef.current, { drawSVG: '0%', visibility: 'visible' });
    if (isHover) {
      gsap.to(circleRef.current, {
        drawSVG: '100%',
        duration: 0.6,
        ease: 'power3.out',
      });
    }
  }, [isHover]);

  return (
    <Link
      href={`/${href}`}
      className="button relative"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isHover && (
        <svg
          width="105"
          height="73"
          viewBox="0 0 127 73"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -inset-3"
          style={{ visibility: 'hidden' }}
        >
          <path
            ref={circleRef}
            d="M65.5056 56.5C32.5056 59.5 3.50555 53.5 3.00555 31.5C2.50555 9.5 36.7262 3.00001 65.5056 3C90.0056 2.99999 124.006 11.1132 124.006 31.5C124.006 61.1141 85.0056 72 49.5056 69"
            stroke="#F96E5B"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>
      )}
      <li className="font-kalnia text-2xl">{href}</li>
    </Link>
  );
}

export default function Navbar() {
  const list = ['About', 'Posts', 'Gallery'];
  useGSAP(() => {
    gsap.fromTo(
      '.button',
      { opacity: 0 },
      {
        delay: 0.6,
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
          gsap.set('.button', { opacity: 1 });
        },
      },
    );
  });

  return (
    <nav className="p-4 border-r border-r-black">
      <ul className="flex flex-col items-center gap-4">
        {list.map((el) => (
          <NavbarButton key={el} href={el.toLowerCase()} />
        ))}
      </ul>
    </nav>
  );
}
