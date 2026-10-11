import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { useState, type FormEvent } from 'react';
import { contact } from 'virtual:content';

const siteUrl = 'https://raleighpressurewashing.com';
const pageUrl = `${siteUrl}/contact`;

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export default function ContactPage() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedService, setSelectedService] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    if (formData.get('_gotcha')) return;

    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const phone = String(formData.get('phone') ?? '').trim();
    const service = String(formData.get('service') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();

    setStatus('sending');
    setErrorMsg('');

    try {
      // Field mapping: only the message textarea goes in messages_attributes[0].body.
      // All other fields (dropdowns, radios, checkboxes) must be added to conversation.data as { "Label": value } pairs.
      const res = await fetch('/api/contact/free-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversation: {
            messages_attributes: [{ body: message || 'New quote request' }],
            data: {
              __gd_contact_form_title: 'Free Quote Request',
              'Service Needed': service,
              'Phone Number': phone,
            },
          },
          user: { email, name },
        }),
      });

      const json = await res.json();
      if (json.success) {
        setStatus('success');
        form.reset();
        setSelectedService('');
      } else {
        throw new Error(json.error || 'Something went wrong.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${pageUrl}#webpage`,
    name: contact.meta.title,
    url: pageUrl,
    description: contact.meta.description,
    isPartOf: { '@id': `${siteUrl}/#website` },
    about: { '@id': `${siteUrl}/#organization` },
  };

  return (
    <>
      <Helmet>
        <title>{contact.meta.title}</title>
        <meta name="description" content={contact.meta.description} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={contact.meta.title} />
        <meta property="og:description" content={contact.meta.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={contact.meta.title} />
        <meta name="twitter:description" content={contact.meta.description} />
        <meta name="twitter:image" content={`${siteUrl}/og-image.jpg`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>
      </Helmet>

      <main>
        {/* Hero */}
        <section className="py-24 text-center" style={{ background: 'hsl(var(--nav-bg))' }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.p variants={fadeUp} className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5" style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--nav-bg))' }}>
                {contact.hero.eyebrow}
              </motion.p>
              <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-black mb-6 leading-tight" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--nav-text))' }}>
                {contact.hero.h1}
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'hsl(var(--nav-text) / 0.8)' }}>
                {contact.hero.intro}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-20 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

              {/* Contact Info */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
                className="lg:col-span-2 flex flex-col gap-8"
              >
                <motion.div variants={fadeUp}>
                  <h2 className="text-2xl font-black mb-6" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}>
                    Contact Information
                  </h2>

                  <div className="flex flex-col gap-5">
                    {/* Phone */}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: 'hsl(var(--brand-blue))' }}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'hsl(var(--nav-text))' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'hsl(var(--muted-foreground))' }}>Phone</p>
                        <a href="tel:+19194733550" className="text-base font-semibold hover:opacity-80 transition-opacity" style={{ color: 'hsl(var(--foreground))' }}>
                          {contact.phone}
                        </a>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: 'hsl(var(--brand-blue))' }}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'hsl(var(--nav-text))' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'hsl(var(--muted-foreground))' }}>Email</p>
                        <a href={`mailto:${contact.email}`} className="text-base font-semibold hover:opacity-80 transition-opacity break-all" style={{ color: 'hsl(var(--foreground))' }}>
                          {contact.email}
                        </a>
                      </div>
                    </div>

                    {/* Service Area */}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: 'hsl(var(--brand-blue))' }}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'hsl(var(--nav-text))' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'hsl(var(--muted-foreground))' }}>Service Area</p>
                        <p className="text-base font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
                          {contact.service_area}
                        </p>
                      </div>
                    </div>

                    {/* Hours */}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: 'hsl(var(--brand-blue))' }}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'hsl(var(--nav-text))' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'hsl(var(--muted-foreground))' }}>Hours</p>
                        <p className="text-base font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
                          {contact.hours}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Review CTA */}
                <motion.div variants={fadeUp} className="p-6 rounded-2xl border" style={{ borderColor: 'hsl(var(--border))' }}>
                  <p className="text-sm font-bold mb-2" style={{ color: 'hsl(var(--foreground))' }}>Happy with our work?</p>
                  <p className="text-sm mb-4" style={{ color: 'hsl(var(--muted-foreground))' }}>Leave us a Google review — it means the world to our small business.</p>
                  <a
                    href="https://g.page/r/CZhT8P3mvfoaEB0/review"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-bold transition-all hover:opacity-90"
                    style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--nav-bg))' }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Leave a Google Review
                  </a>
                </motion.div>
              </motion.div>

              {/* Form */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
                className="lg:col-span-3"
              >
                <motion.div variants={fadeUp} className="p-8 rounded-2xl border" style={{ borderColor: 'hsl(var(--border))' }}>
                  <h2 className="text-2xl font-black mb-6" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}>
                    {contact.form_heading}
                  </h2>

                  {status === 'success' ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'hsl(var(--brand-blue))' }}>
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" style={{ color: 'hsl(var(--nav-text))' }}>
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-black mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}>
                        Quote Request Sent!
                      </h3>
                      <p className="text-base" style={{ color: 'hsl(var(--muted-foreground))' }}>
                        Thanks! We'll be in touch within 24 hours with your free estimate.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                      {/* Honeypot */}
                      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true" />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="name" className="text-sm font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
                            Full Name <span style={{ color: 'hsl(var(--brand-blue-dark))' }}>*</span>
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            placeholder="John Smith"
                            className="px-4 py-3 rounded-md border text-sm outline-none transition-all focus:ring-2"
                            style={{ borderColor: 'hsl(var(--border))', background: 'hsl(var(--background))', color: 'hsl(var(--foreground))' }}
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="email" className="text-sm font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
                            Email Address <span style={{ color: 'hsl(var(--brand-blue-dark))' }}>*</span>
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="john@example.com"
                            className="px-4 py-3 rounded-md border text-sm outline-none transition-all focus:ring-2"
                            style={{ borderColor: 'hsl(var(--border))', background: 'hsl(var(--background))', color: 'hsl(var(--foreground))' }}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="phone" className="text-sm font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
                          Phone Number
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="(555) 000-0000"
                          className="px-4 py-3 rounded-md border text-sm outline-none transition-all focus:ring-2"
                          style={{ borderColor: 'hsl(var(--border))', background: 'hsl(var(--background))', color: 'hsl(var(--foreground))' }}
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="service" className="text-sm font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
                          Service Needed
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={selectedService}
                          onChange={(e) => setSelectedService(e.target.value)}
                          className="px-4 py-3 rounded-md border text-sm outline-none transition-all focus:ring-2"
                          style={{ borderColor: 'hsl(var(--border))', background: 'hsl(var(--background))', color: selectedService ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))' }}
                        >
                          <option value="">Select a service...</option>
                          {contact.services_options.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="message" className="text-sm font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
                          Tell Us About Your Project <span style={{ color: 'hsl(var(--brand-blue-dark))' }}>*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          required
                          placeholder="Describe what you need cleaned, the size of the area, and any specific concerns..."
                          className="px-4 py-3 rounded-md border text-sm outline-none transition-all focus:ring-2 resize-none"
                          style={{ borderColor: 'hsl(var(--border))', background: 'hsl(var(--background))', color: 'hsl(var(--foreground))' }}
                        />
                      </div>

                      {status === 'error' && (
                        <p role="alert" className="text-sm px-4 py-3 rounded-md" style={{ background: 'hsl(var(--destructive) / 0.1)', color: 'hsl(var(--destructive))' }}>
                          {errorMsg}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="w-full py-4 rounded-md font-bold text-base transition-all hover:opacity-90 disabled:opacity-60"
                        style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--nav-bg))' }}
                      >
                        {status === 'sending' ? 'Sending…' : 'Send My Free Quote Request'}
                      </button>
                    </form>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
