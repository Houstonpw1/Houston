import { Link } from 'react-router';
import WaterStreams from '@/components/WaterStreams';

const services = [
  { label: 'House Washing', href: '/services' },
  { label: 'Driveway Cleaning', href: '/services' },
  { label: 'Concrete Cleaning', href: '/services' },
  { label: 'Power Washing', href: '/services' },
  { label: 'Roof Cleaning', href: '/services' },
  { label: 'Commercial Cleaning', href: '/services' },
];

const serviceAreas = [
  { label: 'Raleigh, NC',       href: '/raleigh-pressure-washing' },
  { label: 'Cary, NC',          href: '/cary-pressure-washing' },
  { label: 'Apex, NC',          href: '/apex-pressure-washing' },
  { label: 'Garner, NC',        href: '/garner-pressure-washing' },
  { label: 'Wake Forest, NC',   href: '/wake-forest-pressure-washing' },
  { label: 'Durham, NC',        href: '/durham-pressure-washing' },
  { label: 'Holly Springs, NC', href: '/holly-springs-pressure-washing' },
  { label: 'Clayton, NC',       href: '/clayton-pressure-washing' },
  { label: 'Fuquay-Varina, NC', href: '/fuquay-varina-pressure-washing' },
  { label: 'Morrisville, NC',   href: '/morrisville-pressure-washing' },
];

const quickLinks: { label: string; href: string; external?: boolean }[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Service Areas', href: '/service-areas' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Free Quote', href: '/contact' },
  { label: '⭐ Leave Us a Review', href: 'https://g.page/r/CZhT8P3mvfoaEB0/review', external: true },
];

export default function Footer() {
  return (
    <footer style={{ background: 'hsl(var(--nav-bg))' }}>
      <WaterStreams direction="up" height={56} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 items-start">

          {/* Brand Column */}
          <div className="flex flex-col items-start">
            <Link to="/" className="block mb-5">
              <img
                src="/airo-assets/uploads/logo-horizontal-421a29e0.png"
                alt="AAA Houston Pressure Washing, LLC"
                style={{ display: 'block', height: '220px', width: 'auto', maxWidth: '100%' }}
              />
            </Link>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'hsl(var(--nav-text) / 0.7)' }}>
              Raleigh's trusted exterior cleaning specialists since 2010. Serving Raleigh, Cary, Apex, Garner, Wake Forest, Durham, Holly Springs, Clayton, Fuquay-Varina &amp; Morrisville.
            </p>
            <a
              href="tel:+19194733550"
              className="inline-flex items-center gap-2 text-sm font-bold transition-colors duration-200 hover:opacity-80"
              style={{ color: 'hsl(var(--primary))' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (919) 473-3550
            </a>
          </div>

          {/* Services */}
          <div className="flex flex-col items-start">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-5" style={{ color: 'hsl(var(--primary))' }}>
              Our Services
            </h3>
            <ul className="flex flex-col gap-2.5">
              {services.map((s) => (
                <li key={s.label}>
                  <Link
                    to={s.href}
                    className="text-sm transition-colors duration-200 hover:opacity-100"
                    style={{ color: 'hsl(var(--nav-text) / 0.7)' }}
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div className="flex flex-col items-start">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-5" style={{ color: 'hsl(var(--primary))' }}>
              Service Areas
            </h3>
            <ul className="flex flex-col gap-2.5">
              {serviceAreas.map((a) => (
                <li key={a.label}>
                  <Link
                    to={a.href}
                    className="text-sm transition-colors duration-200 hover:opacity-100"
                    style={{ color: 'hsl(var(--nav-text) / 0.7)' }}
                  >
                    {a.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-start">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-5" style={{ color: 'hsl(var(--primary))' }}>
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  {l.external ? (
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold transition-colors duration-200 hover:opacity-100"
                      style={{ color: 'hsl(var(--primary))' }}
                    >
                      {l.label}
                    </a>
                  ) : (
                    <Link
                      to={l.href}
                      className="text-sm transition-colors duration-200 hover:opacity-100"
                      style={{ color: 'hsl(var(--nav-text) / 0.7)' }}
                    >
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t"
          style={{ borderColor: 'hsl(var(--nav-border))' }}
        >
          <p className="text-xs" style={{ color: 'hsl(var(--nav-text) / 0.5)' }}>
            © {new Date().getFullYear()} AAA Houston Pressure Washing, LLC. All rights reserved. Serving Raleigh, NC &amp; surrounding cities.
          </p>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" style={{ color: 'hsl(var(--primary))' }}>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-xs ml-1 font-semibold" style={{ color: 'hsl(var(--nav-text) / 0.7)' }}>5-Star Rated</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
