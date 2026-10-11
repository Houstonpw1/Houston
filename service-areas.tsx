import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { service_areas_page } from 'virtual:content';
import ServiceAreaMap from '@/components/ServiceAreaMap';
// city.path values are used as static hrefs via index lookup, not passed as props

const siteUrl = 'https://raleighpressurewashing.com';
const pageUrl = `${siteUrl}/service-areas`;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      name: service_areas_page.meta.title,
      url: pageUrl,
      description: service_areas_page.meta.description,
      isPartOf: { '@id': `${siteUrl}/#website` },
      about: { '@id': `${siteUrl}/#organization` },
    },
    {
      '@type': 'ItemList',
      '@id': `${pageUrl}#city-list`,
      name: 'Pressure Washing Service Areas — Raleigh, NC & Surrounding Cities',
      numberOfItems: service_areas_page.cities.length,
      itemListElement: service_areas_page.cities.map((city, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `${city.name}, ${city.state}`,
        url: `${siteUrl}${city.path}`,
        description: city.highlight,
      })),
    },
  ],
};

export default function ServiceAreasPage() {
  return (
    <>
      <Helmet>
        <title>{service_areas_page.meta.title}</title>
        <meta name="description" content={service_areas_page.meta.description} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={service_areas_page.meta.title} />
        <meta property="og:description" content={service_areas_page.meta.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={service_areas_page.meta.title} />
        <meta name="twitter:description" content={service_areas_page.meta.description} />
        <meta name="twitter:image" content={`${siteUrl}/og-image.jpg`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>
      </Helmet>

      <main>

        {/* ══════════════════════════════════════════
            HERO — H1
        ══════════════════════════════════════════ */}
        <section className="py-24 text-center" style={{ background: 'hsl(var(--nav-bg))' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.p
                variants={fadeUp}
                className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
                style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--nav-bg))' }}
              >
                {service_areas_page.hero.eyebrow}
              </motion.p>

              {/* H1 */}
              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl font-black mb-6 leading-tight"
                style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--nav-text))' }}
              >
                {service_areas_page.hero.h1}
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-lg max-w-2xl mx-auto leading-relaxed"
                style={{ color: 'hsl(var(--nav-text) / 0.8)' }}
              >
                {service_areas_page.hero.intro}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            INTERACTIVE PIN MAP — Service Area Coverage
        ══════════════════════════════════════════ */}
        <section className="py-20 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="text-center mb-10"
            >
              {/* H2 */}
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl font-black mb-3"
                style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
              >
                Our Service Coverage Map
              </motion.h2>
              {/* H3 */}
              <motion.h3
                variants={fadeUp}
                className="text-lg font-bold mb-2"
                style={{ color: 'hsl(var(--brand-blue-dark))' }}
              >
                Serving Raleigh &amp; 9 Surrounding Cities
              </motion.h3>
              <motion.p
                variants={fadeUp}
                className="text-base max-w-xl mx-auto"
                style={{ color: 'hsl(var(--muted-foreground))' }}
              >
                Click any red pin on the map to visit that city's dedicated pressure washing page.
              </motion.p>
            </motion.div>

            {/* Self-contained SVG service area map — no iframe, pins are part of the SVG */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="rounded-2xl overflow-hidden border shadow-xl"
              style={{ borderColor: 'hsl(var(--border))' }}
            >
              <ServiceAreaMap />

              {/* City button legend below map */}
              <div className="p-6" style={{ background: 'hsl(var(--nav-bg))' }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-4 text-center" style={{ color: 'hsl(var(--primary))' }}>
                  Cities We Serve — Click a Pin or Button to Explore
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {[
                    { name: 'Raleigh',       path: '/raleigh-pressure-washing' },
                    { name: 'Cary',          path: '/cary-pressure-washing' },
                    { name: 'Apex',          path: '/apex-pressure-washing' },
                    { name: 'Garner',        path: '/garner-pressure-washing' },
                    { name: 'Holly Springs', path: '/holly-springs-pressure-washing' },
                    { name: 'Morrisville',   path: '/morrisville-pressure-washing' },
                    { name: 'Clayton',       path: '/clayton-pressure-washing' },
                    { name: 'Wake Forest',   path: '/wake-forest-pressure-washing' },
                    { name: 'Durham',        path: '/durham-pressure-washing' },
                    { name: 'Fuquay-Varina', path: '/fuquay-varina-pressure-washing' },
                  ].map((city) => (
                    <a
                      key={city.path}
                      href={city.path}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl font-bold text-sm transition-all hover:opacity-80 hover:-translate-y-0.5"
                      style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--nav-bg))' }}
                    >
                      <svg className="w-4 h-4 shrink-0" fill="#E53E3E" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      <span>{city.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CITY GRID — H2 section + H3 per card
        ══════════════════════════════════════════ */}
        <section className="py-20 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="text-center mb-14"
            >
              {/* H2 — section heading */}
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl font-black mb-3"
                style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
              >
                {service_areas_page.cities_heading}
              </motion.h2>

              {/* H3 — section subheading */}
              <motion.h3
                variants={fadeUp}
                className="text-lg font-bold"
                style={{ color: 'hsl(var(--brand-blue-dark))' }}
              >
                {service_areas_page.cities_subheading}
              </motion.h3>
            </motion.div>

            {/* City cards grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {service_areas_page.cities.map((city, ci) => {
                const cityPaths = [
                  '/raleigh-pressure-washing',
                  '/cary-pressure-washing',
                  '/apex-pressure-washing',
                  '/garner-pressure-washing',
                  '/wake-forest-pressure-washing',
                  '/durham-pressure-washing',
                  '/holly-springs-pressure-washing',
                  '/clayton-pressure-washing',
                  '/fuquay-varina-pressure-washing',
                  '/morrisville-pressure-washing',
                ];
                const href = cityPaths[ci] ?? '/service-areas';
                return (
                  <motion.div key={city.id} variants={fadeUp}>
                    <a
                      href={href}
                      className="group flex flex-col h-full rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                      style={{ borderColor: 'hsl(var(--border))' }}
                    >
                      {/* Card header — sky blue */}
                      <div className="px-6 py-5" style={{ background: 'hsl(var(--nav-bg))' }}>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            {/* H3 per city card */}
                            <h3
                              className="text-xl font-black leading-tight mb-1"
                              style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--nav-text))' }}
                            >
                              <span>{city.name}</span>
                              <span>, </span>
                              <span>{city.state}</span>
                            </h3>
                            <p className="text-xs font-bold uppercase tracking-wide" style={{ color: 'hsl(var(--primary))' }}>
                              {city.tagline}
                            </p>
                          </div>
                          <div
                            className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1"
                            style={{ background: 'hsl(var(--primary))' }}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'hsl(var(--nav-bg))' }}>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Card body */}
                      <div className="flex flex-col flex-1 px-6 py-5 bg-background">
                        <p className="text-sm leading-relaxed mb-5" style={{ color: 'hsl(var(--muted-foreground))' }}>
                          {city.highlight}
                        </p>
                        <ul className="flex flex-col gap-2 mt-auto">
                          {city.services.map((svc, si) => (
                            <li key={si} className="flex items-center gap-2.5">
                              <div
                                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                                style={{ background: 'hsl(var(--brand-blue))' }}
                              >
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" style={{ color: 'hsl(var(--nav-text))' }}>
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <span className="text-sm font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
                                {svc}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <div
                          className="mt-6 pt-4 flex items-center gap-2 text-sm font-bold"
                          style={{ borderTop: '1px solid hsl(var(--border))', color: 'hsl(var(--nav-bg))' }}
                        >
                          <span>View </span>
                          <span>{city.name}</span>
                          <span> Details</span>
                          <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </a>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            DON'T SEE YOUR CITY — CTA
        ══════════════════════════════════════════ */}
        <section className="py-16" style={{ background: 'hsl(var(--muted))' }}>
          <div className="max-w-3xl mx-auto px-4 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.h2
                variants={fadeUp}
                className="text-2xl sm:text-3xl font-black mb-3"
                style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
              >
                {service_areas_page.hero.h1}
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-base mb-8"
                style={{ color: 'hsl(var(--muted-foreground))' }}
              >
                {service_areas_page.hero.intro}
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link
                  to="/contact"
                  className="inline-block px-8 py-4 rounded-md font-bold text-base transition-all hover:opacity-90"
                  style={{ background: 'hsl(var(--nav-bg))', color: 'hsl(var(--nav-text))' }}
                >
                  Contact Us Today
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            YELLOW CTA BANNER
        ══════════════════════════════════════════ */}
        <section className="py-16" style={{ background: 'hsl(var(--primary))' }}>
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2
              className="text-3xl sm:text-4xl font-black mb-4"
              style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--nav-bg))' }}
            >
              Ready to Get Started?
            </h2>
            <p className="text-base mb-8" style={{ color: 'hsl(var(--nav-bg) / 0.8)' }}>
              Get your free, no-obligation quote today. Serving Raleigh, Cary, Apex, Garner, Wake Forest, Durham, Holly Springs, Clayton, Fuquay-Varina & Morrisville.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="px-8 py-4 rounded-md font-bold text-base transition-all hover:opacity-90"
                style={{ background: 'hsl(var(--nav-bg))', color: 'hsl(var(--primary))' }}
              >
                Get a Free Quote
              </Link>
              <a
                href="https://g.page/r/CZhT8P3mvfoaEB0/review"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-md font-bold text-base border-2 transition-all hover:opacity-90"
                style={{ borderColor: 'hsl(var(--nav-bg))', color: 'hsl(var(--nav-bg))' }}
              >
                ⭐ Leave a Review
              </a>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
