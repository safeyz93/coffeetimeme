import React, { useRef, useEffect, useState, useCallback } from 'react';

interface ScratchCardProps {
  secretText: string;
}

export default function ScratchCard({ secretText }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const isDrawingRef = useRef(false);

  // Initialize metallic brushed aluminum foil on canvas
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use actual rendered container dimensions (with fallback)
    const rect = container.getBoundingClientRect();
    const width = Math.max(Math.round(rect.width), 440);
    const height = Math.max(Math.round(rect.height), 46);

    canvas.width = width;
    canvas.height = height;

    ctx.globalCompositeOperation = 'source-over';

    // Metallic brushed aluminum gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#94a3b8');
    grad.addColorStop(0.12, '#f8fafc');
    grad.addColorStop(0.25, '#64748b');
    grad.addColorStop(0.5, '#ffffff');
    grad.addColorStop(0.7, '#94a3b8');
    grad.addColorStop(0.85, '#e2e8f0');
    grad.addColorStop(1, '#64748b');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Fine brushed aluminum grain texture lines
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    for (let i = 0; i < height; i += 2) {
      ctx.fillRect(0, i, width, 1);
    }

    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    for (let i = 1; i < height; i += 3) {
      ctx.fillRect(0, i, width, 1);
    }

    // Border embossing on foil
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(1, 1, width - 2, height - 2);

    // Embossed text on foil: "✦ SCRATCH TO REVEAL ✦"
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 11px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.letterSpacing = '2px';
    ctx.fillText('✦ SCRATCH TO REVEAL ✦', width / 2, height / 2);
  }, []);

  useEffect(() => {
    // Small timeout ensures container layout is computed
    const t = setTimeout(() => {
      initCanvas();
    }, 50);

    const handleResize = () => {
      if (!isRevealed) {
        initCanvas();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', handleResize);
    };
  }, [initCanvas, isRevealed]);

  // Check how much percentage of the foil has been scratched
  const checkScratchPercentage = useCallback(() => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      let clearPixels = 0;
      const totalPixels = data.length / 4;

      // Sample every 4th pixel for performance
      for (let i = 3; i < data.length; i += 16) {
        if (data[i] < 128) {
          clearPixels++;
        }
      }

      const sampleTotal = totalPixels / 4;
      const ratio = clearPixels / sampleTotal;

      if (ratio > 0.35) {
        setIsRevealed(true);
      }
    } catch {
      // Ignore context errors
    }
  }, [isRevealed]);

  // Scratch action at (x, y)
  const scratch = (clientX: number, clientY: number) => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    checkScratchPercentage();
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = true;
    setIsScratching(true);
    scratch(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    scratch(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    isDrawingRef.current = false;
    setIsScratching(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(secretText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-between gap-3 select-none overflow-hidden rounded-xl transition-all duration-300 min-w-[340px] sm:min-w-[460px] h-[48px] px-4 shrink-0 shadow-lg ${
        isRevealed
          ? 'bg-stone-900/95 border border-stone-600/80 shadow-[0_0_24px_rgba(255,255,255,0.12)]'
          : 'bg-stone-900/90 border border-stone-700/80'
      }`}
      title={isRevealed ? 'Click to copy text' : 'Scratch with cursor to reveal'}
    >
      {/* IN-FLOW CONTENT: Guarantees full width and height, never collapses */}
      <span
        onClick={handleCopy}
        className="font-mono text-xs sm:text-[13px] font-bold text-white tracking-normal select-all whitespace-nowrap cursor-pointer hover:text-amber-200 transition-colors z-0"
        title="Click to copy full text"
      >
        {secretText}
      </span>

      {/* Copy button (icon only, always in-flow and fully visible) */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleCopy();
        }}
        className="shrink-0 p-1.5 rounded-lg text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer focus:outline-none z-0"
        title={copied ? 'Copied!' : 'Copy to clipboard'}
        aria-label="Copy code"
      >
        {copied ? (
          <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        )}
      </button>

      {/* Silver Aluminum Foil Scratch Layer Canvas on Top */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className={`absolute inset-0 z-10 w-full h-full rounded-xl transition-opacity duration-700 touch-none ${
          isRevealed
            ? 'opacity-0 pointer-events-none'
            : isScratching
            ? 'cursor-grabbing'
            : 'cursor-grab'
        }`}
      />
    </div>
  );
}
