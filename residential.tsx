import { residential } from 'virtual:content';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router';

const SITE_URL = 'https://raleighpressurewashing.com';
const PAGE_URL = `${SITE_URL}/residential`;
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

interface ServiceItem { h3: string; body: string; }
interface ServiceSection { id: string; h2: string; intro: string; items: ServiceItem[]; }

const services: ServiceSection[] = [
  {
    id: 'house-washing',
    h2: 'House Washing',
    intro: 'Your home exterior takes a beating from the elements year-round. Dirt, mold, mildew, algae, and oxidation build up on siding, brick, stucco, and wood -- making your home look aged and neglected. Our professional house washing service restores your home curb appeal safely and thoroughly.',
    items: [
      {
        h3: 'Soft Wash House Washing',
        body: 'We use a low-pressure soft wash system combined with professional-grade biodegradable detergents to safely clean vinyl siding, painted wood, stucco, and fiber cement. High pressure alone strips paint and forces water behind siding -- our soft wash method kills mold and algae at the root so results last longer.',
      },
      {
        h3: 'Brick & Masonry Cleaning',
        body: 'Brick and mortar are porous and trap dirt, efflorescence, and biological growth. We apply targeted cleaning solutions that penetrate the surface and lift staining without damaging the mortar joints or the brick face.',
      },
      {
        h3: 'Two-Story & Multi-Level Homes',
        body: 'Our equipment reaches up to three stories safely. No ladders needed on your end -- we handle the full exterior from ground level using professional extension wands and surface cleaners.',
      },
      {
        h3: 'Pre-Sale & Move-In Cleaning',
        body: 'A clean exterior adds thousands to perceived home value. We work with real estate agents, homeowners, and property managers to get homes show-ready fast. Before listing or after closing, we make the exterior look its best.',
      },
    ],
  },
  {
    id: 'driveway-sidewalk',
    h2: 'Driveway & Sidewalk Cleaning',
    intro: 'Concrete driveways and sidewalks are magnets for oil stains, tire marks, mold, mildew, and embedded dirt. Standard garden hoses and consumer pressure washers leave streaks and miss deep staining. Our commercial-grade surface cleaners deliver a uniform, streak-free clean every time.',
    items: [
      {
        h3: 'Concrete Driveway Cleaning',
        body: 'We use a rotary surface cleaner that covers the full width of your driveway in even, overlapping passes -- no tiger-striping, no missed spots. Pre-treatment with degreaser breaks down oil and grease before the pressure wash begins.',
      },
      {
        h3: 'Oil & Grease Stain Removal',
        body: 'Motor oil, transmission fluid, and cooking grease penetrate deep into concrete pores. We apply a commercial-strength degreaser, agitate the surface, and hot-water rinse to lift the stain. Multiple applications may be needed for heavy long-term staining.',
      },
      {
        h3: 'Sidewalk & Walkway Cleaning',
        body: 'Front walkways, side paths, and back yard stepping stones accumulate algae and mold that become dangerously slippery. We clean and treat all concrete and paver walkways to restore safe footing and clean appearance.',
      },
      {
        h3: 'Paver & Stamped Concrete Cleaning',
        body: 'Decorative pavers and stamped concrete require careful pressure settings to avoid surface damage. We adjust our technique for each surface type and can apply a post-clean sealant to protect your investment.',
      },
      {
        h3: 'Rust Stain Removal from Concrete',
        body: 'Rust from irrigation systems, metal furniture, and fertilizer leaves orange-brown stains that regular pressure washing cannot remove. We apply a professional rust remover that chemically neutralizes the iron oxide and lifts the stain from the surface.',
      },
      {
        h3: 'Mold & Algae Treatment',
        body: 'Black streaks and green growth on concrete are not just ugly -- they are slipping hazards. Our post-wash algaecide treatment kills spores at the root and slows regrowth, keeping your surfaces cleaner longer.',
      },
    ],
  },
  {
    id: 'patio-deck',
    h2: 'Patio & Deck Cleaning',
    intro: 'Outdoor living spaces collect pollen, mold, mildew, bird droppings, and food residue. Whether you have a concrete patio, wood deck, composite decking, or a screened porch, we have the right cleaning method to restore it without causing damage.',
    items: [
      {
        h3: 'Concrete Patio Cleaning',
        body: 'We surface-clean concrete patios with the same rotary cleaner used on driveways -- delivering a uniform, streak-free result. Furniture and planters are moved and replaced. Stubborn stains are pre-treated before the main wash.',
      },
      {
        h3: 'Wood Deck Cleaning',
        body: 'Wood decks require low pressure and the right detergent to avoid raising the grain or splintering the wood. We soft-wash wood decks to remove mold, mildew, and grey weathering, leaving the wood ready for staining or sealing.',
      },
      {
        h3: 'Composite Deck Cleaning',
        body: 'Trex, TimberTech, and other composite decking materials are not immune to mold and algae. We use manufacturer-approved cleaning methods and low pressure to clean composite surfaces without voiding warranties.',
      },
      {
        h3: 'Screened Porch & Enclosure Cleaning',
        body: 'Screen panels, frames, and the floor inside screened porches trap pollen, spider webs, and mold. We carefully clean screens, frames, and flooring to restore a fresh, clean outdoor living space.',
      },
      {
        h3: 'Pool Deck Cleaning',
        body: 'Pool decks are constantly wet and develop algae and calcium deposits quickly. We clean and treat pool decks to remove slippery growth and mineral buildup, making the area safe and attractive.',
      },
      {
        h3: 'Outdoor Kitchen & Grill Area Cleaning',
        body: 'Grease splatter, smoke residue, and food staining around outdoor kitchens require degreasing before pressure washing. We treat and clean these areas thoroughly so your outdoor cooking space looks and smells fresh.',
      },
    ],
  },
  {
    id: 'roof-softwash',
    h2: 'Roof Soft Washing',
    intro: 'Those black streaks on your roof are not dirt -- they are Gloeocapsa Magma, a bacteria that feeds on the limestone filler in asphalt shingles. Pressure washing a roof will void your warranty and blow off granules. Soft washing is the only safe, manufacturer-approved method to clean asphalt shingles.',
    items: [
      {
        h3: 'Asphalt Shingle Soft Washing',
        body: 'We apply a professional-grade sodium hypochlorite solution at low pressure that kills the bacteria, algae, and moss causing black streaks and green growth. The solution is rinsed gently -- no high pressure that strips granules or damages shingles. Results typically last 3 to 5 years.',
      },
      {
        h3: 'Moss & Lichen Removal',
        body: 'Moss and lichen physically attach to shingles and lift the edges, allowing water infiltration and accelerating shingle deterioration. Our treatment kills moss and lichen at the root. Dead growth washes away naturally with rain over the following weeks.',
      },
      {
        h3: 'Metal & Tile Roof Cleaning',
        body: 'Metal roofs develop oxidation and algae. Tile roofs collect moss and lichen between tiles. We adjust our cleaning solution and pressure for each roof type to deliver a thorough clean without surface damage.',
      },
      {
        h3: 'Gutter Brightening',
        body: 'Tiger-striping on gutters is caused by electrostatic bonding of dirt and oxidation to the aluminum. We apply a gutter brightener that chemically removes these streaks, restoring the white or beige finish of your gutters without abrasive scrubbing.',
      },
    ],
  },
  {
    id: 'fence-cleaning',
    h2: 'Fence Cleaning',
    intro: 'Fences are exposed to weather, soil contact, and biological growth year-round. Wood fences develop mold and grey weathering. Vinyl fences collect green algae and oxidation. We clean all fence types safely and efficiently.',
    items: [
      {
        h3: 'Wood Fence Cleaning',
        body: 'We soft-wash wood fences to remove mold, mildew, and grey weathering without raising the grain or splintering boards. A clean wood fence accepts stain and sealant far more evenly, extending the life of your finish.',
      },
      {
        h3: 'Vinyl & PVC Fence Cleaning',
        body: 'Green algae and oxidation make white vinyl fences look permanently stained. Our cleaning solution removes biological growth and oxidation, restoring the bright white or color finish of your vinyl fence.',
      },
      {
        h3: 'Chain Link & Metal Fence Cleaning',
        body: 'Chain link and metal fences collect rust, dirt, and organic growth. We clean and treat metal fences to remove surface rust staining and biological growth, improving appearance and slowing further corrosion.',
      },
    ],
  },
  {
    id: 'window-gutter',
    h2: 'Window Washing & Gutter Cleaning',
    intro: 'Clean windows and clear gutters are essential to a well-maintained home. We offer both services as standalone visits or as add-ons to any exterior cleaning package.',
    items: [
      {
        h3: 'Exterior Window Washing',
        body: 'We clean exterior windows using a pure water fed pole system that leaves no spots or streaks. Screens are removed, cleaned, and replaced. Window frames and sills are wiped down as part of the service.',
      },
      {
        h3: 'Gutter Cleaning & Flush',
        body: 'Clogged gutters cause water to back up under roofing, overflow onto siding, and pool around your foundation. We remove all debris from gutters and downspouts by hand, then flush the system with water to confirm clear flow.',
      },
      {
        h3: 'Gutter Guard Cleaning',
        body: 'Gutter guards still collect debris on top and allow small particles through. We clean the surface of gutter guards and flush the gutters beneath to ensure proper drainage.',
      },
      {
        h3: 'Fascia & Soffit Cleaning',
        body: 'Fascia boards and soffits collect mold, wasp nests, and dirt. We clean these areas as part of a full exterior package or as a standalone service, removing biological growth and restoring the painted finish.',
      },
    ],
  },
  {
    id: 'mold-algae',
    h2: 'Mold, Algae & Organic Growth Removal',
    intro: 'Mold, algae, mildew, and lichen grow on virtually every exterior surface in the Raleigh area -- our humid climate makes biological growth one of the most common exterior maintenance issues homeowners face. Left untreated, organic growth causes permanent staining, surface deterioration, and health concerns.',
    items: [
      {
        h3: 'Mold & Mildew Removal',
        body: 'Mold and mildew on siding, concrete, and wood surfaces are not just cosmetic problems. Mold spores can enter your home through windows and doors and affect indoor air quality. We apply professional biocides that kill mold at the root and prevent rapid regrowth.',
      },
      {
        h3: 'Algae & Green Growth Removal',
        body: 'Green algae on siding, driveways, and roofs is caused by moisture and shade. Our cleaning solutions kill algae on contact and include a residual treatment that slows regrowth for months after the service.',
      },
      {
        h3: 'Moss Removal',
        body: 'Moss holds moisture against surfaces and physically damages shingles, wood, and masonry over time. We remove moss from roofs, driveways, and hardscapes and apply a preventive treatment to slow return.',
      },
      {
        h3: 'Lichen Removal',
        body: 'Lichen is one of the most stubborn organisms to remove from exterior surfaces. It bonds chemically to stone, concrete, and shingles. Our professional-strength treatments break the bond and lift lichen without damaging the underlying surface.',
      },
      {
        h3: 'Black Streak Removal',
        body: 'Black streaks on roofs and siding are caused by Gloeocapsa Magma bacteria. Standard cleaning products do not kill this organism. Our roof soft wash treatment eliminates the bacteria and removes the staining, restoring your home original appearance.',
      },
      {
        h3: 'Post-Treatment Prevention',
        body: 'After every organic growth removal service we apply a residual biocide treatment. This slows regrowth significantly -- most customers see 2 to 4 years before retreatment is needed, compared to 6 to 12 months without treatment.',
      },
    ],
  },
  {
    id: 'rust-stain',
    h2: 'Rust Stain Removal',
    intro: 'Rust stains from irrigation systems, metal furniture, fertilizer, and well water are among the most difficult exterior stains to remove. Standard pressure washing pushes rust staining deeper into porous surfaces. We use professional-grade rust removers that chemically neutralize iron oxide and lift the stain.',
    items: [
      {
        h3: 'Irrigation System Rust Stains',
        body: 'Well water and iron-rich municipal water leave orange rust staining on driveways, sidewalks, siding, and foundations wherever sprinkler heads hit. We treat these stains with oxalic acid-based removers that neutralize the iron and restore the original surface color.',
      },
      {
        h3: 'Metal Furniture & Planter Rust Stains',
        body: 'Metal patio furniture, planters, and decorative items leave rust rings on concrete and pavers. We apply targeted rust remover to these stains and pressure wash the area clean.',
      },
      {
        h3: 'Fertilizer Rust Stains',
        body: 'Iron-based fertilizers leave rust staining on driveways and sidewalks when they get wet. These stains are common in spring and fall and respond well to our professional rust removal treatment.',
      },
    ],
  },
];

