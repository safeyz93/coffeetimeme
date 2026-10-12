import React, { useState } from 'react';

const CHROME_STORE_URL =
  'https://chromewebstore.google.com/detail/coffee-time/djekodpjcikodhoplmegjflogbkhkehk';

const WALLET_ADDRESS = 'DnEkiNhstiwfMaqFUHi4bAbSwPNHk28hTLUZGYw2pump';

export default function App() {
  const [copied, setCopied] = useState(false);
  const [isCursorHovered, setIsCursorHovered] = useState(false);

  const handleCopyWallet = async () => {
    try {
      await navigator.clipboard.writeText(WALLET_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <main
      className="relative h-screen min-h-[100dvh] w-full overflow-hidden flex flex-col justify-between text-[#eeede9] select-none"
      style={{ backgroundColor: '#111113', fontFamily: 'var(--font-geist)' }}
    >
      {/* Ambient Radial Glowing Orbs */}
      <div
        className="absolute -top-[10%] -left-[10%] w-[45vw] h-[45vw] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(255, 107, 53, 0.12) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute -bottom-[10%] -right-[10%] w-[45vw] h-[45vw] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(255, 107, 53, 0.09) 0%, transparent 70%)',
        }}
      />

      {/* Subtle Cafe Photographic Underlayer */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <img
          src="/coffee-bg.jpg"
          alt="Atmospheric cafe scene"
          className="w-full h-full object-cover object-center filter grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#111113] via-transparent to-[#111113]" />
      </div>

      {/* Architectural Grid Lines */}
      <div className="grid-bg absolute inset-0 pointer-events-none z-[1]" />

      {/* Nav / Top Bar */}
      <nav className="relative z-10 w-full px-6 sm:px-10 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#eeede9]/10">
        <div className="flex items-center gap-3">
          <img
            src="/icon128.png"
            alt="Coffee Time"
            className="w-7 h-7 object-contain drop-shadow"
          />
          <span
            style={{ fontFamily: 'var(--font-syne)' }}
            className="text-base sm:text-lg font-bold tracking-[0.1em] uppercase text-[#eeede9]"
          >
            Coffee Time
          </span>
          <span
            style={{ fontFamily: 'var(--font-mono)' }}
            className="text-[10px] text-[#ff6b35] tracking-wider uppercase bg-[#ff6b35]/10 px-2 py-0.5 rounded border border-[#ff6b35]/20 font-medium"
          >
            STABLE_REL.3.3.1
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div
            onClick={handleCopyWallet}
            style={{ fontFamily: 'var(--font-mono)' }}
            className="group flex items-center gap-2 text-xs bg-white/[0.05] hover:bg-white/[0.08] px-3 py-1.5 rounded-lg text-[#eeede9]/80 hover:text-[#eeede9] border border-white/5 transition-all cursor-pointer select-all"
            title="Click to copy"
          >
            <span>DnEkiNhstiwfMaqFUHi4bAbSwPNHk28hTLUZGYw2pump</span>
            {copied ? (
              <span className="text-emerald-400 font-sans text-[11px] font-semibold flex items-center gap-0.5 shrink-0">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </span>
            ) : (
              <svg
                className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            )}
          </div>

          {/* Colored Telegram Icon Link */}
          <a
            href="https://t.me/coffetimefortrader"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center p-0.5 rounded-full hover:ring-2 hover:ring-[#24A1DE]/60 transition-all transform hover:scale-105 active:scale-95"
            title="Join Telegram: @coffetimefortrader"
            aria-label="Telegram Community"
          >
            <svg
              className="w-7 h-7 shrink-0 transition-transform duration-200 group-hover:rotate-6 drop-shadow"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="12" fill="#24A1DE" />
              <path
                d="M5.4 11.8l11.6-4.6c.5-.2 1 .2.8.7l-2 9.4c-.1.6-.7.8-1.2.5l-3.3-2.5-1.6 1.5c-.2.2-.4.3-.7.3l.2-3.5 6.4-5.8c.3-.3-.1-.4-.4-.2l-7.9 5-3.3-1c-.7-.2-.7-.8.1-1z"
                fill="#FFFFFF"
              />
            </svg>
          </a>
        </div>
      </nav>

      {/* Main Content Area */}
      <section className="relative z-10 w-full max-w-5xl mx-auto px-6 flex-1 flex flex-col justify-center items-center text-center my-auto py-6">
        {/* Category / Protocol Kicker */}
        <span
          style={{ fontFamily: 'var(--font-mono)' }}
          className="text-xs uppercase tracking-[0.2em] text-[#ff6b35] font-semibold mb-4 sm:mb-5"
        >
          Digital Fatigue Protocol
        </span>

        {/* Hero Title */}
        <h1
          style={{ fontFamily: 'var(--font-syne)' }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight leading-[1.04] text-[#eeede9] mb-5 sm:mb-6 max-w-4xl"
        >
          Gentle reminders to step away from your screen.
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-[#eeede9]/60 max-w-2xl font-light leading-relaxed mb-8 sm:mb-10 text-balance">
          Set a focus duration. When time is up, your browser smoothly dims the glare, softens the page, and turns your cursor into a barista—cueing you to rest and brew a cup.
        </p>

        {/* Primary CTA Button */}
        <div className="flex flex-col items-center gap-6 w-full">
          <a
            href={CHROME_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3.5 px-8 sm:px-11 py-4 sm:py-4.5 rounded-full bg-[#eeede9] text-[#111113] hover:bg-transparent hover:text-[#eeede9] border-2 border-transparent hover:border-[#eeede9] font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.99] shadow-[0_10px_30px_rgba(0,0,0,0.5)] focus:outline-none"
          >
            {/* 4-Color Google Chrome Logo */}
            <svg
              className="w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110"
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
              className="w-5 h-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7" />
            </svg>
          </a>

          {/* Interactive Barista Cursor Live Box */}
          <div
            onMouseEnter={() => setIsCursorHovered(true)}
            onMouseLeave={() => setIsCursorHovered(false)}
            className={`cursor-box barista-cursor mt-4 sm:mt-6 px-6 py-4 border border-dashed rounded-2xl w-full max-w-md flex items-center justify-center gap-3 transition-all duration-300 ${
              isCursorHovered
                ? 'border-[#ff6b35]/60 bg-white/[0.04] shadow-[0_0_20px_rgba(255,107,53,0.15)]'
                : 'border-[#eeede9]/15 bg-transparent hover:bg-white/[0.02]'
            }`}
          >
            <span
              style={{ fontFamily: 'var(--font-mono)' }}
              className={`text-[11px] uppercase tracking-[0.2em] transition-colors ${
                isCursorHovered ? 'text-[#ff6b35] font-semibold' : 'text-[#eeede9]/60'
              }`}
            >
              {isCursorHovered ? 'Barista Cursor Engaged' : 'Live Test: Barista Cursor Active'}
            </span>
            <img
              src="/cursor.png"
              alt="Barista Cursor"
              className={`w-4 h-4 object-contain transition-transform duration-300 ${
                isCursorHovered ? 'scale-125 rotate-12' : 'opacity-80'
              }`}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 w-full px-6 sm:px-10 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#eeede9]/10">
        {/* Wallet Address with One-Click Copy */}
        <div
          onClick={handleCopyWallet}
          style={{ fontFamily: 'var(--font-mono)' }}
          className="group flex items-center gap-2.5 text-xs bg-white/[0.05] hover:bg-white/[0.08] px-3.5 py-1.5 rounded-md text-[#eeede9]/70 hover:text-[#eeede9] border border-white/5 transition-all cursor-pointer select-all"
          title="Click to copy wallet address"
        >
          <span>{WALLET_ADDRESS}</span>
          {copied ? (
            <span className="text-emerald-400 font-sans text-[11px] font-semibold flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </span>
          ) : (
            <svg
              className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          )}
        </div>

        {/* Compatibility metadata */}
        <div
          style={{ fontFamily: 'var(--font-mono)' }}
          className="text-[11px] uppercase tracking-[0.2em] text-[#eeede9]/50 font-medium"
        >
          Works on Chrome, Edge, Brave &amp; Opera
        </div>
      </footer>
    </main>
  );
}
