import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import WaterStreams from '@/components/WaterStreams';

const navLinks = [
  { label: 'Home',          href: '/' },
  { label: 'Services',      href: '/services' },
  { label: 'Commercial',    href: '/commercial-cleaning' },
  { label: 'Residential',   href: '/residential' },
  { label: 'Service Areas', href: '/service-areas' },
  { label: 'About',         href: '/about' },
  { label: 'Contact',       href: '/contact' },
];

const GOOGLE_REVIEWS_URL  = 'https://share.google/87vVLVFdRtDCbO11b';
const GOOGLE_LEAVE_REVIEW = 'https://g.page/r/CZhT8P3mvfoaEB0/review';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  return (
    <header
      className="w-full z-50"
      style={{
        background: 'hsl(var(--nav-bg))',
        boxShadow: '0 2px 8px hsl(var(--nav-bg) / 0.4)',
      }}
    >
      {/* Yellow accent line at very top */}
      <div
        className="h-1 w-full"
        style={{ background: 'linear-gradient(90deg, hsl(var(--primary)/0.5) 0%, hsl(var(--primary)) 50%, hsl(var(--primary)/0.5) 100%)' }}
      />

      {/* ── ROW 1: slim top bar — phone left, leave-a-review right ── */}
      <div className="hidden md:block border-b" style={{ borderColor: 'hsl(var(--primary) / 0.2)' }}>
        <div className="w-full px-6 lg:px-12 flex items-center justify-between h-9">
          <a
            href="tel:+19194733550"
            className="flex items-center gap-2 text-sm font-bold hover:opacity-80 transition-opacity"
            style={{ color: 'hsl(var(--nav-text))' }}
          >
            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            (919) 473-3550
          </a>
          <a
            href={GOOGLE_LEAVE_REVIEW}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-bold hover:opacity-80 transition-opacity"
            style={{ color: 'hsl(var(--primary))' }}
          >
            ⭐ Leave Us a Review
          </a>
        </div>
      </div>

      {/* ── ROW 2: 3-column grid — business name LEFT | logo CENTER | contact + free quote RIGHT ── */}
      <div className="w-full px-6 lg:px-12 py-4 grid items-center" style={{ gridTemplateColumns: '1fr auto 1fr' }}>

        {/* LEFT — business name + tagline only */}
        <div className="hidden lg:flex flex-col items-start gap-0.5">
          <span
            className="font-black text-xl xl:text-2xl leading-tight whitespace-nowrap"
            style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--nav-text))' }}
          >
            AAA Houston Pressure Washing, LLC
          </span>
          <span className="text-sm font-bold" style={{ color: 'hsl(var(--primary))' }}>
            Raleigh, NC &amp; Surrounding Cities
          </span>
        </div>

        {/* CENTER — logo at 400px */}
        <div className="flex justify-center">
          <Link
            to="/"
            className="transition-transform duration-300 hover:scale-105"
            style={{ display: 'block', lineHeight: 0 }}
          >
            <img
              src="/airo-assets/uploads/logo-horizontal-421a29e0.png"
              alt="AAA Houston Pressure Washing, LLC"
              style={{ display: 'block', height: '400px', width: 'auto' }}
            />
          </Link>
        </div>

        {/* RIGHT — contact/hours/email + Free Quote button */}
        <div className="hidden lg:flex flex-col items-end gap-1">
          {/* Phone + hours */}
          <div className="flex items-center gap-3 text-base font-bold">
            <a
              href="tel:+19194733550"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity whitespace-nowrap"
              style={{ color: 'hsl(var(--nav-text))' }}
            >
              <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              (919) 473-3550
            </a>
            <span className="font-black text-lg" style={{ color: 'hsl(var(--primary))' }}>|</span>
            <span className="whitespace-nowrap" style={{ color: 'hsl(var(--nav-text))' }}>
              Mon–Sat 7am–7pm
            </span>
          </div>
          {/* Email */}
          <a
            href="mailto:aaahoustonpw@gmail.com"
            className="flex items-center gap-2 text-base font-bold hover:opacity-80 transition-opacity whitespace-nowrap"
            style={{ color: 'hsl(var(--primary))' }}
          >
            <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            aaahoustonpw@gmail.com
          </a>
          {/* Free Quote */}
          <Link
            to="/contact"
            className="mt-1 inline-flex px-6 py-3 rounded-lg text-sm font-black transition-all duration-200 hover:scale-105 hover:brightness-110 whitespace-nowrap"
            style={{
              background: 'hsl(var(--primary))',
              color: 'hsl(var(--primary-foreground))',
              boxShadow: '0 0 18px hsl(var(--primary)/0.55)',
            }}
          >
            Free Quote
          </Link>
        </div>

        {/* Hamburger — mobile only */}
        <div className="flex lg:hidden items-center justify-end col-start-3">
          <button
            className="p-2 rounded-md"
            style={{ color: 'hsl(var(--nav-text))' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

      </div>

      {/* ── ROW 3: nav links ── */}
      <div className="hidden md:block border-t" style={{ borderColor: 'hsl(var(--primary) / 0.2)', background: 'hsl(var(--nav-bg) / 0.95)' }}>
        <div className="w-full px-6 lg:px-12">
          <nav
            aria-label="Main navigation"
            className="flex items-center justify-between h-12"
          >
            {navLinks.map((link) => {
              const active = location.pathname === link.href;
              return (
                <span key={link.href} className="contents">
                  <Link
                    to={link.href}
                    className="relative text-sm font-bold tracking-wide whitespace-nowrap transition-all duration-200 hover:opacity-80"
                    style={{
                      color: active ? 'hsl(var(--primary))' : 'hsl(var(--nav-text))',
                      textShadow: active ? '0 0 14px hsl(var(--primary)/0.8)' : 'none',
                    }}
                  >
                    {link.label}
                    {active && (
                      <span
                        className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                        style={{ background: 'hsl(var(--primary))' }}
                      />
                    )}
                  </Link>
                  <span className="font-black text-base select-none" style={{ color: 'hsl(var(--primary))', opacity: 0.7 }}>|</span>
                </span>
              );
            })}

            {/* ⭐ Google Reviews tab */}
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-black whitespace-nowrap px-4 py-1.5 rounded-full border-2 transition-all duration-200 hover:scale-105"
              style={{
                color: 'hsl(var(--primary))',
                borderColor: 'hsl(var(--primary))',
                boxShadow: '0 0 12px hsl(var(--primary)/0.35)',
              }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Google Reviews
            </a>
          </nav>
        </div>
      </div>

      {/* Water streams decoration */}
      <WaterStreams direction="down" height={48} />

      {/* ── MOBILE MENU ── */}
      {menuOpen && (
        <div
          className="md:hidden border-t"
          style={{ background: 'hsl(var(--nav-bg))', borderColor: 'hsl(var(--primary)/0.3)' }}
        >
          <nav aria-label="Mobile navigation" className="px-5 py-5 flex flex-col gap-1">
            <div className="pb-4 mb-2 border-b" style={{ borderColor: 'hsl(var(--primary)/0.3)' }}>
              <p className="font-black text-base leading-snug" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--nav-text))' }}>
                AAA Houston Pressure Washing, LLC
              </p>
              <p className="text-xs font-semibold mt-1" style={{ color: 'hsl(var(--primary))' }}>
                Raleigh, NC &amp; Surrounding Cities
              </p>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-bold py-3 border-b transition-colors"
                style={{
                  color: location.pathname === link.href ? 'hsl(var(--primary))' : 'hsl(var(--nav-text))',
                  borderColor: 'hsl(var(--primary)/0.1)',
                }}
              >
                {link.label}
              </Link>
            ))}

            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-bold py-3 transition-colors"
              style={{ color: 'hsl(var(--primary))' }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Google Reviews
            </a>

            <div className="flex flex-col gap-3 mt-4 pt-4 border-t" style={{ borderColor: 'hsl(var(--primary)/0.3)' }}>
              <a
                href="tel:+19194733550"
                className="text-sm font-bold text-center py-2"
                style={{ color: 'hsl(var(--nav-text))' }}
              >
                (919) 473-3550
              </a>
              <Link
                to="/contact"
                className="px-5 py-3 rounded-lg text-sm font-black text-center"
                style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))', boxShadow: '0 0 16px hsl(var(--primary)/0.5)' }}
              >
                Get a Free Quote
              </Link>
              <a
                href={GOOGLE_LEAVE_REVIEW}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-lg text-sm font-bold text-center border-2"
                style={{ borderColor: 'hsl(var(--primary))', color: 'hsl(var(--primary))' }}
              >
                ⭐ Leave Us a Google Review
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
