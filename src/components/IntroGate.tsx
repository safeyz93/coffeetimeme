import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Full-bleed intro curtain.
 *
 * The clip covers the whole viewport and a single "Enter" button sits dead
 * centre. Deliberately nothing else on screen — no wordmark, no copy, no
 * progress readout.
 *
 * Note: the clip carries no audio track, so the element stays muted.
 */

/** Keep in sync with the transition classes on the curtain below. */
const EXIT_MS = 620;

/** If autoplay is refused, stop waiting and light the CTA up anyway. */
const AUTOPLAY_GRACE_MS = 4000;

/**
 * The source clip is 5s; playing it at 0.65x stretches the intro to ~7.7s,
 * which lands inside the 7-10s window asked for. Set to 1 to play at speed.
 */
const PLAYBACK_RATE = 0.65;

interface IntroGateProps {
  onEnter: () => void;
}

export default function IntroGate({ onEnter }: IntroGateProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const leavingRef = useRef(false);

  const [isReady, setIsReady] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const handleEnter = useCallback(() => {
    if (leavingRef.current) return;
    leavingRef.current = true;
    setLeaving(true);
    window.setTimeout(onEnter, EXIT_MS);
  }, [onEnter]);

  // Hold the page still while the curtain is up.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  // Reduced motion: do not autoplay at all, just show the poster frame.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReducedMotion(true);
      setIsReady(true);
    }
  }, []);

  // Autoplay can be refused (or the clip can stall). Never leave the visitor
  // staring at a dim button wondering whether the page is broken.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (videoRef.current?.paused) setIsReady(true);
    }, AUTOPLAY_GRACE_MS);
    return () => window.clearTimeout(timer);
  }, []);

  // Enter anywhere on the curtain confirms entry.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Enter') return;
      event.preventDefault();
      handleEnter();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleEnter]);

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = PLAYBACK_RATE;
  };

  // A failing <source> bubbles its error event up to the <video>. Only once
  // every source is exhausted does the media element itself carry an error, so
  // that is what tells a real failure apart from ordinary fallback negotiation.
  const handleError = () => {
    if (videoRef.current?.error) setIsReady(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Coffee Time intro"
      className={`fixed inset-0 z-100 overflow-hidden bg-brand-bg transition-all duration-620 ease-brand ${
        leaving ? 'pointer-events-none scale-105 opacity-0' : 'scale-100 opacity-100'
      }`}
    >
      <video
        ref={videoRef}
        poster="/golden-retriever-bg.jpg"
        autoPlay={!reducedMotion}
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsReady(true)}
        onError={handleError}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/intro.webm" type="video/webm" />
      </video>

      {/* Brand-tinted scrim, so the CTA stays legible over any frame */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(11,35,49,0.50) 0%, rgba(11,35,49,0.25) 45%, rgba(11,35,49,0.72) 100%)',
        }}
      />

      {/* The one and only control */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <button
          type="button"
          onClick={handleEnter}
          className={`inline-flex items-center gap-3 rounded-brand-lg border-2 px-9 py-4 text-base font-bold uppercase tracking-widest transition-all duration-500 focus:outline-none sm:text-lg ${
            isReady
              ? 'intro-cta-ready border-brand-peach bg-brand-peach text-brand-bg hover:scale-105'
              : 'border-white/60 bg-brand-bg/65 text-white backdrop-blur-md hover:border-brand-peach hover:text-brand-peach'
          }`}
        >
          Enter
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
