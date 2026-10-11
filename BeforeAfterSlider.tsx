import { useRef, useState, useCallback, useEffect } from 'react';

interface BeforeAfterSliderProps {
  src: string;
  alt?: string;
  initialPosition?: number;
}

export default function BeforeAfterSlider({
  src,
  alt = 'Before and after comparison',
  initialPosition = 50,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(initialPosition);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientY: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientY - rect.top) / rect.height) * 100;
    setPosition(Math.min(95, Math.max(5, pct)));
  }, []);

  /* Attach global mouse/touch listeners so dragging outside the container still works */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (dragging.current) updatePosition(e.clientY);
    };
    const onUp = () => { dragging.current = false; };
    const onTouchMove = (e: TouchEvent) => {
      if (dragging.current) {
        e.preventDefault();
        updatePosition(e.touches[0].clientY);
      }
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [updatePosition]);

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragging.current = true;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl overflow-hidden shadow-xl select-none"
      style={{ aspectRatio: '4 / 3', cursor: 'ns-resize' }}
    >
      {/* ── AFTER — full image, bottom-anchored ── */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ objectPosition: 'center bottom' }}
        draggable={false}
      />

      {/* ── BEFORE — same image, top-anchored, clipped to slider position ── */}
      <div
        className="absolute inset-x-0 top-0 overflow-hidden pointer-events-none"
        style={{ height: `${position}%` }}
      >
        <img
          src={src}
          alt=""
          className="absolute top-0 left-0 w-full pointer-events-none"
          style={{
            height: `${containerRef.current?.getBoundingClientRect().height ?? 400}px`,
            objectFit: 'cover',
            objectPosition: 'center top',
          }}
          draggable={false}
        />
      </div>

      {/* ── BEFORE label ── */}
      <div
        className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold z-20 pointer-events-none"
        style={{ background: 'hsl(var(--foreground))', color: 'hsl(var(--background))' }}
      >
        BEFORE
      </div>

      {/* ── AFTER label ── */}
      <div
        className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-bold z-20 pointer-events-none"
        style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--nav-bg))' }}
      >
        AFTER
      </div>

      {/* ── Divider line + handle ── */}
      <div
        className="absolute inset-x-0 z-30 flex flex-col items-center"
        style={{ top: `${position}%`, transform: 'translateY(-50%)', pointerEvents: 'none' }}
      >
        {/* Line */}
        <div className="w-full h-0.5" style={{ background: 'hsl(var(--primary))' }} />

        {/* Handle */}
        <div
          className="flex items-center justify-center rounded-full shadow-lg border-2 cursor-ns-resize"
          style={{
            width: 48,
            height: 48,
            background: 'hsl(var(--primary))',
            borderColor: 'hsl(var(--foreground))',
            marginTop: -24,
            pointerEvents: 'auto',
            touchAction: 'none',
          }}
          onMouseDown={startDrag}
          onTouchStart={startDrag}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M11 2L7 7h8L11 2z" fill="hsl(var(--foreground))" />
            <path d="M11 20l4-5H7l4 5z" fill="hsl(var(--foreground))" />
            <line x1="11" y1="7" x2="11" y2="15" stroke="hsl(var(--foreground))" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}
