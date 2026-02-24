'use client';

import { useGSAP } from '@gsap/react';
import { SiDiscord, SiGithub, SiMisskey } from '@icons-pack/react-simple-icons';
import gsap from 'gsap';
import Image from 'next/image';

gsap.registerPlugin(useGSAP);

export default function Page() {
  useGSAP(() => {
    gsap.set('#about', { opacity: 0, y: -5 });
    gsap.to('#about', {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power3.inOut',
    });
  });
  return (
    <section id="about">
      <div className="flex flex-col gap-4">
        <div className="flex">
          <Image
            src={'/profile.png'}
            alt="프로필 사진"
            width={200}
            height={200}
          />
          <div className="ml-4">
            <h1 className="text-4xl font-bold">
              요즈미나
              <span className="text-xl text-slate-500"> (Yozumina)</span>
            </h1>
            <h2 className="text-xl">
              &lt;head&gt;와 &lt;body&gt;로 이루어진 사람
            </h2>
            <p className="mt-4">
              Typescript와 React, Node.js로 이것저것 만듭니다. C나 Rust도 찔끔
              할 줄 알아요.
              <br />
              생성형 AI 사용을 지양하고, 문서를 읽고 수제 코드를 쓰며 직접
              디버깅하려고 노력하고 있습니다.
              <br />그 밖엔 바이크(MT-03), 만년필이나 잉크 등 문구류,
              키보드(특히 자작이나 스플릿), 맛있는 식사나 디저트를 좋아해요.{' '}
              <br />
              <br /> 요새 고래처럼 음료수를 너무 많이 마셔서 고민이랍니다.
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">다른 링크</h2>
          <p className="flex gap-2 items-center text-sm">
            <SiGithub />
            <a
              href="https://github.com/Squarecat-meow"
              target="_blank"
              rel="noopener noreferer"
              className="text-blue-600 font-sans"
            >
              Squarecat-meow
            </a>
          </p>
          <p className="flex gap-2 items-center text-sm font-sans">
            <SiMisskey />
            <a
              href="https://serafuku.moe/@Yozumina"
              target="_blank"
              rel="noopener noreferer"
              className="text-blue-600"
            >
              @Yozumina@serafuku.moe
            </a>
          </p>
          <p className="flex gap-2 items-center text-sm font-sans">
            <SiDiscord />
            yozumina
          </p>
        </div>
      </div>
    </section>
  );
}
