import { useState } from 'react';

const CHROME_STORE_URL =
  'https://chromewebstore.google.com/detail/coffee-time/djekodpjcikodhoplmegjflogbkhkehk';

const WALLET_ADDRESS = 'DnEkiNhstiwfMaqFUHi4bAbSwPNHk28hTLUZGYw2pump';

const TELEGRAM_URL = 'https://t.me/coffetimefortrader';

const HOW_STEPS = [
  {
    step: '01',
    title: 'Pick a limit',
    body: 'Open the popup and choose 1, 3 or 6 hours. The moment you set it, Coffee Time starts counting.',
  },
  {
    step: '02',
    title: 'Work as usual',
    body: 'The timer shows what is left, how long you have already been at it, and a progress bar that heats up as you approach the limit.',
  },
  {
    step: '03',
    title: 'Rest when it is time',
    body: 'Past your limit, pages dim and blur, the tab title blinks, and your cursor turns into a barista. One click resets everything.',
  },
];

const FAQ_ITEMS = [
  {
    q: 'Is Coffee Time free?',
    a: 'Yes — completely. No account, no sign-up, no upsell. Install it from the Chrome Web Store and it works straight away.',
  },
  {
    q: 'Which browsers does it support?',
    a: 'Chrome, and any Chromium browser that accepts Chrome Web Store extensions: Edge, Brave and Opera.',
  },
  {
    q: 'Does it read my data or send anything to a server?',
    a: 'No. Coffee Time only keeps a local timer. It never reads page content, never tracks your browsing, and never phones home.',
  },
  {
    q: 'Will it dim every tab I have open?',
    a: 'No — only the page you are actually looking at. Background tabs are left alone; the active one dims, blurs and blinks its title.',
  },
  {
    q: 'How do I pause it or turn it off?',
    a: 'Flip the Reminder switch off inside the popup. It stays off until you turn it back on or restart Chrome. Reset zeroes the timer at any time.',
  },
  {
    q: 'I found a bug or have an idea.',
    a: 'Drop a note in the Telegram group — it is linked in the footer below.',
  },
];

