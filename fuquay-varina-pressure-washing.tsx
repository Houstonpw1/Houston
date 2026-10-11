import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { fuquay_varina } from 'virtual:content';

const siteUrl = 'https://raleighpressurewashing.com';
const pageUrl = `${siteUrl}/fuquay-varina-pressure-washing`;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export default function FuquayVarinaPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        name: fuquay_varina.meta.title,
        url: pageUrl,
        description: fuquay_varina.meta.description,
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': `${siteUrl}/#organization` },
      },
      {
        '@type': 'Service',
        name: 'Pressure Washing in Fuquay-Varina, NC',
        provider: { '@id': `${siteUrl}/#organization` },
        areaServed: { '@type': 'City', name: 'Fuquay-Varina, NC' },
        url: pageUrl,
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{fuquay_varina.meta.title}</title>
        <meta name="description" content={fuquay_varina.meta.description} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={fuquay_varina.meta.title} />
        <meta property="og:description" content={fuquay_varina.meta.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fuquay_varina.meta.title} />
        <meta name="twitter:description" content={fuquay_varina.meta.description} />
        <meta name="twitter:image" content={`${siteUrl}/og-image.jpg`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>
      </Helmet>

      <main>

        {/* ── HERO — H1 ── */}
        <section className="py-24 text-center" style={{ background: 'hsl(var(--nav-bg))' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.p
                variants={fadeUp}
                className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
                style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--nav-bg))' }}
              >
                {fuquay_varina.hero.eyebrow}
              </motion.p>
              {/* H1 */}
              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl font-black mb-6 leading-tight"
                style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--nav-text))' }}
              >
                {fuquay_varina.hero.h1}
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
                style={{ color: 'hsl(var(--nav-text) / 0.8)' }}
              >
                {fuquay_varina.hero.intro}
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link
                  to="/contact"
                  className="inline-block px-8 py-4 rounded-md font-bold text-base transition-all hover:opacity-90"
                  style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--nav-bg))' }}
                >
                  Get a Free Quote
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── INTRO ── */}
        <section className="py-16 bg-background">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-lg leading-relaxed text-center"
              style={{ color: 'hsl(var(--muted-foreground))' }}
            >
              {fuquay_varina.intro_body}
            </motion.p>
          </div>
        </section>

        {/* ── SERVICES — H2 + H3 ── */}
        <section className="py-20" style={{ background: 'hsl(var(--muted))' }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              {/* H2 */}
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl font-black mb-3 text-center"
                style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
              >
                {fuquay_varina.services_heading}
              </motion.h2>
              {/* H3 */}
              <motion.h3
                variants={fadeUp}
                className="text-lg font-bold mb-12 text-center"
                style={{ color: 'hsl(var(--brand-blue-dark))' }}
              >
                {fuquay_varina.services_heading}
              </motion.h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {fuquay_varina.services.map((svc) => (
                  <motion.div
                    key={svc.id}
                    variants={fadeUp}
                    className="bg-background rounded-2xl border p-6"
                    style={{ borderColor: 'hsl(var(--border))' }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: 'hsl(var(--brand-blue))' }}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" style={{ color: 'hsl(var(--nav-text))' }}>
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-black text-base mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}>
                          {svc.h3}
                        </p>
                        <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                          {svc.body}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── WHY CHOOSE US — H2 + H3 ── */}
        <section className="py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              {/* H2 */}
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl font-black mb-3 text-center"
                style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
              >
                {fuquay_varina.why_heading}
              </motion.h2>
              {/* H3 */}
              <motion.h3
                variants={fadeUp}
                className="text-lg font-bold mb-12 text-center"
                style={{ color: 'hsl(var(--brand-blue-dark))' }}
              >
                {fuquay_varina.why_heading}
              </motion.h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fuquay_varina.why_checklist.map((pt: { id: string; text: string }) => (
                  <motion.div key={pt.id} variants={fadeUp} className="flex items-center gap-3">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: 'hsl(var(--brand-blue))' }}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" style={{ color: 'hsl(var(--nav-text))' }}>
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-base font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
                      {pt.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section className="py-16" style={{ background: 'hsl(var(--primary))' }}>
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2
              className="text-3xl sm:text-4xl font-black mb-4"
              style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--nav-bg))' }}
            >
              {fuquay_varina.cta_heading}
            </h2>
            <p className="text-base mb-8" style={{ color: 'hsl(var(--nav-bg) / 0.8)' }}>
              {fuquay_varina.cta_body}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="px-8 py-4 rounded-md font-bold text-base transition-all hover:opacity-90"
                style={{ background: 'hsl(var(--nav-bg))', color: 'hsl(var(--primary))' }}
              >
                Get a Free Quote
              </Link>
              <Link
                to="/service-areas"
                className="px-8 py-4 rounded-md font-bold text-base border-2 transition-all hover:opacity-90"
                style={{ borderColor: 'hsl(var(--nav-bg))', color: 'hsl(var(--nav-bg))' }}
              >
                ← All Service Areas
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
