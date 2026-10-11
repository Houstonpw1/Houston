/**
 * Auto-synced registry of publicly-crawlable routes. Consumed by the
 * /sitemap.xml handler in src/server/entry.ts.
 *
 * DO NOT add or remove paths by hand. Static paths are mirrored here from
 * src/routes.tsx automatically whenever that file is edited (any manual
 * path edit would be overwritten on the next routes.tsx change). For sync
 * to pick up a route, its `path` must be a literal string starting with "/";
 * template literals and identifier refs are skipped, and dynamic-param routes
 * like "/products/:id" are excluded.
 *
 * The only fields safe to hand-edit are the per-entry metadata below, after a
 * sync:
 * - `priority` (0.0–1.0): Home = 1.0, main sections = 0.8, deep pages = 0.5.
 * - `changefreq` and `lastmod`.
 */

export interface SeoRoute {
  path: string;
  changefreq?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
  lastmod?: string;
}

export const seoRoutes: SeoRoute[] = [
  { path: "/", changefreq: "weekly", priority: 1.0 },
  { path: "/services", changefreq: "monthly", priority: 0.8 },
  { path: "/residential", changefreq: "monthly", priority: 0.8 },
  { path: "/commercial-cleaning", changefreq: "monthly", priority: 0.8 },
  { path: "/service-areas", changefreq: "monthly", priority: 0.8 },
  { path: "/raleigh-pressure-washing", changefreq: "monthly", priority: 0.8 },
  { path: "/cary-pressure-washing", changefreq: "monthly", priority: 0.8 },
  { path: "/apex-pressure-washing", changefreq: "monthly", priority: 0.8 },
  { path: "/garner-pressure-washing", changefreq: "monthly", priority: 0.8 },
  { path: "/wake-forest-pressure-washing", changefreq: "monthly", priority: 0.8 },
  { path: "/durham-pressure-washing", changefreq: "monthly", priority: 0.8 },
  { path: "/holly-springs-pressure-washing", changefreq: "monthly", priority: 0.8 },
  { path: "/clayton-pressure-washing", changefreq: "monthly", priority: 0.8 },
  { path: "/fuquay-varina-pressure-washing", changefreq: "monthly", priority: 0.8 },
  { path: "/morrisville-pressure-washing", changefreq: "monthly", priority: 0.8 },
  { path: "/about", changefreq: "monthly", priority: 0.8 },
  { path: "/contact", changefreq: "monthly", priority: 0.8 },
];
