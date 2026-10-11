/**
 * WaterFlow — decorative animated flowing water strip.
 * direction="down"  → water flows away from the header downward
 * direction="up"    → water flows up into the footer
 * Uses layered SVG sine-wave paths + foam particles + shimmer highlights.
 */

interface WaterStreamsProps {
  direction?: 'down' | 'up';
  /** Height of the strip in px */
  height?: number;
  className?: string;
}

// Foam / bubble particles
const BUBBLES = [
  { x: '5%',   delay: '0s',    dur: '2.4s', r: 3 },
  { x: '13%',  delay: '0.6s',  dur: '2.0s', r: 2 },
  { x: '22%',  delay: '1.1s',  dur: '2.7s', r: 2.5 },
  { x: '31%',  delay: '0.3s',  dur: '1.9s', r: 1.5 },
  { x: '40%',  delay: '0.9s',  dur: '2.3s', r: 3 },
  { x: '50%',  delay: '0.15s', dur: '2.1s', r: 2 },
  { x: '59%',  delay: '1.3s',  dur: '2.5s', r: 2.5 },
  { x: '68%',  delay: '0.5s',  dur: '1.8s', r: 1.5 },
  { x: '77%',  delay: '0.75s', dur: '2.2s', r: 3 },
  { x: '86%',  delay: '0.4s',  dur: '2.0s', r: 2 },
  { x: '94%',  delay: '1.0s',  dur: '2.6s', r: 2.5 },
];

// Shimmer streaks (horizontal light glints on the water surface)
const SHIMMERS = [
  { y: 28, delay: '0s',   dur: '3.2s', width: 180, opacity: 0.18 },
  { y: 44, delay: '1.1s', dur: '4.0s', width: 240, opacity: 0.12 },
  { y: 18, delay: '2.0s', dur: '3.6s', width: 140, opacity: 0.15 },
  { y: 56, delay: '0.7s', dur: '4.4s', width: 200, opacity: 0.10 },
];

// Wave layer config — fill is a CSS-variable key, resolved at render
type WaveColor = 'accent' | 'water-light' | 'primary';

interface WaveLayer {
  amp: number;
  freq: number;
  yFrac: number;
  phase: number;
  fill: WaveColor;
  opacity: number;
  dur: string;
  rev: boolean;
}

const DOWN_WAVES: WaveLayer[] = [
  { amp: 10, freq: 2.5, yFrac: 0.25, phase: 0,   fill: 'accent',       opacity: 0.12, dur: '7s',   rev: false },
  { amp: 8,  freq: 3.0, yFrac: 0.38, phase: 1.2, fill: 'accent',       opacity: 0.18, dur: '5.5s', rev: true  },
  { amp: 7,  freq: 2.0, yFrac: 0.52, phase: 0.6, fill: 'water-light',  opacity: 0.22, dur: '6.5s', rev: false },
  { amp: 6,  freq: 3.5, yFrac: 0.65, phase: 2.0, fill: 'accent',       opacity: 0.30, dur: '4.8s', rev: true  },
  { amp: 5,  freq: 2.8, yFrac: 0.78, phase: 0.9, fill: 'primary',      opacity: 0.10, dur: '5.2s', rev: false },
  { amp: 4,  freq: 4.0, yFrac: 0.88, phase: 1.5, fill: 'accent',       opacity: 0.40, dur: '4.2s', rev: true  },
];

const UP_WAVES: WaveLayer[] = [
  { amp: 10, freq: 2.5, yFrac: 0.75, phase: 0,   fill: 'accent',       opacity: 0.12, dur: '7s',   rev: true  },
  { amp: 8,  freq: 3.0, yFrac: 0.62, phase: 1.2, fill: 'accent',       opacity: 0.18, dur: '5.5s', rev: false },
  { amp: 7,  freq: 2.0, yFrac: 0.48, phase: 0.6, fill: 'water-light',  opacity: 0.22, dur: '6.5s', rev: true  },
  { amp: 6,  freq: 3.5, yFrac: 0.35, phase: 2.0, fill: 'accent',       opacity: 0.30, dur: '4.8s', rev: false },
  { amp: 5,  freq: 2.8, yFrac: 0.22, phase: 0.9, fill: 'primary',      opacity: 0.10, dur: '5.2s', rev: true  },
  { amp: 4,  freq: 4.0, yFrac: 0.12, phase: 1.5, fill: 'accent',       opacity: 0.40, dur: '4.2s', rev: false },
];

