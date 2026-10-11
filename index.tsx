import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import React from 'react';
import WaterStreams from '@/components/WaterStreams';
import { home, services } from 'virtual:content';
const siteUrl = 'https://raleighpressurewashing.com';
const pageUrl = siteUrl;
const ogImage = `${siteUrl}/og-image.jpg`;

const iconMap: Record<string, React.ReactElement> = {
  star: (
    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ),
  calendar: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  shield: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  tag: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  ),
  check: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  ),
};

const serviceImages = [
  '/airo-assets/images/pages/home/before-after-driveway',
  '/airo-assets/images/pages/home/before-after-house-washing',
  '/airo-assets/images/pages/home/service-patio-cleaning',
  '/airo-assets/images/pages/home/service-drivethru-cleaning',
  '/airo-assets/images/pages/home/service-exterior-building',
  '/airo-assets/images/pages/home/service-commercial-cleaning',
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `${siteUrl}/#organization`,
        name: 'AAA Houston Pressure Washing, LLC',
        url: siteUrl,
        telephone: '+19194733550',
        foundingDate: '2010',
        description: '5-star rated pressure washing in Raleigh, NC. House washing, driveways, & sidewalks since 2010.',
        areaServed: ['Raleigh', 'Cary', 'Apex', 'Garner', 'Wake Forest', 'Durham', 'Holly Springs', 'Fuquay-Varina'],
        address: { '@type': 'PostalAddress', addressLocality: 'Raleigh', addressRegion: 'NC', addressCountry: 'US' },
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', reviewCount: '100' },
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'AAA Houston Pressure Washing, LLC',
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: 'Pressure Washing Raleigh NC | AAA Houston Pressure Washing, LLC',
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': `${siteUrl}/#organization` },
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Pressure Washing Raleigh NC | AAA Houston Pressure Washing, LLC</title>
        <meta name="description" content="5-star rated pressure washing in Raleigh, NC. Trust AAA Houston Pressure Washing, LLC since 2010 for house washing, driveways, & sidewalks. Get a free quote!" />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content="Pressure Washing Raleigh NC | AAA Houston Pressure Washing, LLC" />
        <meta property="og:description" content="5-star rated pressure washing in Raleigh, NC. Trust AAA Houston Pressure Washing, LLC since 2010 for house washing, driveways, & sidewalks. Get a free quote!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pressure Washing Raleigh NC | AAA Houston Pressure Washing, LLC" />
        <meta name="twitter:description" content="5-star rated pressure washing in Raleigh, NC. Trust AAA Houston Pressure Washing, LLC since 2010 for house washing, driveways, & sidewalks. Get a free quote!" />
        <meta name="twitter:image" content={ogImage} />
        <script type="application/ld+json">{JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>
      </Helmet>

      <main>
        {/* ── Water streams flowing down from header ── */}
        <WaterStreams direction="down" height={56} />

        {/* ── HERO ── */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <img
            src="/airo-assets/images/pages/home/hero"
            alt="Professional pressure washing service in Raleigh NC"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'hsl(var(--hero-overlay) / 0.65)' }} />
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32 pt-40">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <motion.p
                variants={fadeUp}
                className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
                style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--nav-bg))' }}
              >
                Serving Raleigh & Surrounding Cities Since 2010
              </motion.p>
              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6"
                style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--nav-text))' }}
              >
                {home.hero.headline}
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
                style={{ color: 'hsl(var(--nav-text) / 0.85)' }}
              >
                {home.hero.subheadline}
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/contact"
                  className="px-8 py-4 rounded-md text-base font-bold transition-all duration-200 hover:opacity-90 hover:scale-105"
                  style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--nav-bg))' }}
                >
                  {home.hero.cta_primary}
                </Link>
                <a
                  href="tel:+19194733550"
                  className="px-8 py-4 rounded-md text-base font-bold border-2 transition-all duration-200 hover:opacity-90"
                  style={{ borderColor: 'hsl(var(--nav-text))', color: 'hsl(var(--nav-text))' }}
                >
                  {home.hero.cta_primary}
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── TRUST STRIP ── */}
        <section style={{ background: 'hsl(var(--nav-bg))' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 items-start">
              {home.trust_items.map((item: { id: string; value: string; label: string; icon?: string }) => (
                <div key={item.id} className="flex flex-col items-center text-center gap-2">
                  <div className="h-8 flex items-center justify-center" style={{ color: 'hsl(var(--primary))' }}>
                    {item.icon ? (iconMap[item.icon] ?? null) : null}
                  </div>
                  <span className="text-xl font-black" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--nav-text))' }}>
                    {item.value}
                  </span>
                  <span className="text-xs font-medium" style={{ color: 'hsl(var(--nav-text) / 0.6)' }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="text-center mb-16"
            >
              <motion.p variants={fadeUp} className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: 'hsl(var(--brand-blue-dark))' }}>
                What We Do
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}>
                Pressure Washing Services in Raleigh, NC &amp; Surrounding Cities
              </motion.h2>
            </motion.div>

            <div className="flex flex-col gap-20">
              {home.services.map((service, idx) => (
                <motion.div
                  key={service.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={stagger}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                  style={{ direction: idx % 2 === 1 ? 'rtl' : 'ltr' }}
                >
                  <motion.div
                    variants={fadeUp}
                    className="rounded-2xl shadow-lg overflow-hidden"
                    style={{ direction: 'ltr' }}
                  >
                    <img
                      src={serviceImages[idx]}
                      alt={service.title}
                      className="w-full h-auto block"
                      loading="lazy"
                      width={800}
                      height={600}
                    />
                  </motion.div>
                  <motion.div variants={fadeUp} style={{ direction: 'ltr' }} className="flex flex-col gap-4">
                    <p className="text-sm font-bold uppercase tracking-widest" style={{ color: 'hsl(var(--brand-blue-dark))' }}>
                      {service.title}
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-black" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}>
                      {service.title}
                    </h3>
                    <p className="text-base leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      {service.description}
                    </p>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 text-sm font-bold mt-2 transition-all duration-200 hover:gap-3"
                      style={{ color: 'hsl(var(--brand-blue-dark))' }}
                    >
                      Get a Free Quote
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SEO KEYWORD SECTIONS ── */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="text-center mb-16"
            >
              <motion.p variants={fadeUp} className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: 'hsl(var(--brand-blue-dark))' }}>
                Specialized Stain Removal
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}>
                Expert Pressure Washing for Every Stain in Raleigh, NC
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-4 text-base max-w-2xl mx-auto leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                From stubborn mold and organic growth to rust and oil stains — we use the right equipment and professional-grade treatments to restore your property.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {/* Card 1 — Mold & Algae */}
              <motion.div
                variants={fadeUp}
                className="p-8 rounded-2xl border"
                style={{ borderColor: 'hsl(var(--border))', background: 'hsl(var(--card))' }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-5" style={{ background: 'hsl(var(--brand-blue))' }}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'hsl(var(--nav-text))' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <h3 className="text-xl font-black mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}>
                  Professional House Washing and Mold Removal in Raleigh, NC
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  Are ugly green mold, black algae, or mildew ruining your home's curb appeal? Our specialized soft wash roof cleaning and siding treatments don't just blast surface grime away — they kill organic growth at the root. We use eco-friendly, low-pressure solutions that safely eliminate mold and algae from vinyl siding, brick, and stucco without causing damage to your property.
                </p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide" style={{ color: 'hsl(var(--brand-blue-dark))' }}>
                  House washing Raleigh · Soft wash roof cleaning · Siding mold removal · Black algae stains · Mildew removal
                </p>
              </motion.div>

              {/* Card 2 — Organic Growth */}
              <motion.div
                variants={fadeUp}
                className="p-8 rounded-2xl border"
                style={{ borderColor: 'hsl(var(--border))', background: 'hsl(var(--card))' }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-5" style={{ background: 'hsl(var(--brand-blue))' }}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'hsl(var(--nav-text))' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-black mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}>
                  Say Goodbye to Slippery Patio Moss and Organic Growth
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  Slippery green slime and stubborn lichen aren't just eyesores — they are slip hazards that destroy your outdoor living spaces. Our professional deck power washing and concrete cleaning services safely extract embedded organic growth from wood, composite decks, pavers, and patios. Restore safety and beauty to your property today.
                </p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide" style={{ color: 'hsl(var(--brand-blue-dark))' }}>
                  Deck power washing · Patio moss removal · Concrete lichen cleaning · Fence restoration · Driveway organic growth removal
                </p>
              </motion.div>

              {/* Card 3 — Rust Stains */}
              <motion.div
                variants={fadeUp}
                className="p-8 rounded-2xl border"
                style={{ borderColor: 'hsl(var(--border))', background: 'hsl(var(--card))' }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-5" style={{ background: 'hsl(var(--brand-blue))' }}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'hsl(var(--nav-text))' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-black mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}>
                  Advanced Concrete Rust Stain Removal Services in Raleigh
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  Orange rust streaks from irrigation systems, lawn fertilizers, or metal patio furniture can permanently stain your concrete. Standard pressure washing won't touch it. We use professional-grade, specialized chemicals to safely dissolve concrete rust stains without etching your driveway, restoring your masonry back to its original condition.
                </p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide" style={{ color: 'hsl(var(--brand-blue-dark))' }}>
                  Rust stain removal Raleigh · Fertilizer stain cleaning · Metal rust cleaning · Concrete rust remediation
                </p>
              </motion.div>

              {/* Card 4 — Oil & Grease */}
              <motion.div
                variants={fadeUp}
                className="p-8 rounded-2xl border"
                style={{ borderColor: 'hsl(var(--border))', background: 'hsl(var(--card))' }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-5" style={{ background: 'hsl(var(--brand-blue))' }}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'hsl(var(--nav-text))' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-black mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}>
                  Driveway Oil Stain Removal &amp; Concrete Degreasing in Raleigh
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  Leaky vehicles leaving dark, unsightly oil patches on your driveway or garage floor? Our high-temperature commercial power washer equipment combined with heavy-duty degreasers breaks down deeply embedded oil, transmission fluid, and grease stains. Don't let old leaks lower your home value — get a spotless finish with our professional driveway oil stain removal.
                </p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide" style={{ color: 'hsl(var(--brand-blue-dark))' }}>
                  Driveway oil stain removal · Garage floor degreasing · Commercial power washer Raleigh · Parking lot grease cleaning
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' as const }}
              className="text-center mt-12"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-base font-black transition-all duration-200 hover:scale-105 hover:brightness-110"
                style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--nav-bg))', boxShadow: '0 0 20px hsl(var(--primary)/0.5)' }}
              >
                Get Your Free Quote Today
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── BRAND LOGO SHOWCASE ── */}
        <section className="py-20" style={{ background: 'hsl(var(--background))' }}>
          <div className="flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <img
                src="/airo-assets/uploads/logo-horizontal-826d2a9b.png"
                alt="AAA Houston Pressure Washing, LLC — Raleigh NC"
                width={432}
                height={208}
                style={{ display: 'block', width: '640px', height: 'auto', maxWidth: '100%' }}
                loading="lazy"
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              className="mt-8 text-2xl font-extrabold tracking-wide text-center"
              style={{ color: 'hsl(var(--accent))', fontFamily: 'var(--font-heading)' }}
            >
              Raleigh's Trusted Pressure Washing Professionals
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
              className="mt-3 text-base font-semibold text-center max-w-md"
              style={{ color: 'hsl(var(--muted-foreground))' }}
            >
              Fully insured · 5-star rated · Serving the Triangle since 2010
            </motion.p>
          </div>
        </section>

        {/* ── WHY CHOOSE US ── */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="text-center mb-16"
            >
              <motion.p variants={fadeUp} className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: 'hsl(var(--brand-blue-dark))' }}>
                Why Choose Us
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}>
                Why Raleigh Homeowners Trust AAA Houston Pressure Washing, LLC
              </motion.h2>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {home.why_items.map((item: { id: string; title: string; body: string }) => (
                <motion.div
                  key={item.id}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="p-8 rounded-2xl border"
                  style={{ borderColor: 'hsl(var(--border))', background: 'hsl(var(--card))' }}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ background: 'hsl(var(--brand-blue))' }}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" style={{ color: 'hsl(var(--nav-text))' }}>
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-black mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    {item.body}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── SERVICE AREAS ── */}
        <section className="py-20" style={{ background: 'hsl(var(--muted))' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.p variants={fadeUp} className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: 'hsl(var(--brand-blue-dark))' }}>
                Where We Work
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}>
                {home.areas_heading}
              </motion.h2>
              <motion.p variants={fadeUp} className="text-base max-w-2xl mx-auto mb-10" style={{ color: 'hsl(var(--muted-foreground))' }}>
                {home.areas_subheading}
              </motion.p>
              <motion.div variants={stagger} className="flex flex-wrap justify-center gap-3 mb-10">
                {services.cities.map((city: { id: string; name: string; path: string }) => (
                  <motion.div key={city.id} variants={fadeUp}>
                    <a
                      href={city.path}
                      className="px-5 py-2.5 rounded-full text-sm font-semibold border-2 transition-all duration-200 hover:scale-105 inline-block"
                      style={{ borderColor: 'hsl(var(--brand-blue))', color: 'hsl(var(--brand-blue-dark))', background: 'hsl(var(--background))' }}
                    >
                      <span>{city.name}</span><span>, NC</span>
                    </a>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div variants={fadeUp}>
                <Link
                  to="/service-areas"
                  className="inline-flex items-center gap-2 text-sm font-bold transition-all duration-200 hover:gap-3"
                  style={{ color: 'hsl(var(--brand-blue-dark))' }}
                >
                  View All Service Areas
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section className="py-20" style={{ background: 'hsl(var(--primary))' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4"
                style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--nav-bg))' }}
              >
                {home.cta_banner.heading}
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-base sm:text-lg mb-10 max-w-2xl mx-auto"
                style={{ color: 'hsl(var(--nav-bg) / 0.8)' }}
              >
                {home.cta_banner.subheading}
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/contact"
                  className="inline-block px-10 py-4 rounded-md text-base font-bold transition-all duration-200 hover:opacity-90 hover:scale-105"
                  style={{ background: 'hsl(var(--nav-bg))', color: 'hsl(var(--primary))' }}
                >
                  {home.cta_banner.cta_primary}
                </Link>
                <a
                  href="https://g.page/r/CZhT8P3mvfoaEB0/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-md text-base font-bold border-2 transition-all duration-200 hover:opacity-90"
                  style={{ borderColor: 'hsl(var(--nav-bg))', color: 'hsl(var(--nav-bg))' }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Leave Us a Review
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
