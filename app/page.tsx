import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-screen h-screen bg-[#131112] text-white">
      <div className="w-full h-full flex flex-col gap-y-10 justify-center items-center md:w-1/2 md:flex-row md:items-center md:justify-between mx-auto">
        <div className="flex flex-col gap-y-5 w-full px-4 md:w-1/2">
          <h2 className="text-5xl font-bold">
            Code<span className="text-[#14cc60]">Run</span>
          </h2>
          <p className="text-3xl font-semibold">
            Write code snippets on the{' '}
            <span className="text-[#f26419]">Run</span>
          </p>
          <Link href={'/login'}>
            <button className="rounded p-3 text-center bg-[#14cc60] text-white ring-[#14cc60] hover:bg-[#60656f] hover:text-gray-300 transition-all duration-500">
              Start Now
            </button>
          </Link>
        </div>
        <Image
          src={'/logo.png'}
          width={256}
          height={256}
          alt="CodeRun Logo"
          className="w-64 h-64 animate-pulse duration-1000"
        />
      </div>
    </div>
  );
}