export default function ResidentialPage() {
  return (
    <>
      <Helmet>
        <title>Residential Pressure Washing Services | AAA Houston Pressure Washing</title>
        <meta name="description" content="Professional residential pressure washing in Raleigh, Cary, Apex, Garner & surrounding cities. House washing, driveway cleaning, roof soft washing, patio cleaning & more." />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content="Residential Pressure Washing Services | AAA Houston Pressure Washing" />
        <meta property="og:description" content="Professional residential pressure washing in Raleigh, Cary, Apex, Garner & surrounding cities." />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Residential Pressure Washing Services | AAA Houston Pressure Washing" />
        <meta name="twitter:description" content="Professional residential pressure washing in Raleigh, Cary, Apex, Garner & surrounding cities." />
        <meta name="twitter:image" content={OG_IMAGE} />
      </Helmet>

      <main>

        {/* ── HERO ── */}
        <section
          className="py-16 sm:py-20"
          style={{ background: 'hsl(var(--nav-bg))' }}
          aria-label="Residential pressure washing hero"
        >
          <div className="w-full px-6 lg:px-12 text-center">
            <span
              className="inline-block text-xs font-bold tracking-wide px-4 py-1.5 rounded-full mb-5"
              style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--nav-bg))' }}
            >
              RESIDENTIAL SERVICES
            </span>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-black mb-5 leading-tight"
              style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--nav-text))' }}
            >
              Residential Pressure Washing<br className="hidden sm:block" /> in Raleigh &amp; Surrounding Cities
            </h1>
            <p
              className="text-lg sm:text-xl max-w-3xl mx-auto mb-8 leading-relaxed"
              style={{ color: 'hsl(var(--nav-text) / 0.85)' }}
            >
              From house washing and driveway cleaning to roof soft washing and rust stain removal -- we handle every exterior surface on your home with professional equipment and proven techniques.
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
                className="inline-block px-8 py-4 rounded-md font-bold text-base border-2 transition-all hover:opacity-80"
                style={{ borderColor: 'hsl(var(--nav-text))', color: 'hsl(var(--nav-text))' }}
              >
                (919) 473-3550
              </a>
            </div>
          </div>
        </section>

        {/* ── SERVICE AREAS STRIP ── */}
        <section
          className="py-4"
          style={{ background: 'hsl(var(--primary))' }}
          aria-label="Service areas"
        >
          <div className="w-full px-6 lg:px-12">
            <p className="text-center text-sm font-bold" style={{ color: 'hsl(var(--nav-bg))' }}>
              Serving: Raleigh &middot; Cary &middot; Apex &middot; Garner &middot; Holly Springs &middot; Morrisville &middot; Clayton &middot; Wake Forest &middot; Durham &middot; Fuquay-Varina
            </p>
          </div>
        </section>

        {/* ── MAIN CONTENT ── */}
        <section className="py-16 sm:py-20" aria-label="Residential services">
          <div className="w-full px-6 lg:px-12 max-w-6xl mx-auto">

            {/* Quick-jump nav */}
            <nav aria-label="Jump to service section" className="mb-14">
              <p className="text-sm font-bold mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Jump to a service:
              </p>
              <div className="flex flex-wrap gap-2">
                {services.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all hover:opacity-80"
                    style={{ borderColor: 'hsl(var(--nav-bg))', color: 'hsl(var(--nav-bg))' }}
                  >
                    {s.h2}
                  </a>
                ))}
              </div>
            </nav>

            {/* Service sections */}
            {services.map((svc, idx) => (
              <article
                key={svc.id}
                id={svc.id}
                className="mb-20 scroll-mt-32"
                aria-label={svc.h2}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-black"
                    style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--nav-bg))' }}
                  >
                    {idx + 1}
                  </span>
                  <h2
                    className="text-3xl sm:text-4xl font-black"
                    style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
                  >
                    {svc.h2}
                  </h2>
                </div>

                <p className="text-base leading-relaxed mb-8 max-w-3xl" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  {svc.intro}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {svc.items.map((item) => (
                    <div
                      key={item.h3}
                      className="rounded-xl border p-6"
                      style={{ borderColor: 'hsl(var(--border))', background: 'hsl(var(--card))' }}
                    >
                      <h3
                        className="text-lg font-black mb-3"
                        style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
                      >
                        {item.h3}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            ))}

            {/* ── SERVICE AREAS ── */}
            <article id="service-areas" className="mb-20 scroll-mt-32" aria-label="Residential service areas">
              <h2
                className="text-3xl sm:text-4xl font-black mb-4"
                style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
              >
                Residential Service Areas
              </h2>
              <p className="text-base leading-relaxed mb-8 max-w-3xl" style={{ color: 'hsl(var(--muted-foreground))' }}>
                We provide residential pressure washing throughout the greater Raleigh area. All services listed above are available in every city we serve.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {residential.cityCards.map((city) => (
                  <a
                    key={city.name}
                    href={city.path}
                    className="block rounded-xl border p-5 transition-all hover:opacity-80"
                    style={{ borderColor: 'hsl(var(--border))', background: 'hsl(var(--card))' }}
                  >
                    <h3
                      className="text-base font-black mb-1"
                      style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
                    >
                      {city.name}, NC
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      {city.desc}
                    </p>
                  </a>
                ))}
              </div>
            </article>

            {/* ── CTA ── */}
            <div
              className="rounded-2xl p-10 sm:p-14 text-center"
              style={{ background: 'hsl(var(--nav-bg))' }}
            >
              <h2
                className="text-3xl sm:text-4xl font-black mb-4"
                style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--nav-text))' }}
              >
                Ready to Transform Your Home Exterior?
              </h2>
              <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: 'hsl(var(--nav-text) / 0.85)' }}>
                Call or request a free quote online. We serve Raleigh, Cary, Apex, Garner, Holly Springs, Morrisville, Clayton, Wake Forest, Durham, and Fuquay-Varina.
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
                  className="inline-block px-8 py-4 rounded-md font-bold text-base border-2 transition-all hover:opacity-80"
                  style={{ borderColor: 'hsl(var(--nav-text))', color: 'hsl(var(--nav-text))' }}
                >
                  Call (919) 473-3550
                </a>
              </div>
            </div>

          </div>
        </section>

      </main>
    </>
  );
}
