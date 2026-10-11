import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { useState } from 'react';
import { commercial_cleaning } from 'virtual:content';

const siteUrl = 'https://raleighpressurewashing.com';
const pageUrl = `${siteUrl}/commercial-cleaning`;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export default function CommercialCleaningPage() {
  const [activeCity, setActiveCity] = useState(0);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        name: commercial_cleaning.meta.title,
        url: pageUrl,
        description: commercial_cleaning.meta.description,
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': `${siteUrl}/#organization` },
      },
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: 'Commercial Pressure Washing',
        provider: { '@id': `${siteUrl}/#organization` },
        areaServed: commercial_cleaning.cities.map((c) => ({ '@type': 'City', name: `${c.name}, NC` })),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Commercial Cleaning Services',
          itemListElement: commercial_cleaning.categories.map((cat, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: cat.heading,
          })),
        },
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{commercial_cleaning.meta.title}</title>
        <meta name="description" content={commercial_cleaning.meta.description} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={commercial_cleaning.meta.title} />
        <meta property="og:description" content={commercial_cleaning.meta.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={commercial_cleaning.meta.title} />
        <meta name="twitter:description" content={commercial_cleaning.meta.description} />
        <meta name="twitter:image" content={`${siteUrl}/og-image.jpg`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>
      </Helmet>

      <main>

        {/* ══════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════ */}
        <section className="py-24 text-center" style={{ background: 'hsl(var(--nav-bg))' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.p
                variants={fadeUp}
                className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
                style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--nav-bg))' }}
              >
                {commercial_cleaning.hero.eyebrow}
              </motion.p>
              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl font-black mb-6 leading-tight"
                style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--nav-text))' }}
              >
                {commercial_cleaning.hero.h1}
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-lg max-w-2xl mx-auto leading-relaxed mb-8"
                style={{ color: 'hsl(var(--nav-text) / 0.85)' }}
              >
                {commercial_cleaning.hero.intro}
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-block px-8 py-4 rounded-md font-bold text-base transition-all hover:opacity-90"
                  style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--nav-bg))' }}
                >
                  {commercial_cleaning.hero.cta_primary}
                </Link>
                <a
                  href="tel:+19194733550"
                  className="inline-block px-8 py-4 rounded-md font-bold text-base border-2 transition-all hover:opacity-90"
                  style={{ borderColor: 'hsl(var(--nav-text))', color: 'hsl(var(--nav-text))' }}
                >
                  {commercial_cleaning.hero.cta_phone}
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            TRUST STRIP
        ══════════════════════════════════════════════════ */}
        <section className="py-10 border-b" style={{ background: 'hsl(var(--muted))', borderColor: 'hsl(var(--border))' }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {commercial_cleaning.features.map((f) => (
                <div key={f.id} className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'hsl(var(--brand-blue))' }}
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" style={{ color: 'hsl(var(--nav-text))' }}>
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
                    {f.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            CATEGORY CARDS — 4 commercial service categories
        ══════════════════════════════════════════════════ */}
        <section className="py-20" style={{ background: 'hsl(var(--background))' }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              className="text-center mb-14"
            >
              <motion.p
                variants={fadeUp}
                className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
                style={{ background: 'hsl(var(--nav-bg))', color: 'hsl(var(--nav-text))' }}
              >
                {commercial_cleaning.categories_section.eyebrow}
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl font-black mb-3"
                style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
              >
                {commercial_cleaning.categories_section.heading}
              </motion.h2>
              <motion.h3
                variants={fadeUp}
                className="text-lg font-bold mb-4"
                style={{ color: 'hsl(var(--brand-blue-dark))' }}
              >
                {commercial_cleaning.categories_section.subheading}
              </motion.h3>
              <motion.p
                variants={fadeUp}
                className="text-base max-w-2xl mx-auto"
                style={{ color: 'hsl(var(--muted-foreground))' }}
              >
                {commercial_cleaning.categories_section.intro}
              </motion.p>
            </motion.div>

            <div className="flex flex-col gap-10">
              {commercial_cleaning.categories.map((cat) => (
                <motion.div
                  key={cat.id}
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  className="rounded-2xl border p-8"
                  style={{ borderColor: 'hsl(var(--border))', background: 'hsl(var(--muted))' }}
                >
                  {/* H3 — category heading (section already has H2 above) */}
                  <h3
                    className="text-2xl sm:text-3xl font-black mb-1"
                    style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
                  >
                    {cat.heading}
                  </h3>
                  {/* H4 — category subheading */}
                  <h4
                    className="text-base font-bold mb-3"
                    style={{ color: 'hsl(var(--brand-blue-dark))' }}
                  >
                    {cat.subheading}
                  </h4>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    {cat.intro}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {cat.services.map((svc: { id: string; name: string; desc: string }) => (
                      <li key={svc.id} className="flex items-start gap-3 bg-background rounded-xl p-4 border" style={{ borderColor: 'hsl(var(--border))' }}>
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{ background: 'hsl(var(--brand-blue))' }}
                        >
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" style={{ color: 'hsl(var(--nav-text))' }}>
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-bold leading-snug mb-0.5" style={{ color: 'hsl(var(--foreground))' }}>
                            {svc.name}
                          </p>
                          <p className="text-xs leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                            {svc.desc}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            CITIES — 10 tab panels
        ══════════════════════════════════════════════════ */}
        <section id="service-areas" className="py-20" style={{ background: 'hsl(var(--muted))' }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              className="text-center mb-12"
            >
              <motion.p
                variants={fadeUp}
                className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
                style={{ background: 'hsl(var(--nav-bg))', color: 'hsl(var(--nav-text))' }}
              >
                {commercial_cleaning.cities_section.eyebrow}
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl font-black mb-3"
                style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
              >
                {commercial_cleaning.cities_section.heading}
              </motion.h2>
              <motion.h3
                variants={fadeUp}
                className="text-lg font-bold mb-4"
                style={{ color: 'hsl(var(--brand-blue-dark))' }}
              >
                {commercial_cleaning.cities_section.subheading}
              </motion.h3>
              <motion.p
                variants={fadeUp}
                className="text-base max-w-2xl mx-auto"
                style={{ color: 'hsl(var(--muted-foreground))' }}
              >
                {commercial_cleaning.cities_section.intro}
              </motion.p>
            </motion.div>

            {/* City tab buttons */}
            <nav aria-label="Commercial service area cities" className="mb-10">
              <div className="flex flex-wrap gap-2 justify-center">
                {commercial_cleaning.cities.map((city, i) => (
                  <button
                    key={city.id}
                    onClick={() => setActiveCity(i)}
                    aria-pressed={activeCity === i}
                    className="px-5 py-2.5 rounded-full text-sm font-bold transition-all"
                    style={
                      activeCity === i
                        ? { background: 'hsl(var(--nav-bg))', color: 'hsl(var(--nav-text))' }
                        : { background: 'hsl(var(--background))', color: 'hsl(var(--foreground))' }
                    }
                  >
                    {city.name}
                  </button>
                ))}
              </div>
            </nav>

            {/* City panels */}
            {commercial_cleaning.cities.map((city, i) => (
              <article
                key={city.id}
                id={`commercial-${city.slug}`}
                className={activeCity === i ? 'block' : 'hidden'}
                aria-label={city.h1}
              >
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  <div className="bg-background rounded-2xl border p-8 sm:p-10" style={{ borderColor: 'hsl(var(--border))' }}>
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

                      {/* Main city content */}
                      <div className="lg:col-span-3">
                        {/* H3 — city service heading (section already has H2 above) */}
                        <h3
                          className="text-3xl sm:text-4xl font-black mb-3"
                          style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
                        >
                          {city.h1}
                        </h3>
                        {/* H4 — city subheading */}
                        <h4
                          className="text-lg font-bold mb-2"
                          style={{ color: 'hsl(var(--brand-blue-dark))' }}
                        >
                          {city.h2}
                        </h4>
                        <p
                          className="text-base font-semibold mb-6"
                          style={{ color: 'hsl(var(--muted-foreground))' }}
                        >
                          {city.h3}
                        </p>
                        <p className="text-base leading-relaxed mb-8" style={{ color: 'hsl(var(--muted-foreground))' }}>
                          {city.body}
                        </p>

                        {/* Features checklist */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                          {commercial_cleaning.features.map((f) => (
                            <div key={f.id} className="flex items-center gap-3">
                              <div
                                className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                                style={{ background: 'hsl(var(--brand-blue))' }}
                              >
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" style={{ color: 'hsl(var(--nav-text))' }}>
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <span className="text-sm font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
                                {f.text}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <Link
                            to="/contact"
                            className="inline-block px-8 py-4 rounded-md font-bold text-base transition-all hover:opacity-90"
                            style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--nav-bg))' }}
                          >
                            Get a Commercial Quote
                          </Link>
                          <a
                            href={city.path}
                            className="inline-block px-8 py-4 rounded-md font-bold text-base border-2 transition-all hover:opacity-90"
                            style={{ borderColor: 'hsl(var(--nav-bg))', color: 'hsl(var(--nav-bg))' }}
                          >
                            <span>{city.name}</span>
                            <span> Full Details →</span>
                          </a>
                        </div>
                      </div>

                      {/* Sidebar — all cities quick-nav */}
                      <aside className="lg:col-span-2" aria-label="Other service cities">
                        <div
                          className="p-6 rounded-2xl border sticky top-32"
                          style={{ borderColor: 'hsl(var(--border))' }}
                        >
                          <h3
                            className="text-base font-black mb-1"
                            style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
                          >
                            {commercial_cleaning.cities_section.sidebar_heading}
                          </h3>
                          <p className="text-sm mb-4" style={{ color: 'hsl(var(--muted-foreground))' }}>
                            {commercial_cleaning.cities_section.sidebar_intro}
                          </p>
                          <ul className="flex flex-col gap-2 mb-6">
                            {commercial_cleaning.cities.map((c, ci) => (
                              <li key={c.id}>
                                <button
                                  onClick={() => setActiveCity(ci)}
                                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-80 group text-left"
                                  style={
                                    activeCity === ci
                                      ? { background: 'hsl(var(--nav-bg))', color: 'hsl(var(--nav-text))' }
                                      : { background: 'hsl(var(--muted))', color: 'hsl(var(--foreground))' }
                                  }
                                >
                                  <span className="flex-1">{c.name}, NC</span>
                                  <svg
                                    className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    style={{ color: 'hsl(var(--brand-blue-dark))' }}
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </button>
                              </li>
                            ))}
                          </ul>
                          <Link
                            to="/contact"
                            className="block w-full text-center px-6 py-3 rounded-md font-bold text-sm transition-all hover:opacity-90"
                            style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--nav-bg))' }}
                          >
                            {commercial_cleaning.cities_section.cta_sidebar}
                          </Link>
                        </div>
                      </aside>

                    </div>
                  </div>
                </motion.div>
              </article>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            BOTTOM CTA
        ══════════════════════════════════════════════════ */}
        <section className="py-20 text-center" style={{ background: 'hsl(var(--nav-bg))' }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl font-black mb-4"
                style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--nav-text))' }}
              >
                {commercial_cleaning.cta.heading}
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-lg mb-8 leading-relaxed"
                style={{ color: 'hsl(var(--nav-text) / 0.85)' }}
              >
                {commercial_cleaning.cta.body}
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-block px-10 py-4 rounded-md font-bold text-base transition-all hover:opacity-90"
                  style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--nav-bg))' }}
                >
                  {commercial_cleaning.cta.cta_primary}
                </Link>
                <a
                  href="https://g.page/r/CZhT8P3mvfoaEB0/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-10 py-4 rounded-md font-bold text-base border-2 transition-all hover:opacity-90"
                  style={{ borderColor: 'hsl(var(--nav-text))', color: 'hsl(var(--nav-text))' }}
                >
                  {commercial_cleaning.cta.cta_review}
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

      </main>
    </>
  );
}