export default function App() {
  const [copied, setCopied] = useState(false);
  const [isCursorHovered, setIsCursorHovered] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleCopyWallet = async () => {
    try {
      await navigator.clipboard.writeText(WALLET_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — the address stays selectable as a fallback.
    }
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden text-brand-text"
      style={{ backgroundColor: 'var(--color-brand-bg)', fontFamily: 'var(--font-geist)' }}
    >
      {/* ===== Ambient background — fixed, so it holds still while the page scrolls ===== */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute left-[-10%] top-[-15%] h-[55vw] w-[55vw] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(217, 155, 127, 0.13) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-[-15%] right-[-10%] h-[55vw] w-[55vw] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(165, 111, 99, 0.10) 0%, transparent 70%)',
          }}
        />
        <img
          src="/coffee-bg.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-[0.13] grayscale contrast-125"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(11,35,49,0.92) 0%, rgba(11,35,49,0.70) 40%, rgba(11,35,49,0.97) 100%)',
          }}
        />
        <div className="grid-bg absolute inset-0" />
      </div>

      {/* ===== Nav / Top Bar ===== */}
      <nav className="sticky top-0 z-50 w-full border-b border-brand-line-soft bg-brand-bg/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
          <a href="#top" className="flex shrink-0 items-center gap-2.5">
            <img src="/icon128.png" alt="Coffee Time" className="h-7 w-7 object-contain" />
            <span className="font-syne text-base font-bold uppercase tracking-widest text-brand-text">
              Coffee Time
            </span>
            <span className="hidden rounded border border-brand-peach/25 bg-brand-peach/10 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-brand-peach sm:inline-flex">
              v3.4.0
            </span>
          </a>

          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href="#how"
              className="hidden text-sm font-medium text-brand-muted transition-colors hover:text-brand-text md:inline-flex"
            >
              How it works
            </a>
            <a
              href="#faq"
              className="hidden text-sm font-medium text-brand-muted transition-colors hover:text-brand-text md:inline-flex"
            >
              FAQ
            </a>

            {/* Wallet chip — click to copy */}
            <div
              onClick={handleCopyWallet}
              title="Click to copy"
              className="group hidden cursor-pointer items-center gap-2 rounded-brand border border-brand-line-soft bg-brand-panel px-3 py-1.5 font-mono text-xs text-brand-muted transition-colors select-all hover:border-brand-line-hover hover:text-brand-text lg:flex"
            >
              <span>{WALLET_ADDRESS}</span>
              {copied ? (
                <span className="flex shrink-0 items-center gap-0.5 font-sans text-[11px] font-semibold text-brand-peach">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </span>
              ) : (
                <svg
                  className="h-3.5 w-3.5 shrink-0 opacity-50 transition-opacity group-hover:opacity-100"
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

            {/* Telegram — brand glyph kept in its official colour so it stays recognisable */}
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex shrink-0 items-center justify-center rounded-full p-0.5 transition-all hover:ring-2 hover:ring-brand-peach/60 active:scale-95"
              title="Join Telegram: @coffetimefortrader"
              aria-label="Telegram community"
            >
              <svg
                className="h-7 w-7 shrink-0 transition-transform duration-200 hover:rotate-6"
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

            <a
              href={CHROME_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-brand-lg border-2 border-brand-peach bg-brand-peach px-4 py-2 text-sm font-bold text-brand-bg transition-all duration-300 hover:bg-transparent hover:text-brand-peach active:scale-[0.98] sm:inline-flex"
            >
              Add to Chrome
            </a>
          </div>
        </div>
      </nav>

      <main id="top" className="relative z-10">
        {/* ===== Hero ===== */}
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pb-28 lg:pt-24">
          <div className="flex flex-col items-start">
            <span className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand-peach">
              Digital Fatigue Protocol
            </span>

            <h1 className="font-syne text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-brand-text sm:text-5xl xl:text-6xl">
              Gentle reminders to step away from your screen.
            </h1>

            <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-brand-muted text-balance sm:text-lg">
              Set a focus duration. When time is up, your browser smoothly dims the glare, softens the
              page, and turns your cursor into a barista—cueing you to rest and brew a cup.
            </p>

            <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href={CHROME_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-brand-lg border-2 border-brand-peach bg-brand-peach px-6 py-3.5 text-base font-bold text-brand-bg shadow-[0_12px_34px_-12px_rgba(217,155,127,0.55)] transition-all duration-300 hover:bg-transparent hover:text-brand-peach active:scale-[0.99] focus:outline-none sm:text-lg"
              >
                {/* Official 4-colour Chrome logo — kept accurate on purpose */}
                <svg
                  className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110"
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
                  className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7" />
                </svg>
              </a>

              <a
                href="#how"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-brand-lg border border-brand-line-soft px-6 py-3.5 text-base font-semibold text-brand-muted transition-colors hover:border-brand-peach hover:text-brand-text"
              >
                See how it works
              </a>
            </div>

            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-brand-faint">
              Free · No account · Works offline
            </p>

            {/* Live barista-cursor test — the product's signature move */}
            <div
              onMouseEnter={() => setIsCursorHovered(true)}
              onMouseLeave={() => setIsCursorHovered(false)}
              className={`barista-cursor mt-8 flex w-full max-w-md items-center justify-center gap-3 rounded-brand-lg border border-dashed px-6 py-4 transition-all duration-300 ${
                isCursorHovered
                  ? 'border-brand-peach/60 bg-brand-peach/6 shadow-[0_0_22px_rgba(217,155,127,0.18)]'
                  : 'border-brand-line-soft bg-transparent hover:bg-brand-panel/40'
              }`}
            >
              <span
                className={`font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${
                  isCursorHovered ? 'font-semibold text-brand-peach' : 'text-brand-muted'
                }`}
              >
                {isCursorHovered ? 'Barista Cursor Engaged' : 'Live Test: Barista Cursor Active'}
              </span>
              <img
                src="/cursor.png"
                alt="Barista cursor"
                className={`h-4 w-4 object-contain transition-transform duration-300 ${
                  isCursorHovered ? 'rotate-12 scale-125' : 'opacity-80'
                }`}
              />
            </div>
          </div>

          {/* Hero visual — the dimmed-page overlay, straight from the extension */}
          <div className="relative w-full">
            <div className="rounded-brand-lg border border-brand-line-soft bg-brand-panel p-2 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.85)]">
              <div className="flex items-center gap-1.5 px-2 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-slate" />
                <span className="h-2.5 w-2.5 rounded-full bg-brand-terracotta" />
                <span className="h-2.5 w-2.5 rounded-full bg-brand-peach" />
                <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.16em] text-brand-faint">
                  past your limit
                </span>
              </div>
              <img
                src="/demo-overlay.png"
                alt="A webpage dimmed and blurred by Coffee Time after the focus limit is reached"
                className="w-full rounded-brand"
              />
            </div>
            <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-brand-faint">
              Every page dims, blurs &amp; blinks its tab title
            </p>
          </div>
        </section>

        {/* ===== How it works ===== */}
        <section
          id="how"
          className="scroll-mt-24 border-t border-brand-line-soft px-5 py-20 sm:px-8 lg:py-28"
        >
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand-peach">
                How it works
              </span>
              <h2 className="mt-4 font-syne text-3xl font-extrabold uppercase leading-tight tracking-tight text-brand-text sm:text-4xl">
                Three steps to a saner trading day
              </h2>
              <p className="mt-4 text-base font-light leading-relaxed text-brand-muted">
                No dashboards, no streak guilt. One small timer keeps an eye on the clock so you do not
                have to.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {HOW_STEPS.map((item) => (
                <div
                  key={item.step}
                  className="rounded-brand-lg border border-brand-line-soft bg-brand-panel p-6 transition-colors hover:border-brand-line-hover"
                >
                  <span className="font-mono text-xs font-semibold tracking-[0.15em] text-brand-peach">
                    {item.step}
                  </span>
                  <h3 className="mt-3 font-syne text-lg font-bold uppercase tracking-wide text-brand-text">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm font-light leading-relaxed text-brand-muted">{item.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <div className="overflow-hidden rounded-brand-lg border border-brand-line-soft bg-brand-panel p-2">
                <img
                  src="/demo-popup.png"
                  alt="The Coffee Time popup in its three states: running normally, limit reached, and paused"
                  className="w-full rounded-brand"
                />
              </div>
              <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-brand-faint">
                Running normally · Time to rest · Paused
              </p>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section
          id="faq"
          className="scroll-mt-24 border-t border-brand-line-soft px-5 py-20 sm:px-8 lg:py-28"
        >
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand-peach">
                FAQ
              </span>
              <h2 className="mt-4 font-syne text-3xl font-extrabold uppercase leading-tight tracking-tight text-brand-text sm:text-4xl">
                Questions, answered
              </h2>
            </div>

            <div className="mt-10 divide-y divide-brand-line-soft border-y border-brand-line-soft">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={item.q}>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    >
                      <span
                        className={`font-syne text-base font-bold uppercase tracking-wide transition-colors ${
                          isOpen ? 'text-brand-peach' : 'text-brand-text'
                        }`}
                      >
                        {item.q}
                      </span>
                      <svg
                        className={`h-5 w-5 shrink-0 text-brand-peach transition-transform duration-300 ${
                          isOpen ? 'rotate-45' : ''
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        aria-hidden="true"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-5 pr-8 text-sm font-light leading-relaxed text-brand-muted">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* ===== Footer ===== */}
      <footer className="relative z-10 border-t border-brand-line-soft px-5 py-14 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5">
                <img src="/icon128.png" alt="" aria-hidden="true" className="h-7 w-7 object-contain" />
                <span className="font-syne text-base font-bold uppercase tracking-widest text-brand-text">
                  Coffee Time
                </span>
              </div>
              <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-brand-muted">
                A tiny Chrome extension that nudges you away from the screen before the screen wins.
              </p>

              <div
                onClick={handleCopyWallet}
                title="Click to copy"
                className="group mt-5 inline-flex cursor-pointer items-center gap-2 rounded-brand border border-brand-line-soft bg-brand-panel px-3 py-2 font-mono text-xs text-brand-muted transition-colors select-all hover:border-brand-line-hover hover:text-brand-text"
              >
                <span>{WALLET_ADDRESS}</span>
                {copied ? (
                  <span className="flex shrink-0 items-center gap-0.5 font-sans text-[11px] font-semibold text-brand-peach">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </span>
                ) : (
                  <svg
                    className="h-3.5 w-3.5 shrink-0 opacity-50 transition-opacity group-hover:opacity-100"
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
            </div>

            <div>
              <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-faint">Product</h4>
              <ul className="mt-4 space-y-3 text-sm text-brand-muted">
                <li>
                  <a href="#how" className="transition-colors hover:text-brand-peach">
                    How it works
                  </a>
                </li>
                <li>
                  <a href="#faq" className="transition-colors hover:text-brand-peach">
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href={CHROME_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-brand-peach"
                  >
                    Chrome Web Store
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-faint">Community</h4>
              <ul className="mt-4 space-y-3 text-sm text-brand-muted">
                <li>
                  <a
                    href={TELEGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-brand-peach"
                  >
                    Telegram group
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-brand-line-soft pt-6 sm:flex-row">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-faint">
              Works on Chrome, Edge, Brave &amp; Opera
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-faint">
              © {new Date().getFullYear()} Coffee Time
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
