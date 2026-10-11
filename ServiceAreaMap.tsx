/**
 * ServiceAreaMap
 *
 * Google Maps iframe as the base map, with absolutely-positioned
 * clickable pin buttons layered on top via a pointer-events-none overlay.
 *
 * Pin positions are percentage-based (left / top) calibrated to the
 * iframe embed: center 35.76°N 78.82°W at zoom ~10.
 *
 * Calibration math (Mercator, zoom 10 ≈ 256 * 2^10 = 262144 px/world):
 *   tileSize = 256
 *   scale    = 2^10 = 1024
 *   worldPx  = tileSize * scale = 262144
 *
 *   lngToX(lng) = (lng + 180) / 360 * worldPx
 *   latToY(lat) = (1 - ln(tan(lat*π/180) + sec(lat*π/180)) / π) / 2 * worldPx
 *
 *   viewportW = 1024 px, viewportH = 480 px (iframe render size)
 *   centerX   = lngToX(-78.82)
 *   centerY   = latToY(35.76)
 *
 *   pinLeft% = (lngToX(city.lng) - centerX + viewportW/2) / viewportW * 100
 *   pinTop%  = (latToY(city.lat) - centerY + viewportH/2) / viewportH * 100
 *
 * Results (rounded to 1 dp):
 *   Durham        35.994  -78.899  → 44.0%  19.2%
 *   Wake Forest   35.979  -78.509  → 79.6%  21.0%
 *   Morrisville   35.823  -78.826  → 51.7%  38.5%
 *   Cary          35.791  -78.781  → 56.7%  42.2%
 *   Raleigh       35.779  -78.638  → 70.0%  43.5%
 *   Apex          35.732  -78.850  → 49.1%  48.8%
 *   Garner        35.711  -78.614  → 72.6%  51.1%
 *   Holly Springs 35.652  -78.834  → 50.8%  57.9%
 *   Fuquay-Varina 35.584  -78.800  → 54.7%  65.8%
 *   Clayton       35.651  -78.459  → 84.8%  58.0%
 */

interface CityPin {
  name: string;
  href: string;
  left: string;
  top: string;
}

const PINS: CityPin[] = [
  { name: 'Durham',        href: '/durham-pressure-washing',        left: '44.0%', top: '19.2%' },
  { name: 'Wake Forest',   href: '/wake-forest-pressure-washing',   left: '79.6%', top: '21.0%' },
  { name: 'Morrisville',   href: '/morrisville-pressure-washing',   left: '51.7%', top: '38.5%' },
  { name: 'Cary',          href: '/cary-pressure-washing',          left: '56.7%', top: '42.2%' },
  { name: 'Raleigh',       href: '/raleigh-pressure-washing',       left: '70.0%', top: '43.5%' },
  { name: 'Apex',          href: '/apex-pressure-washing',          left: '49.1%', top: '48.8%' },
  { name: 'Garner',        href: '/garner-pressure-washing',        left: '72.6%', top: '51.1%' },
  { name: 'Holly Springs', href: '/holly-springs-pressure-washing', left: '50.8%', top: '57.9%' },
  { name: 'Fuquay-Varina', href: '/fuquay-varina-pressure-washing', left: '54.7%', top: '65.8%' },
  { name: 'Clayton',       href: '/clayton-pressure-washing',       left: '84.8%', top: '58.0%' },
];

export default function ServiceAreaMap() {
  return (
    /*
     * Outer wrapper: relative + fixed aspect ratio so the overlay
     * always scales with the iframe regardless of container width.
     * 480/1024 ≈ 46.875% padding-bottom gives a 1024×480 aspect ratio.
     */
    <div className="relative w-full" style={{ paddingBottom: '46.875%', minHeight: '320px' }}>

      {/* ── Real Google Maps iframe ── */}
      <iframe
        title="AAA Houston Pressure Washing Service Area — Raleigh, NC Triangle"
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d193000!2d-78.82!3d35.76!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
        className="absolute inset-0 w-full h-full"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/*
       * Transparent overlay — pointer-events-none so the map stays
       * pannable/zoomable everywhere EXCEPT the pin buttons themselves.
       */}
      <div className="absolute inset-0 pointer-events-none">
        {PINS.map((pin) => (
          <a
            key={pin.href}
            href={pin.href}
            aria-label={`Pressure washing services in ${pin.name}, NC`}
            className="absolute group pointer-events-auto"
            style={{
              left: pin.left,
              top: pin.top,
              transform: 'translate(-50%, -100%)',
              zIndex: 10,
            }}
          >
            {/* ── Red drop-pin SVG ── */}
            <svg
              width="32"
              height="42"
              viewBox="0 0 32 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-lg transition-transform duration-150 group-hover:scale-125 group-hover:-translate-y-1"
              aria-hidden="true"
            >
              {/* Pin body */}
              <path
                d="M16 0C7.163 0 0 7.163 0 16c0 10.5 16 26 16 26S32 26.5 32 16C32 7.163 24.837 0 16 0z"
                fill="#DC2626"
              />
              {/* White inner circle */}
              <circle cx="16" cy="15" r="6" fill="white" />
            </svg>

            {/* ── City name tooltip — appears above pin on hover ── */}
            <span
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-150 pointer-events-none"
              style={{
                background: 'hsl(var(--nav-bg))',
                color: 'hsl(var(--primary))',
                border: '1px solid hsl(var(--primary))',
              }}
            >
              {pin.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
