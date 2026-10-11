import { RouteObject } from 'react-router';
import { lazy } from 'react';
import HomePage from './pages/index';
import ProdNotFoundPage from './pages/_404';

const NotFoundPage = ProdNotFoundPage;

const ServiceAreasPage    = lazy(() => import('./pages/service-areas'));
const RaleighPage         = lazy(() => import('./pages/raleigh-pressure-washing'));
const CaryPage            = lazy(() => import('./pages/cary-pressure-washing'));
const ApexPage            = lazy(() => import('./pages/apex-pressure-washing'));
const GarnerPage          = lazy(() => import('./pages/garner-pressure-washing'));
const WakeForestPage      = lazy(() => import('./pages/wake-forest-pressure-washing'));
const DurhamPage          = lazy(() => import('./pages/durham-pressure-washing'));
const HollySpringsPage    = lazy(() => import('./pages/holly-springs-pressure-washing'));
const ClaytonPage         = lazy(() => import('./pages/clayton-pressure-washing'));
const FuquayVarinaPage    = lazy(() => import('./pages/fuquay-varina-pressure-washing'));
const MorrisvillePage     = lazy(() => import('./pages/morrisville-pressure-washing'));
const ServicesPage             = lazy(() => import('./pages/services'));
const ResidentialPage          = lazy(() => import('./pages/residential'));
const CommercialCleaningPage   = lazy(() => import('./pages/commercial-cleaning'));
const AboutPage                = lazy(() => import('./pages/about'));
const ContactPage              = lazy(() => import('./pages/contact'));

export const routes: RouteObject[] = [
  { path: '/',                              element: <HomePage /> },
  { path: '/services',                      element: <ServicesPage /> },
  { path: '/residential',                   element: <ResidentialPage /> },
  { path: '/commercial-cleaning',           element: <CommercialCleaningPage /> },
  { path: '/service-areas',                 element: <ServiceAreasPage /> },
  { path: '/raleigh-pressure-washing',      element: <RaleighPage /> },
  { path: '/cary-pressure-washing',         element: <CaryPage /> },
  { path: '/apex-pressure-washing',         element: <ApexPage /> },
  { path: '/garner-pressure-washing',       element: <GarnerPage /> },
  { path: '/wake-forest-pressure-washing',  element: <WakeForestPage /> },
  { path: '/durham-pressure-washing',       element: <DurhamPage /> },
  { path: '/holly-springs-pressure-washing',element: <HollySpringsPage /> },
  { path: '/clayton-pressure-washing',      element: <ClaytonPage /> },
  { path: '/fuquay-varina-pressure-washing',element: <FuquayVarinaPage /> },
  { path: '/morrisville-pressure-washing',  element: <MorrisvillePage /> },
  { path: '/about',                         element: <AboutPage /> },
  { path: '/contact',                       element: <ContactPage /> },
  { id: 'airo-not-found', path: '*',        element: <NotFoundPage /> },
];

export type Path =
  | '/'
  | '/services'
  | '/commercial-cleaning'
  | '/service-areas'
  | '/raleigh-pressure-washing'
  | '/cary-pressure-washing'
  | '/apex-pressure-washing'
  | '/garner-pressure-washing'
  | '/wake-forest-pressure-washing'
  | '/durham-pressure-washing'
  | '/holly-springs-pressure-washing'
  | '/clayton-pressure-washing'
  | '/fuquay-varina-pressure-washing'
  | '/morrisville-pressure-washing'
  | '/about'
  | '/contact';

export type Params = Record<string, string | undefined>;
