"use client";
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#e8dfd0] flex flex-col justify-center items-center px-4">
      <div className="text-center w-full max-w-[600px] mx-auto">
        <div className="relative w-full h-[30vh] sm:h-[40vh] md:h-[50vh] lg:h-[60vh] mb-4">
          <Image
            src="/missingno.gif"
            alt="MissingNo Pokemon glitch"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="space-y-2 sm:space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center tracking-widest text-[#333] mb-2 animate-pulse shadow-text" 
              style={{ fontFamily: 'var(--font-doto)' }}>
            404
          </h1>
          <p className="text-[#333] text-base sm:text-lg mt-2 opacity-80" 
             style={{ fontFamily: 'var(--font-doto)' }}>
            This route doesn&apos;t exist in the Pokédex.
          </p>
        </div>
      </div>
    </div>
  );
}