function wavePath(amp: number, freq: number, yBase: number, phase: number, height: number, isDown: boolean): string {
  const pts: string[] = [];
  const steps = 48;
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * 2400;
    const y = yBase + amp * Math.sin((i / steps) * freq * Math.PI * 2 + phase);
    pts.push(i === 0 ? `M${x.toFixed(1)},${y.toFixed(1)}` : `L${x.toFixed(1)},${y.toFixed(1)}`);
  }
  if (isDown) {
    pts.push(`L2400,${height} L0,${height} Z`);
  } else {
    pts.push(`L2400,0 L0,0 Z`);
  }
  return pts.join(' ');
}

export default function WaterStreams({ direction = 'down', height = 88, className = '' }: WaterStreamsProps) {
  const isDown = direction === 'down';
  const bubbleAnim = isDown ? 'bubble-fall' : 'bubble-rise';
  const waves = isDown ? DOWN_WAVES : UP_WAVES;

  return (
    <div
      className={`relative w-full overflow-hidden pointer-events-none select-none ${className}`}
      style={{ height }}
      aria-hidden="true"
    >
      {/* Gradient fade at the edge that meets the section */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: isDown
            ? 'linear-gradient(to bottom, hsl(var(--nav-bg) / 0.55) 0%, transparent 100%)'
            : 'linear-gradient(to top, hsl(var(--nav-bg) / 0.55) 0%, transparent 100%)',
        }}
      />

      {/* Animated wave SVG */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 1200 ${height}`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Soft glow filter for the foam crest */}
          <filter id="wf-glow" x="-10%" y="-40%" width="120%" height="180%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          {/* Shimmer gradient */}
          <linearGradient id="wf-shimmer" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="white" stopOpacity="0" />
            <stop offset="40%"  stopColor="white" stopOpacity="1" />
            <stop offset="60%"  stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Wave layers */}
        {waves.map((w, i) => {
          const anim = w.rev ? 'wave-drift-rev' : 'wave-drift';
          const yBase = w.yFrac * height;
          const d = wavePath(w.amp, w.freq, yBase, w.phase, height, isDown);
          return (
            <path
              key={`wave-${i}`}
              d={d}
              fill={`hsl(var(--${w.fill}))`}
              opacity={w.opacity}
              filter={i >= waves.length - 2 ? 'url(#wf-glow)' : undefined}
              style={{ animation: `${anim} ${w.dur} linear infinite` }}
            />
          );
        })}

        {/* Shimmer highlights */}
        {SHIMMERS.map((s, i) => (
          <rect
            key={`shimmer-${i}`}
            x={0}
            y={s.y * (height / 88)}
            width={s.width}
            height={3}
            rx={1.5}
            fill="url(#wf-shimmer)"
            opacity={s.opacity}
            style={{
              animation: `shimmer-x ${s.dur} ease-in-out infinite`,
              animationDelay: s.delay,
            }}
          />
        ))}

        {/* Foam bubbles */}
        {BUBBLES.map((b, i) => {
          const cx = parseFloat(b.x) / 100 * 1200;
          const cy = isDown ? height * 0.15 : height * 0.85;
          return (
            <circle
              key={`bubble-${i}`}
              cx={cx}
              cy={cy}
              r={b.r}
              fill="white"
              opacity={0.65}
              style={{
                animation: `${bubbleAnim} ${b.dur} ease-in infinite`,
                animationDelay: b.delay,
              }}
            />
          );
        })}

        {/* Foam crest line */}
        <path
          d={wavePath(5, 4.5, isDown ? height * 0.08 : height * 0.92, 0.3, height, isDown)}
          fill="none"
          stroke="white"
          strokeWidth={1.2}
          strokeOpacity={0.3}
          style={{ animation: 'wave-drift 3.8s linear infinite' }}
        />
      </svg>
    </div>
  );
}
