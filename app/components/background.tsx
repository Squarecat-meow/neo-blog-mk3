import Image from 'next/image';

export default function Background() {
  return (
    <div className="w-screen h-screen absolute inset-0 -z-[1]">
      <Image
        src="/bg-1.png"
        alt="Background Element 1"
        width={435}
        height={540}
      />
      <Image
        src="/bg-2.png"
        alt="Background Element 1"
        width={228}
        height={344}
        className="absolute right-0 bottom-0"
      />
    </div>
  );
}
