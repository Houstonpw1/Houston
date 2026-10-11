import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { clayton } from 'virtual:content';

const siteUrl = 'https://raleighpressurewashing.com';
const pageUrl = `${siteUrl}/clayton-pressure-washing`;

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export default function ClaytonPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    name: clayton.meta.title,
    url: pageUrl,
    description: clayton.meta.description,
    isPartOf: { '@id': `${siteUrl}/#website` },
    about: { '@id': `${siteUrl}/#organization` },
  };

  return (
    <>
      <Helmet>
        <title>{clayton.meta.title}</title>
        <meta name="description" content={clayton.meta.description} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={clayton.meta.title} />
        <meta property="og:description" content={clayton.meta.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={clayton.meta.title} />
        <meta name="twitter:description" content={clayton.meta.description} />
        <meta name="twitter:image" content={`${siteUrl}/og-image.jpg`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>
      </Helmet>

      <main>
        <section className="py-24 text-center" style={{ background: 'hsl(var(--nav-bg))' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.p variants={fadeUp} className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5" style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--nav-bg))' }}>
                {clayton.hero.eyebrow}
              </motion.p>
              <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-black mb-6 leading-tight" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--nav-text))' }}>
                {clayton.hero.h1}
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg max-w-2xl mx-auto mb-8 leading-relaxed" style={{ color: 'hsl(var(--nav-text) / 0.8)' }}>
                {clayton.hero.intro}
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link to="/contact" className="inline-block px-8 py-4 rounded-md font-bold text-base transition-all hover:opacity-90" style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--nav-bg))' }}>
                  Get a Free Quote
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-lg leading-relaxed text-center" style={{ color: 'hsl(var(--muted-foreground))' }}>
              {clayton.intro_body}
            </motion.p>
          </div>
        </section>

        <section className="py-20" style={{ background: 'hsl(var(--muted))' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black mb-12 text-center" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}>
                {clayton.services_heading}
              </motion.h2>
              <div className="flex flex-col gap-8">
                {clayton.services.map((svc) => (
                  <motion.div key={svc.id} variants={fadeUp} className="p-8 rounded-2xl bg-background border" style={{ borderColor: 'hsl(var(--border))' }}>
                    <h3 className="text-xl font-black mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}>
                      {svc.h3}
                    </h3>
                    <p className="text-base leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      {svc.body}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black mb-12 text-center" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}>
                {clayton.why_heading}
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {clayton.why_checklist.map((pt: { id: string; text: string }) => (
                  <motion.div key={pt.id} variants={fadeUp} className="p-6 rounded-2xl border" style={{ borderColor: 'hsl(var(--border))' }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center mb-3" style={{ background: 'hsl(var(--brand-blue))' }}>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" style={{ color: 'hsl(var(--nav-text))' }}>
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-base font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
                      {pt.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16" style={{ background: 'hsl(var(--primary))' }}>
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-black mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--nav-bg))' }}>
              Ready for a Cleaner Home in Clayton?
            </h2>
            <p className="text-base mb-8" style={{ color: 'hsl(var(--nav-bg) / 0.8)' }}>
              Get your free, no-obligation quote today. We'll respond within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="px-8 py-4 rounded-md font-bold text-base transition-all hover:opacity-90" style={{ background: 'hsl(var(--nav-bg))', color: 'hsl(var(--primary))' }}>
                Get a Free Quote
              </Link>
              <a href="https://g.page/r/CZhT8P3mvfoaEB0/review" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-md font-bold text-base border-2 transition-all hover:opacity-90" style={{ borderColor: 'hsl(var(--nav-bg))', color: 'hsl(var(--nav-bg))' }}>
                ⭐ Leave a Review
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
