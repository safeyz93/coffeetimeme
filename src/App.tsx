import React, { useState } from 'react';
import ScratchCard from './components/ScratchCard.tsx';

const CHROME_STORE_URL =
  'https://chromewebstore.google.com/detail/coffee-time/djekodpjcikodhoplmegjflogbkhkehk';

export default function App() {
  const [isPreviewHovered, setIsPreviewHovered] = useState(false);

  return (
    <main className="relative h-screen min-h-[100dvh] w-full overflow-hidden flex flex-col justify-between text-stone-100 select-none">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="/coffee-bg.jpg"
          alt="Golden retriever in cozy coffee shop"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Soft atmospheric overlay with subtle vignette for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-950/45 to-stone-950/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(12,10,9,0.25)_0%,rgba(12,10,9,0.75)_85%)]" />
      </div>

      {/* Floating Ambient Warm Motes */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/5 w-64 h-64 rounded-full bg-amber-600/10 blur-3xl animate-mote-1" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-orange-700/10 blur-3xl animate-mote-2" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl animate-mote-3" />
      </div>

      {/* Top Navigation Bar (Single section, no extra buttons) */}
      <header className="relative z-10 w-full px-4 sm:px-8 md:px-12 py-5 md:py-7 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-stone-900/80 border border-stone-800/80 shadow-md p-1 flex items-center justify-center backdrop-blur-md">
            <img
              src="/icon128.png"
              alt="Coffee Time icon"
              className="w-7 h-7 object-contain"
            />
          </div>
          <span className="font-semibold text-stone-200 tracking-tight text-lg">
            Coffee Time
          </span>
          <span className="hidden sm:inline-block text-xs font-mono text-stone-300 bg-stone-800/60 px-2 py-0.5 rounded border border-stone-700/50">
            v3.3.1
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <ScratchCard secretText="cofezim4M95pADVk33tZkXJjdkAZjH3cyimL94d1BdP" />
        </div>
      </header>

      {/* Hero Core Content (Centered, 1 single Call-to-Action button) */}
      <section className="relative z-10 w-full max-w-4xl mx-auto px-6 flex-1 flex flex-col items-center justify-center text-center my-auto">
        {/* Main Product Icon with gentle aura */}
        <div className="relative mb-6 group">
          <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-600/20 rounded-full blur-xl animate-warm-pulse pointer-events-none" />
          <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-3xl p-3 bg-gradient-to-b from-stone-800/80 to-stone-900/90 border border-amber-500/20 shadow-[0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur-md flex items-center justify-center transition-transform duration-500 hover:scale-105">
            <img
              src="/icon128.png"
              alt="Coffee Time Logo"
              className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>

        {/* Headline */}
        <h1
          style={{ fontFamily: 'var(--font-display)' }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold sm:font-black text-stone-100 tracking-tight leading-[1.08] mb-5 max-w-3xl drop-shadow-sm"
        >
          Gentle reminders to step away from your screen.
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-stone-300 max-w-2xl font-normal leading-relaxed mb-8 md:mb-10 text-balance">
          Set a focus duration. When time is up, your browser smoothly dims the glare, softens the page, and turns your cursor into a barista—cueing you to rest and brew a cup.
        </p>

        {/* THE ONLY BUTTON ON THE ENTIRE PAGE */}
        <div className="flex flex-col items-center gap-4 w-full">
          <a
            href={CHROME_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-3.5 px-8 sm:px-10 py-4 sm:py-4.5 rounded-2xl bg-white hover:bg-stone-50 text-stone-900 font-semibold text-base sm:text-lg shadow-[0_14px_38px_-4px_rgba(255,255,255,0.22),0_0_0_1px_rgba(255,255,255,0.8)_inset] hover:shadow-[0_18px_48px_-4px_rgba(255,255,255,0.32),0_0_0_1px_rgba(255,255,255,1)_inset] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/40"
          >
            {/* Official 4-Color Google Chrome Icon */}
            <svg
              className="w-6 h-6 shrink-0 transition-transform duration-300 group-hover:scale-110 drop-shadow-xs"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0z"
                fill="#EA4335"
              />
              <path
                d="M1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29z"
                fill="#34A853"
              />
              <path
                d="M15.273 7.636a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-5.344 9.257c.206.01.413.016.621.016 6.627 0 12-5.373 12-12 0-1.54-.29-3.011-.818-4.364z"
                fill="#FBBC05"
              />
              <circle cx="12" cy="12" r="5.4" fill="#FFFFFF" />
              <circle cx="12" cy="12" r="4.364" fill="#1A73E8" />
            </svg>

            <span>Add to Chrome — It&apos;s Free</span>

            <svg
              className="w-5 h-5 shrink-0 text-stone-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-stone-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>

        </div>

        {/* Interactive Subtle Preview Teaser (Hover effect, no button) */}
        <div
          onMouseEnter={() => setIsPreviewHovered(true)}
          onMouseLeave={() => setIsPreviewHovered(false)}
          className={`mt-8 sm:mt-10 px-5 py-3 rounded-xl border transition-all duration-500 max-w-md w-full ${
            isPreviewHovered
              ? 'bg-stone-950/90 border-amber-500/40 shadow-2xl backdrop-blur-md barista-cursor'
              : 'bg-stone-900/40 border-stone-800/60 backdrop-blur-sm'
          }`}
        >
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <img
                src="/cursor.png"
                alt="Barista Cursor"
                className={`w-4 h-4 object-contain transition-transform duration-300 ${
                  isPreviewHovered ? 'scale-125 rotate-6' : 'opacity-70'
                }`}
              />
              <span className={isPreviewHovered ? 'text-amber-300 font-medium' : 'text-stone-400'}>
                {isPreviewHovered ? 'Time to Rest! Cursor transformed.' : 'Hover here to test the barista cursor'}
              </span>
            </div>
            <span className="font-mono text-[11px] text-stone-400">
              {isPreviewHovered ? 'Break on' : 'Live Preview'}
            </span>
          </div>
        </div>
      </section>

      {/* Bottom Bar / Quiet Minimalist Footer (Single section, no buttons) */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto px-6 py-5 md:py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-400">
        <div>
          Crafted for deep thinkers &amp; coffee lovers.
        </div>
        <div className="flex items-center gap-2">
          <span>Works on Chrome, Edge, Brave &amp; Opera</span>
        </div>
      </footer>
    </main>
  );
}
