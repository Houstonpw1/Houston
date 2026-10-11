import { Helmet } from '@dr.pogodin/react-helmet';
import { Link, useLocation } from 'react-router';
import { motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';

import { services, pages } from 'virtual:content';
import GoogleReviews from '@/components/GoogleReviews';

const serviceAreaCities = pages.service_areas.cities;

const siteUrl = 'https://raleighpressurewashing.com';
const pageUrl = `${siteUrl}/services`;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

/* ─────────────────────────────────────────────────────────────
   SERVICE TYPE TABS — "Commercial" is index 0 from content,
   "Residential" is injected as a synthetic tab at index 1.
   We use a separate state key so it doesn't collide with the
   content-driven tabs array.
───────────────────────────────────────────────────────────── */
type TopTab = 'commercial' | 'residential' | number;

type ServiceTab = typeof services.tabs[number];
type ServiceCity = typeof services.cities[number];
type TabFeature = { id: string; text: string };
type TabService = { id: string; name: string; description: string };
type CommercialCategory = { id: string; heading: string; subheading: string; intro: string; services: TabService[] };

export default function ServicesPage() {
  const [activeTopTab, setActiveTopTab] = useState<TopTab>('commercial');
  const [activeCityTab, setActiveCityTab] = useState(0);
  const location = useLocation();
  const serviceTypesRef = useRef<HTMLElement>(null);

  // Handle #residential hash — activate Residential tab and scroll to section
  useEffect(() => {
    if (location.hash === '#residential') {
      setActiveTopTab('residential');
      setTimeout(() => {
        serviceTypesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [location.hash]);

  // Tab index mapping: 'commercial' → index 0, 'residential' → synthetic,
  // numbers 1..N → services.tabs[i+1] (we skip index 0 which is Commercial)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        name: services.meta.title,
        url: pageUrl,
        description: services.meta.description,
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': `${siteUrl}/#organization` },
      },
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#services-list`,
        name: 'Exterior Cleaning Services — AAA Houston Pressure Washing, LLC',
        numberOfItems: services.tabs.length,
        itemListElement: services.tabs.map((tab, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: tab.heading,
          url: `${pageUrl}#${tab.slug}`,
          description: tab.body1,
        })),
      },
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: 'Pressure Washing & Exterior Cleaning',
        provider: { '@id': `${siteUrl}/#organization` },
        areaServed: services.cities.map((c) => ({ '@type': 'City', name: `${c.name}, NC` })),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Exterior Cleaning Services',
          itemListElement: services.tabs.map((tab) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: tab.heading, description: tab.body1 },
          })),
        },
      },
    ],
  };

  /* ── shared check icon ── */
  const CheckIcon = () => (
    <div
      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
      style={{ background: 'hsl(var(--brand-blue))' }}
    >
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" style={{ color: 'hsl(var(--nav-text))' }}>
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>{services.meta.title}</title>
        <meta name="description" content={services.meta.description} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={services.meta.title} />
        <meta property="og:description" content={services.meta.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={services.meta.title} />
        <meta name="twitter:description" content={services.meta.description} />
        <meta name="twitter:image" content={`${siteUrl}/og-image.jpg`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>
      </Helmet>

      <main>

        {/* ════════════════════════════════════════
            PAGE HERO — H1 (one per page)
        ════════════════════════════════════════ */}
        <section className="py-24 text-center" style={{ background: 'hsl(var(--nav-bg))' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.p
                variants={fadeUp}
                className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
                style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--nav-bg))' }}
              >
                {services.hero.eyebrow}
              </motion.p>

              {/* H1 */}
              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl font-black mb-6 leading-tight"
                style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--nav-text))' }}
              >
                {services.hero.h1}
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-lg max-w-2xl mx-auto leading-relaxed"
                style={{ color: 'hsl(var(--nav-text) / 0.8)' }}
              >
                {services.hero.intro}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            SERVICE AREAS — city tabs (H2 + H3 each)
        ════════════════════════════════════════ */}
        <section id="service-areas" className="py-20 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="text-center mb-12"
            >
              <motion.p
                variants={fadeUp}
                className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
                style={{ background: 'hsl(var(--nav-bg))', color: 'hsl(var(--nav-text))' }}
              >
                Where We Work
              </motion.p>

              {/* H2 */}
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl font-black mb-3"
                style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
              >
                {pages.service_areas.section_heading}
              </motion.h2>

              {/* H3 */}
              <motion.h3
                variants={fadeUp}
                className="text-lg font-bold mb-4"
                style={{ color: 'hsl(var(--brand-blue-dark))' }}
              >
                {pages.service_areas.section_subheading}
              </motion.h3>

              <motion.p
                variants={fadeUp}
                className="text-base max-w-2xl mx-auto"
                style={{ color: 'hsl(var(--muted-foreground))' }}
              >
                {pages.service_areas.section_intro}
              </motion.p>
            </motion.div>

            {/* City tab buttons */}
            <nav aria-label="Service area cities" className="mb-10">
              <div className="flex flex-wrap gap-2 justify-center">
                {services.cities.map((city: { id: string; name: string; path: string }, i: number) => (
                  <button
                    key={city.id}
                    onClick={() => setActiveCityTab(i)}
                    aria-pressed={activeCityTab === i}
                    className="px-5 py-2.5 rounded-full text-sm font-bold transition-all"
                    style={
                      activeCityTab === i
                        ? { background: 'hsl(var(--nav-bg))', color: 'hsl(var(--nav-text))' }
                        : { background: 'hsl(var(--muted))', color: 'hsl(var(--foreground))' }
                    }
                  >
                    {city.name}
                  </button>
                ))}
              </div>
            </nav>

            {/* City tab panels */}
            {serviceAreaCities.map((city, i) => (
              <article
                key={city.id}
                id={`area-${city.slug}`}
                className={activeCityTab === i ? 'block' : 'hidden'}
                aria-label={city.heading}
              >
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  <div className="rounded-2xl border p-8 sm:p-10" style={{ borderColor: 'hsl(var(--border))' }}>
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

                      <div className="lg:col-span-3">
                        <h3
                          className="text-3xl sm:text-4xl font-black mb-3"
                          style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
                        >
                          {city.heading}
                        </h3>
                        <h4
                          className="text-lg font-bold mb-6"
                          style={{ color: 'hsl(var(--brand-blue-dark))' }}
                        >
                          {city.subheading}
                        </h4>
                        <p className="text-base leading-relaxed mb-5" style={{ color: 'hsl(var(--muted-foreground))' }}>
                          {city.body1}
                        </p>
                        <p className="text-base leading-relaxed mb-8" style={{ color: 'hsl(var(--muted-foreground))' }}>
                          {city.body2}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                          {city.features.map((f: { id: string; text: string }) => (
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
                            Get a Free Quote
                          </Link>
                          <a
                            href={city.path}
                            className="inline-block px-8 py-4 rounded-md font-bold text-base border-2 transition-all hover:opacity-90"
                            style={{ borderColor: 'hsl(var(--nav-bg))', color: 'hsl(var(--nav-bg))' }}
                          >
                            {city.label} Full Details →
                          </a>
                        </div>
                      </div>

                      <aside className="lg:col-span-2" aria-label={`Services offered in ${city.label}`}>
                        <div
                          className="p-6 rounded-2xl border sticky top-32"
                          style={{ borderColor: 'hsl(var(--border))' }}
                        >
                          <h3
                            className="text-base font-black mb-1"
                            style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
                          >
                            Services in {city.label}, NC
                          </h3>
                          <p className="text-sm mb-4" style={{ color: 'hsl(var(--muted-foreground))' }}>
                            Everything we offer in your area:
                          </p>
                          <ul className="flex flex-col gap-2">
                            {services.tabs.map((tab: ServiceTab, ti: number) => (
                              <li key={tab.id}>
                                <button
                                  onClick={() => {
                                    setActiveTopTab(ti);
                                    const el = document.getElementById('service-types');
                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                                  }}
                                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-80 group text-left"
                                  style={{ background: 'hsl(var(--muted))', color: 'hsl(var(--foreground))' }}
                                >
                                  <span>{tab.label}</span>
                                  <svg
                                    className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    style={{ color: 'hsl(var(--brand-blue-dark))' }}
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </aside>

                    </div>
                  </div>
                </motion.div>
              </article>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════
            SERVICE TYPES — Commercial + Residential tabs
            then remaining content-driven tabs
        ════════════════════════════════════════ */}
        <section id="service-types" ref={serviceTypesRef} className="py-20" style={{ background: 'hsl(var(--muted))' }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Section intro */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="text-center mb-12"
            >
              <motion.p
                variants={fadeUp}
                className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
                style={{ background: 'hsl(var(--nav-bg))', color: 'hsl(var(--nav-text))' }}
              >
                What We Do
              </motion.p>

              {/* H2 */}
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl font-black mb-3"
                style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
              >
                Our Exterior Cleaning Services
              </motion.h2>

              {/* H3 */}
              <motion.h3
                variants={fadeUp}
                className="text-lg font-bold mb-4"
                style={{ color: 'hsl(var(--brand-blue-dark))' }}
              >
                Professional Results on Every Surface — Residential &amp; Commercial
              </motion.h3>

              <motion.p
                variants={fadeUp}
                className="text-base max-w-2xl mx-auto"
                style={{ color: 'hsl(var(--muted-foreground))' }}
              >
                Select a service below to learn what we do, how we do it, and why it matters for your property.
              </motion.p>
            </motion.div>

            {/* ── Top-level tab bar: Commercial | Residential | other tabs ── */}
            <nav aria-label="Service categories" className="mb-10">
              <div className="flex flex-wrap gap-2 justify-center">

                {/* Commercial — index 0 from content */}
                <button
                  onClick={() => setActiveTopTab('commercial')}
                  aria-pressed={activeTopTab === 'commercial'}
                  className="px-5 py-2.5 rounded-full text-sm font-bold transition-all"
                  style={
                    activeTopTab === 'commercial'
                      ? { background: 'hsl(var(--primary))', color: 'hsl(var(--nav-bg))' }
                      : { background: 'hsl(var(--background))', color: 'hsl(var(--foreground))' }
                  }
                >
                  {services.tabs[0].label}
                </button>

                {/* Residential — synthetic tab */}
                <button
                  onClick={() => setActiveTopTab('residential')}
                  aria-pressed={activeTopTab === 'residential'}
                  className="px-5 py-2.5 rounded-full text-sm font-bold transition-all"
                  style={
                    activeTopTab === 'residential'
                      ? { background: 'hsl(var(--primary))', color: 'hsl(var(--nav-bg))' }
                      : { background: 'hsl(var(--background))', color: 'hsl(var(--foreground))' }
                  }
                >
                  Residential
                </button>

                {/* Remaining content-driven tabs (skip index 0 = Commercial) */}
                {services.tabs.map((tab: ServiceTab, i: number) => i === 0 ? null : (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTopTab(i)}
                    aria-pressed={activeTopTab === i}
                    className="px-5 py-2.5 rounded-full text-sm font-bold transition-all"
                    style={
                      activeTopTab === i
                        ? { background: 'hsl(var(--primary))', color: 'hsl(var(--nav-bg))' }
                        : { background: 'hsl(var(--background))', color: 'hsl(var(--foreground))' }
                    }
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </nav>

            {/* ══════════════════════════════════
                COMMERCIAL TAB PANEL
            ══════════════════════════════════ */}
            <article
              id="commercial-cleaning"
              className={activeTopTab === 'commercial' ? 'block' : 'hidden'}
              aria-label={services.tabs[0].heading}
            >
              <div>
                <div className="bg-background rounded-2xl border p-8 sm:p-10" style={{ borderColor: 'hsl(var(--border))' }}>
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    <div className="lg:col-span-3">
                      {/* H3 */}
                      <h3
                        className="text-3xl sm:text-4xl font-black mb-3"
                        style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
                      >
                        {services.tabs[0].heading}
                      </h3>
                      {/* H4 */}
                      <h4
                        className="text-lg font-bold mb-6"
                        style={{ color: 'hsl(var(--brand-blue-dark))' }}
                      >
                        {services.tabs[0].subheading}
                      </h4>
                      <p className="text-base leading-relaxed mb-5" style={{ color: 'hsl(var(--muted-foreground))' }}>
                        {services.tabs[0].body1}
                      </p>
                      <p className="text-base leading-relaxed mb-8" style={{ color: 'hsl(var(--muted-foreground))' }}>
                        {services.tabs[0].body2}
                      </p>

                      {/* Commercial categories */}
                      {(services.tabs[0].commercialCategories) && (
                        <div className="flex flex-col gap-8 mb-8">
                          {(services.tabs[0].commercialCategories as CommercialCategory[]).map((cat: CommercialCategory) => (
                            <div
                              key={cat.id}
                              className="rounded-xl border p-6"
                              style={{ borderColor: 'hsl(var(--border))', background: 'hsl(var(--muted))' }}
                            >
                              <h3 className="text-lg font-black mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}>
                                {cat.heading}
                              </h3>
                              <p className="text-sm font-bold mb-2" style={{ color: 'hsl(var(--brand-blue-dark))' }}>
                                {cat.subheading}
                              </p>
                              <p className="text-sm leading-relaxed mb-4" style={{ color: 'hsl(var(--muted-foreground))' }}>
                                {cat.intro}
                              </p>
                              <ul className="flex flex-col gap-2.5">
                                {cat.services.map((svc: TabService) => (
                                  <li key={svc.id} className="flex items-start gap-3">
                                    <CheckIcon />
                                    <div>
                                      <span className="text-sm font-bold" style={{ color: 'hsl(var(--foreground))' }}>{svc.name}</span>
                                      <span className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>{' — '}{svc.description}</span>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}

                      <Link
                        to="/contact"
                        className="inline-block px-8 py-4 rounded-md font-bold text-base transition-all hover:opacity-90"
                        style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--nav-bg))' }}
                      >
                        Get a Commercial Quote
                      </Link>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-2" aria-label="Commercial service areas">
                      <div className="p-6 rounded-2xl border sticky top-32" style={{ borderColor: 'hsl(var(--border))' }}>
                        <h3 className="text-base font-black mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}>
                          Commercial Service Areas
                        </h3>
                        <p className="text-sm mb-4" style={{ color: 'hsl(var(--muted-foreground))' }}>
                          Serving businesses across our service area:
                        </p>
                        <nav aria-label="Commercial service area cities">
                          <ul className="flex flex-col gap-2">
                            {services.cities.map((city: ServiceCity) => (
                              <li key={city.id}>
                                <a
                                  href={city.path}
                                  className="flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-80 group"
                                  style={{ background: 'hsl(var(--muted))', color: 'hsl(var(--foreground))' }}
                                >
                                  <span>{city.name}, NC</span>
                                  <svg className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'hsl(var(--brand-blue-dark))' }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </nav>
                        <div className="mt-5 pt-4" style={{ borderTop: '1px solid hsl(var(--border))' }}>
                          <p className="text-xs font-semibold mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
                            Need commercial service outside these cities? Contact us.
                          </p>
                          <Link
                            to="/contact"
                            className="block text-center px-4 py-2.5 rounded-md text-sm font-bold transition-all hover:opacity-90"
                            style={{ background: 'hsl(var(--nav-bg))', color: 'hsl(var(--nav-text))' }}
                          >
                            Request Commercial Quote
                          </Link>
                        </div>
                      </div>
                    </aside>
                  </div>
                </div>
              </div>
            </article>

            {/* ══════════════════════════════════
                RESIDENTIAL TAB PANEL
            ══════════════════════════════════ */}
            <article
              id="residential-cleaning"
              className={activeTopTab === 'residential' ? 'block' : 'hidden'}
              aria-label="Residential Pressure Washing Services"
            >
              <div>
                {/* ── HERO INTRO BLOCK ── */}
                <div className="bg-background rounded-2xl border p-8 sm:p-10 mb-8" style={{ borderColor: 'hsl(var(--border))' }}>
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

                    {/* Main intro */}
                    <div className="lg:col-span-3">
                      {/* H2 — page-level heading for this tab */}
                      <h2
                        className="text-3xl sm:text-4xl font-black mb-3"
                        style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
                      >
                        Residential Pressure Washing in Raleigh, NC
                      </h2>
                      {/* H3 — benefit subheading */}
                      <h3
                        className="text-xl font-bold mb-5"
                        style={{ color: 'hsl(var(--brand-blue-dark))' }}
                      >
                        Complete Exterior Cleaning for Your Home — Raleigh–Durham Triangle &amp; Beyond
                      </h3>
                      <p className="text-base leading-relaxed mb-4" style={{ color: 'hsl(var(--muted-foreground))' }}>
                        AAA Houston Pressure Washing, LLC delivers full-service residential exterior cleaning throughout the Raleigh–Durham metro. We remove mold, mildew, algae, organic growth, rust stains, oil stains, and years of built-up grime from every surface on your property — using the right pressure and the right chemistry for each job.
                      </p>
                      <p className="text-base leading-relaxed mb-6" style={{ color: 'hsl(var(--muted-foreground))' }}>
                        Whether it's your driveway, house siding, roof, fence, patio, or sidewalk, our team shows up with professional equipment and leaves your home looking its best. Every job is backed by our satisfaction guarantee.
                      </p>

                      {/* Quick-glance service chips */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {[
                          'Mold & Organic Growth Removal',
                          'Rust Stain Removal',
                          'Oil & Grease Degreasing',
                          'Roof Soft Washing',
                          'House Washing',
                          'Driveway Cleaning',
                          'Sidewalk Cleaning',
                          'Fence Cleaning',
                          'Back Patio Cleaning',
                          'Front Patio Cleaning',
                          'Window Washing',
                          'Gutter Cleaning',
                        ].map((chip) => (
                          <span
                            key={chip}
                            className="px-3 py-1 rounded-full text-xs font-bold"
                            style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--nav-bg))' }}
                          >
                            {chip}
                          </span>
                        ))}
                      </div>

                      <Link
                        to="/contact"
                        className="inline-block px-8 py-4 rounded-md font-bold text-base transition-all hover:opacity-90"
                        style={{ background: 'hsl(var(--nav-bg))', color: 'hsl(var(--nav-text))' }}
                      >
                        Get a Free Residential Quote
                      </Link>
                    </div>

                    {/* Sidebar — service areas */}
                    <aside className="lg:col-span-2" aria-label="Residential service areas">
                      <div className="p-6 rounded-2xl border sticky top-32" style={{ borderColor: 'hsl(var(--border))' }}>
                        <h3
                          className="text-base font-black mb-1"
                          style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
                        >
                          Residential Service Areas
                        </h3>
                        <p className="text-sm mb-4" style={{ color: 'hsl(var(--muted-foreground))' }}>
                          We serve homeowners across the Triangle:
                        </p>
                        <nav aria-label="Residential service area cities">
                          <ul className="flex flex-col gap-2">
                            {services.residentialServiceAreas.map((city) => (
                              <li key={city.id}>
                                <a
                                  href={city.path}
                                  className="flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-80 group"
                                  style={{ background: 'hsl(var(--muted))', color: 'hsl(var(--foreground))' }}
                                >
                                  <span>{city.name}, NC</span>
                                  <svg className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'hsl(var(--brand-blue-dark))' }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </nav>
                        <div className="mt-5 pt-4" style={{ borderTop: '1px solid hsl(var(--border))' }}>
                          <p className="text-xs font-semibold mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
                            Don't see your city? We may still serve your area.
                          </p>
                          <Link
                            to="/contact"
                            className="block text-center px-4 py-2.5 rounded-md text-sm font-bold transition-all hover:opacity-90"
                            style={{ background: 'hsl(var(--nav-bg))', color: 'hsl(var(--nav-text))' }}
                          >
                            Ask About Your Area
                          </Link>
                        </div>
                      </div>
                    </aside>
                  </div>
                </div>

                {/* ── MOLD, ALGAE & ORGANIC GROWTH ── */}
                <div className="bg-background rounded-2xl border p-8 sm:p-10 mb-8" style={{ borderColor: 'hsl(var(--border))' }}>
                  <h2
                    className="text-2xl sm:text-3xl font-black mb-2"
                    style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
                  >
                    Mold, Algae &amp; Organic Growth Removal
                  </h2>
                  <h3 className="text-lg font-bold mb-4" style={{ color: 'hsl(var(--brand-blue-dark))' }}>
                    Eliminate Black Mold, Green Algae, Moss &amp; Lichen Before They Damage Your Home
                  </h3>
                  <p className="text-base leading-relaxed mb-4" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    Organic growth — mold, mildew, algae, moss, and lichen — is more than an eyesore. Left untreated, it eats into siding, stains concrete, degrades roof shingles, and creates slippery hazards on walkways and patios. Our soft-wash and pressure-wash treatments use professional-grade biodegradable detergents that kill growth at the root, not just rinse it off the surface.
                  </p>
                  <p className="text-base leading-relaxed mb-6" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    We treat every affected surface — siding, roofing, concrete, wood, and stone — with the correct method so growth doesn't return in weeks. Our process is safe for your landscaping, pets, and family.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { h4: 'Black Mold on Siding', body: 'Soft-wash treatment kills mold spores and removes black streaking from vinyl, aluminum, brick, and stucco without high-pressure damage.' },
                      { h4: 'Green Algae on Concrete', body: 'Hot-water pressure washing with algaecide pre-treatment lifts green algae from driveways, sidewalks, and patios completely.' },
                      { h4: 'Moss on Roof Shingles', body: 'Low-pressure soft washing removes moss and applies a residual treatment that prevents regrowth — safe for asphalt, tile, and metal roofing.' },
                      { h4: 'Lichen on Stone & Brick', body: 'Lichen bonds to porous surfaces and requires dwell-time chemical treatment before gentle rinsing to avoid surface etching.' },
                      { h4: 'Mildew on Wood Decks & Fences', body: 'Wood-safe detergent and controlled pressure removes gray mildew and weathering, restoring natural wood color before staining or sealing.' },
                      { h4: 'Organic Growth on Patios', body: 'Front and back patio surfaces cleaned of all biological growth — stamped concrete, pavers, flagstone, and natural stone all treated correctly.' },
                    ].map((item) => (
                      <div key={item.h4} className="rounded-xl p-5" style={{ background: 'hsl(var(--muted))' }}>
                        <h4 className="text-sm font-black mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}>
                          {item.h4}
                        </h4>
                        <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>{item.body}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── RUST STAIN REMOVAL ── */}
                <div className="bg-background rounded-2xl border p-8 sm:p-10 mb-8" style={{ borderColor: 'hsl(var(--border))' }}>
                  <h2
                    className="text-2xl sm:text-3xl font-black mb-2"
                    style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
                  >
                    Rust Stain Removal
                  </h2>
                  <h3 className="text-lg font-bold mb-4" style={{ color: 'hsl(var(--brand-blue-dark))' }}>
                    Stubborn Orange &amp; Brown Rust Stains on Concrete, Brick &amp; Stone — Gone
                  </h3>
                  <p className="text-base leading-relaxed mb-4" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    Rust stains from irrigation systems, metal furniture, downspouts, and fertilizer are some of the most stubborn stains on exterior surfaces. Standard pressure washing alone won't remove them — they require a professional-grade oxalic acid or rust-specific chemical treatment applied before washing.
                  </p>
                  <p className="text-base leading-relaxed mb-6" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    Our rust removal process is safe for concrete, brick, pavers, and natural stone. We pre-treat the stain, allow proper dwell time, then pressure wash for a clean, even finish. Results vary by stain age and surface porosity, but most rust stains are dramatically reduced or fully eliminated in a single treatment.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { h4: 'Driveway & Sidewalk Rust', body: 'Orange staining from irrigation heads, metal edging, and fertilizer on concrete and asphalt treated with oxalic acid pre-wash.' },
                      { h4: 'Brick & Mortar Rust Staining', body: 'Rust bleed from metal ties, flashing, and fixtures on brick exteriors treated carefully to avoid mortar damage.' },
                      { h4: 'Patio & Pool Deck Rust', body: 'Rust from furniture legs, planters, and metal fixtures on patio surfaces removed before sealing or recoating.' },
                    ].map((item) => (
                      <div key={item.h4} className="rounded-xl p-5" style={{ background: 'hsl(var(--muted))' }}>
                        <h4 className="text-sm font-black mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}>
                          {item.h4}
                        </h4>
                        <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>{item.body}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── OIL & GREASE DEGREASING ── */}
                <div className="bg-background rounded-2xl border p-8 sm:p-10 mb-8" style={{ borderColor: 'hsl(var(--border))' }}>
                  <h2
                    className="text-2xl sm:text-3xl font-black mb-2"
                    style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
                  >
                    Oil Stain &amp; Grease Degreasing
                  </h2>
                  <h3 className="text-lg font-bold mb-4" style={{ color: 'hsl(var(--brand-blue-dark))' }}>
                    Deep-Clean Oil, Grease &amp; Automotive Fluid Stains from Driveways &amp; Garage Floors
                  </h3>
                  <p className="text-base leading-relaxed mb-4" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    Motor oil, transmission fluid, grease, and cooking oil penetrate deep into concrete pores and can't be removed with water alone. We apply a commercial-grade alkaline degreaser, agitate the surface, allow full dwell time, then hot-water pressure wash to lift the stain from the pore — not just the surface.
                  </p>
                  <p className="text-base leading-relaxed mb-6" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    Fresh stains respond best, but even old, set-in oil stains see significant improvement. We're honest about results — if a stain has been there for years, we'll tell you what to expect before we start.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { h4: 'Driveway Oil Stains', body: 'Alkaline degreaser pre-treatment + hot-water pressure washing for motor oil, transmission fluid, and brake fluid stains on concrete and asphalt.' },
                      { h4: 'Garage Floor Degreasing', body: 'Full garage floor degreasing and pressure washing — removes years of automotive fluid buildup from concrete slabs.' },
                      { h4: 'Grease on Patio & Walkways', body: 'Cooking grease and food oil stains from grills and outdoor kitchens removed from concrete, pavers, and stone.' },
                      { h4: 'Tire Marks & Rubber Burns', body: 'Hot tire pickup and rubber transfer marks on concrete driveways treated with degreaser and surface cleaner for even removal.' },
                    ].map((item) => (
                      <div key={item.h4} className="rounded-xl p-5" style={{ background: 'hsl(var(--muted))' }}>
                        <h4 className="text-sm font-black mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}>
                          {item.h4}
                        </h4>
                        <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>{item.body}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── ROOF CLEANING ── */}
                <div className="bg-background rounded-2xl border p-8 sm:p-10 mb-8" style={{ borderColor: 'hsl(var(--border))' }}>
                  <h2
                    className="text-2xl sm:text-3xl font-black mb-2"
                    style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
                  >
                    Roof Soft Washing &amp; Cleaning
                  </h2>
                  <h3 className="text-lg font-bold mb-4" style={{ color: 'hsl(var(--brand-blue-dark))' }}>
                    Remove Black Algae Streaks &amp; Moss Without Voiding Your Roof Warranty
                  </h3>
                  <p className="text-base leading-relaxed mb-4" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    Those dark black streaks on your roof aren't dirt — they're Gloeocapsa magma, a bacteria that feeds on the limestone filler in asphalt shingles. Left untreated, it shortens shingle life and voids manufacturer warranties. High-pressure washing damages shingles and granules. The correct method is soft washing: low-pressure application of a sodium hypochlorite-based solution that kills the bacteria, algae, and moss at the root.
                  </p>
                  <p className="text-base leading-relaxed mb-6" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    Our roof soft washing is safe for asphalt shingles, metal roofing, tile, and cedar shake. We protect your landscaping with pre-rinse and neutralizer application before and after treatment.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { h4: 'Asphalt Shingle Roof Cleaning', body: 'Soft-wash treatment removes black algae streaks and moss — safe for all shingle types and manufacturer warranty-compliant.' },
                      { h4: 'Metal Roof Cleaning', body: 'Low-pressure wash removes oxidation, algae, and staining from standing seam and corrugated metal roofing.' },
                      { h4: 'Tile Roof Cleaning', body: 'Concrete and clay tile cleaned of moss, lichen, and biological growth without dislodging tiles or cracking grout.' },
                      { h4: 'Moss & Lichen Treatment', body: 'Residual moss and lichen treatment applied after cleaning to slow regrowth — extends time between cleanings significantly.' },
                    ].map((item) => (
                      <div key={item.h4} className="rounded-xl p-5" style={{ background: 'hsl(var(--muted))' }}>
                        <h4 className="text-sm font-black mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}>
                          {item.h4}
                        </h4>
                        <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>{item.body}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── DRIVEWAY & SIDEWALK ── */}
                <div className="bg-background rounded-2xl border p-8 sm:p-10 mb-8" style={{ borderColor: 'hsl(var(--border))' }}>
                  <h2
                    className="text-2xl sm:text-3xl font-black mb-2"
                    style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
                  >
                    Driveway &amp; Sidewalk Cleaning
                  </h2>
                  <h3 className="text-lg font-bold mb-4" style={{ color: 'hsl(var(--brand-blue-dark))' }}>
                    Restore Curb Appeal from the Ground Up — Concrete, Asphalt &amp; Pavers
                  </h3>
                  <p className="text-base leading-relaxed mb-4" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    Your driveway and sidewalks are the first thing visitors see. Years of tire marks, oil stains, algae growth, and embedded dirt make even a well-maintained home look neglected. We use a commercial surface cleaner attachment — not a wand — for streak-free, even cleaning across the entire surface.
                  </p>
                  <p className="text-base leading-relaxed mb-6" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    We clean concrete, asphalt, brick pavers, and exposed aggregate. Every driveway job includes an edge detail and post-rinse to clear all debris from the property.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { h4: 'Concrete Driveway Cleaning', body: 'Hot-water surface cleaner wash removes tire marks, oil stains, algae, and embedded dirt — streak-free results on all concrete finishes.' },
                      { h4: 'Asphalt Driveway Cleaning', body: 'Lower-pressure wash safe for asphalt binders removes surface grime, algae, and staining without disturbing the surface.' },
                      { h4: 'Paver & Brick Driveway', body: 'Detailed cleaning that preserves joint sand and existing sealer — removes weeds, moss, and staining between pavers.' },
                      { h4: 'Sidewalk & Walkway Cleaning', body: 'Front entry walks, side paths, and public sidewalks cleaned to match your driveway — complete curb appeal package.' },
                      { h4: 'Concrete Apron & Curb', body: 'Street apron and curb face cleaned of tire marks and road grime for a finished, complete look.' },
                      { h4: 'Exposed Aggregate Cleaning', body: 'Careful surface cleaning that removes staining without dislodging aggregate stones or damaging the finish.' },
                    ].map((item) => (
                      <div key={item.h4} className="rounded-xl p-5" style={{ background: 'hsl(var(--muted))' }}>
                        <h4 className="text-sm font-black mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}>
                          {item.h4}
                        </h4>
                        <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>{item.body}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── FENCE CLEANING ── */}
                <div className="bg-background rounded-2xl border p-8 sm:p-10 mb-8" style={{ borderColor: 'hsl(var(--border))' }}>
                  <h2
                    className="text-2xl sm:text-3xl font-black mb-2"
                    style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
                  >
                    Fence Cleaning
                  </h2>
                  <h3 className="text-lg font-bold mb-4" style={{ color: 'hsl(var(--brand-blue-dark))' }}>
                    Wood, Vinyl &amp; Metal Fences Cleaned &amp; Restored
                  </h3>
                  <p className="text-base leading-relaxed mb-4" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    Fences take a beating from North Carolina's humid climate — green algae, black mold, and gray weathering build up fast on wood and vinyl. A professional cleaning restores the original color, removes biological growth, and preps wood surfaces for staining or sealing.
                  </p>
                  <p className="text-base leading-relaxed mb-6" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    We adjust pressure and chemical treatment based on fence material — wood gets a soft-wash detergent treatment, vinyl gets a low-pressure rinse, and metal gets a rust-inhibiting wash.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { h4: 'Wood Privacy Fence Cleaning', body: 'Removes green algae, black mold, and gray weathering from cedar, pine, and treated lumber — preps surface for stain or sealant.' },
                      { h4: 'Vinyl Fence Cleaning', body: 'Low-pressure soft wash restores bright white or tan vinyl to like-new condition — removes green algae and oxidation.' },
                      { h4: 'Metal & Wrought Iron Fence', body: 'Rust-inhibiting wash removes surface rust, dirt, and oxidation from metal fencing — safe for painted and powder-coated finishes.' },
                    ].map((item) => (
                      <div key={item.h4} className="rounded-xl p-5" style={{ background: 'hsl(var(--muted))' }}>
                        <h4 className="text-sm font-black mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}>
                          {item.h4}
                        </h4>
                        <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>{item.body}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── FRONT & BACK PATIO ── */}
                <div className="bg-background rounded-2xl border p-8 sm:p-10 mb-8" style={{ borderColor: 'hsl(var(--border))' }}>
                  <h2
                    className="text-2xl sm:text-3xl font-black mb-2"
                    style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
                  >
                    Front Patio &amp; Back Patio Cleaning
                  </h2>
                  <h3 className="text-lg font-bold mb-4" style={{ color: 'hsl(var(--brand-blue-dark))' }}>
                    Bring Your Outdoor Living Spaces Back to Life
                  </h3>
                  <p className="text-base leading-relaxed mb-4" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    Patios accumulate mold, algae, leaf stains, grease, and general grime from outdoor living. Whether your patio is stamped concrete, natural stone, brick pavers, or composite decking, we clean it with the right method for the material — no guesswork, no damage.
                  </p>
                  <p className="text-base leading-relaxed mb-6" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    Front patios and entry areas get the same thorough treatment as back patios. We clean the surface, edges, steps, and any surrounding retaining walls or planters as part of the job.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { h4: 'Stamped Concrete Patio', body: 'Surface cleaning that protects decorative patterns and existing sealers — removes algae, staining, and embedded dirt without etching.' },
                      { h4: 'Natural Stone & Flagstone', body: 'Gentle cleaning that preserves stone texture and natural color — removes moss, lichen, and organic staining from all stone types.' },
                      { h4: 'Brick Paver Patio', body: 'Detailed paver cleaning that removes weeds, moss, and staining while preserving joint sand and existing sealer.' },
                      { h4: 'Concrete Slab Patio', body: 'Hot-water surface cleaner wash removes all biological growth, staining, and embedded dirt from plain and brushed concrete.' },
                      { h4: 'Wood & Composite Deck', body: 'Wood-safe detergent treatment removes mold, mildew, and gray weathering from wood decks — composite decks cleaned at low pressure.' },
                      { h4: 'Steps, Risers & Retaining Walls', body: 'Entry steps, patio risers, and surrounding retaining walls cleaned as part of the full patio package.' },
                    ].map((item) => (
                      <div key={item.h4} className="rounded-xl p-5" style={{ background: 'hsl(var(--muted))' }}>
                        <h4 className="text-sm font-black mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}>
                          {item.h4}
                        </h4>
                        <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>{item.body}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── HOUSE WASHING ── */}
                <div className="bg-background rounded-2xl border p-8 sm:p-10 mb-8" style={{ borderColor: 'hsl(var(--border))' }}>
                  <h2
                    className="text-2xl sm:text-3xl font-black mb-2"
                    style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
                  >
                    House Washing &amp; Soft Washing
                  </h2>
                  <h3 className="text-lg font-bold mb-4" style={{ color: 'hsl(var(--brand-blue-dark))' }}>
                    Full Exterior Home Cleaning — Safe for All Siding Types
                  </h3>
                  <p className="text-base leading-relaxed mb-4" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    Your home's exterior collects mold, mildew, algae, pollen, and oxidation year-round. We use low-pressure soft washing with professional-grade biodegradable detergents to safely clean every surface — no high-pressure blasting that damages siding, paint, or trim.
                  </p>
                  <p className="text-base leading-relaxed mb-6" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    A full house wash includes siding, fascia, soffits, window frames, and exterior trim. We work top-to-bottom and rinse thoroughly so no detergent residue is left behind.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { h4: 'Vinyl & Aluminum Siding', body: 'Soft-wash removes black mold streaks, green algae, and oxidation — restores original color without high-pressure damage.' },
                      { h4: 'Brick & Stucco Exterior', body: 'Low-pressure rinse lifts dirt and biological growth without eroding mortar joints or stucco texture.' },
                      { h4: 'Wood Siding & Lap Board', body: 'Wood-safe detergent and controlled pressure removes mold and weathering from painted and stained wood siding.' },
                      { h4: 'Fascia, Soffits & Trim', body: 'Exterior fascia boards, soffits, and window trim cleaned of mold, oxidation, and pollen as part of the full house wash.' },
                    ].map((item) => (
                      <div key={item.h4} className="rounded-xl p-5" style={{ background: 'hsl(var(--muted))' }}>
                        <h4 className="text-sm font-black mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}>
                          {item.h4}
                        </h4>
                        <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>{item.body}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── WINDOW WASHING ── */}
                <div className="bg-background rounded-2xl border p-8 sm:p-10 mb-8" style={{ borderColor: 'hsl(var(--border))' }}>
                  <h2
                    className="text-2xl sm:text-3xl font-black mb-2"
                    style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
                  >
                    Window Washing &amp; Gutter Cleaning
                  </h2>
                  <h3 className="text-lg font-bold mb-4" style={{ color: 'hsl(var(--brand-blue-dark))' }}>
                    Crystal-Clear Windows &amp; Free-Flowing Gutters — the Finishing Touch
                  </h3>
                  <p className="text-base leading-relaxed mb-4" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    Streak-free window cleaning and thorough gutter flushing complete a full exterior cleaning service. We clean all ground-floor and second-story exterior windows, remove and wash screens, and flush gutters and downspouts clear of debris.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { h4: 'Exterior Window Washing', body: 'Squeegee-finished cleaning for all ground-floor and second-story windows — streak-free results every time.' },
                      { h4: 'Screen Cleaning', body: 'Window screens removed, washed, and reinstalled — removes pollen, dust, and debris that blocks airflow and light.' },
                      { h4: 'Gutter Flushing', body: 'Downspouts and gutters flushed clear of leaves, debris, and blockages — prevents water damage and foundation issues.' },
                      { h4: 'Gutter Exterior Brightening', body: 'Tiger-stripe stain removal from the outside face of gutters — restores white or tan gutters to like-new appearance.' },
                    ].map((item) => (
                      <div key={item.h4} className="rounded-xl p-5" style={{ background: 'hsl(var(--muted))' }}>
                        <h4 className="text-sm font-black mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}>
                          {item.h4}
                        </h4>
                        <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>{item.body}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── BOTTOM CTA ── */}
                <div
                  className="rounded-2xl p-8 sm:p-10 text-center"
                  style={{ background: 'hsl(var(--nav-bg))' }}
                >
                  <h2
                    className="text-2xl sm:text-3xl font-black mb-3"
                    style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--nav-text))' }}
                  >
                    Ready to Schedule Your Residential Cleaning?
                  </h2>
                  <h3 className="text-lg font-semibold mb-5" style={{ color: 'hsl(var(--primary))' }}>
                    Serving Raleigh, Cary, Apex, Garner, Holly Springs, Morrisville, Clayton, Wake Forest, Durham &amp; Fuquay-Varina
                  </h3>
                  <p className="text-base mb-6 max-w-xl mx-auto" style={{ color: 'hsl(var(--nav-text) / 0.85)' }}>
                    Call us at <strong style={{ color: 'hsl(var(--primary))' }}>(919) 473-3550</strong> or request a free quote online. We respond same day, Monday–Saturday 7am–7pm.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      to="/contact"
                      className="inline-block px-8 py-4 rounded-md font-bold text-base transition-all hover:opacity-90"
                      style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--nav-bg))' }}
                    >
                      Get a Free Quote
                    </Link>
                    <a
                      href="tel:+19194733550"
                      className="inline-block px-8 py-4 rounded-md font-bold text-base border-2 transition-all hover:opacity-90"
                      style={{ borderColor: 'hsl(var(--primary))', color: 'hsl(var(--primary))' }}
                    >
                      Call (919) 473-3550
                    </a>
                  </div>
                </div>

              </div>
            </article>

            {/* ══════════════════════════════════
                REMAINING CONTENT-DRIVEN TAB PANELS
                (all tabs except index 0 = Commercial)
            ══════════════════════════════════ */}
            {services.tabs.map((tab: ServiceTab, i: number) => i === 0 ? null : (
              <article
                key={tab.id}
                id={tab.slug}
                className={activeTopTab === i ? 'block' : 'hidden'}
                aria-label={tab.heading}
              >
                <div>
                  <div className="bg-background rounded-2xl border p-8 sm:p-10" style={{ borderColor: 'hsl(var(--border))' }}>
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

                      <div className="lg:col-span-3">
                        {/* H3 */}
                        <h3
                          className="text-3xl sm:text-4xl font-black mb-3"
                          style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
                        >
                          {tab.heading}
                        </h3>
                        {/* H4 */}
                        <h4
                          className="text-lg font-bold mb-6"
                          style={{ color: 'hsl(var(--brand-blue-dark))' }}
                        >
                          {tab.subheading}
                        </h4>
                        <p className="text-base leading-relaxed mb-5" style={{ color: 'hsl(var(--muted-foreground))' }}>
                          {tab.body1}
                        </p>
                        <p className="text-base leading-relaxed mb-8" style={{ color: 'hsl(var(--muted-foreground))' }}>
                          {tab.body2}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                          {tab.features.map((f: TabFeature) => (
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

                        <Link
                          to="/contact"
                          className="inline-block px-8 py-4 rounded-md font-bold text-base transition-all hover:opacity-90"
                          style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--nav-bg))' }}
                        >
                          Get a Free Quote
                        </Link>
                      </div>

                      {/* Sidebar */}
                      <aside className="lg:col-span-2" aria-label="Service areas">
                        <div className="p-6 rounded-2xl border sticky top-32" style={{ borderColor: 'hsl(var(--border))' }}>
                          <h3
                            className="text-base font-black mb-1"
                            style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
                          >
                            {tab.label} Service Areas
                          </h3>
                          <p className="text-sm mb-4" style={{ color: 'hsl(var(--muted-foreground))' }}>
                            Serving these cities:
                          </p>
                          <nav aria-label={`${tab.label} service area cities`}>
                            <ul className="flex flex-col gap-2">
                              {services.cities.map((city: ServiceCity) => (
                                <li key={city.id}>
                                  <a
                                    href={city.path}
                                    className="flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-80 group"
                                    style={{ background: 'hsl(var(--muted))', color: 'hsl(var(--foreground))' }}
                                  >
                                    <span>{city.name}, NC</span>
                                    <svg
                                      className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                      style={{ color: 'hsl(var(--brand-blue-dark))' }}
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </nav>
                          <div className="mt-5 pt-4" style={{ borderTop: '1px solid hsl(var(--border))' }}>
                            <p className="text-xs font-semibold mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
                              Don't see your city? We may still serve your area.
                            </p>
                            <Link
                              to="/contact"
                              className="block text-center px-4 py-2.5 rounded-md text-sm font-bold transition-all hover:opacity-90"
                              style={{ background: 'hsl(var(--nav-bg))', color: 'hsl(var(--nav-text))' }}
                            >
                              Ask About Your Area
                            </Link>
                          </div>
                        </div>
                      </aside>

                    </div>
                  </div>
                </div>
              </article>
            ))}

          </div>
        </section>

        {/* ════════════════════════════════════════
            GOOGLE REVIEWS
        ════════════════════════════════════════ */}
        <section id="google-reviews" className="py-20" style={{ background: 'hsl(var(--muted))' }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="text-center mb-12"
            >
              <motion.p
                variants={fadeUp}
                className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
                style={{ background: 'hsl(var(--nav-bg))', color: 'hsl(var(--nav-text))' }}
              >
                5-Star Rated
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl font-black mb-3"
                style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
              >
                What Our Customers Say
              </motion.h2>
              <motion.h3
                variants={fadeUp}
                className="text-lg font-bold mb-4"
                style={{ color: 'hsl(var(--brand-blue-dark))' }}
              >
                Real Reviews from Real Raleigh-Area Homeowners
              </motion.h3>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <GoogleReviews reviews={[]} title="" maxVisible={6} />
              <div className="mt-8 text-center">
                <a
                  href="https://share.google/87vVLVFdRtDCbO11b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-md font-bold text-base transition-all hover:opacity-90"
                  style={{ background: 'hsl(var(--nav-bg))', color: 'hsl(var(--nav-text))' }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                  </svg>
                  View All Our Google Reviews
                </a>
                <p className="mt-3 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  See what Raleigh-area homeowners are saying about AAA Houston Pressure Washing, LLC
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            CTA BANNER
        ════════════════════════════════════════ */}
        <section className="py-16" style={{ background: 'hsl(var(--primary))' }}>
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2
              className="text-3xl sm:text-4xl font-black mb-4"
              style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--nav-bg))' }}
            >
              Ready to Get Started?
            </h2>
            <p className="text-base mb-8" style={{ color: 'hsl(var(--nav-bg) / 0.8)' }}>
              Get your free, no-obligation quote today. Serving Raleigh, Cary, Apex, Garner, Wake Forest, Durham, Holly Springs, Clayton, Fuquay-Varina &amp; Morrisville.
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
