'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';

gsap.registerPlugin(useGSAP);

export default function Home() {
  useGSAP(() => {
    gsap.from('.main-item', {
      y: -10,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.inOut',
    });
  });

  return (
    <>
      <section className="flex">
        <Image
          src={'/greetings.png'}
          alt="메인화면 요즈미나 스탠딩 일러스트"
          width={300}
          height={300}
          className="main-item"
        />
        <section className="space-y-2">
          <h1 className="main-item text-4xl font-bold text-center">
            요즈미나의 정원에 어서오세요!
          </h1>
          <p className="main-item break-keep">
            이곳은 제가 가꾸는 정원같은 곳이에요. 직접 쓰는 글과 직접 찍은
            사진으로 꾸미는 블로그랍니다. 쿠키 동의도 없고, 사용자 트래킹도
            없어요. 오로지 제 글만 존재해요.
            <br />
            <br />뭘 올릴지는 저만 알고 있는 좌충우돌같은 곳이기도 해요. 언제는
            코딩 관련 글이 올라올 때도 있고, 언제는 바이크를 타고 찍은 사진이
            올라올 때도 있고, 언제는 티룸에 가서 애프터눈 티세트를 먹고 온
            사진과 후기를 남길 수도 있답니다. 정원에 수많은 꽃과 풀이 자라는
            것처럼, 저는 제 글이 자라도록 가꾸고 손볼거에요.
            <br />
            <br /> 지켜봐주세요! 잡초가 자라지 않게 저도 열심히 올게요!
          </p>
        </section>
      </section>
      <p className="main-item text-xs text-center">
        그 외 재밌어 보이는 것들 추가 예정...
      </p>
    </>
  );
}
