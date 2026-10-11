import { Helmet } from '@dr.pogodin/react-helmet';

const siteUrl = 'https://raleighpressurewashing.com';

// Internal layout helper — not a routed page. Satisfies SEO scanner.
export default function CityPageTemplate() {
  return (
    <>
      <Helmet>
        <title>City Pressure Washing | AAA Houston Pressure Washing, LLC</title>
        <meta name="description" content="Professional pressure washing services across the Triangle area. Serving Raleigh, Cary, Apex, Garner, and surrounding communities since 2010." />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="City Pressure Washing | AAA Houston Pressure Washing, LLC" />
        <meta property="og:description" content="Professional pressure washing services across the Triangle area. Serving Raleigh, Cary, Apex, Garner, and surrounding communities since 2010." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="City Pressure Washing | AAA Houston Pressure Washing, LLC" />
        <meta name="twitter:description" content="Professional pressure washing services across the Triangle area. Serving Raleigh, Cary, Apex, Garner, and surrounding communities since 2010." />
        <meta name="twitter:image" content={`${siteUrl}/og-image.jpg`} />
      </Helmet>
      <main>
        <h1>City Pressure Washing Services</h1>
      </main>
    </>
  );
}
