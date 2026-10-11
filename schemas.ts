import { z } from 'zod';
export const schemas = {
  pages: {
    home: z.object({
      "hero": z.object({
        "headline": z.string(),
        "subheadline": z.string(),
        "cta_primary": z.string(),
        "cta_secondary": z.string()
      }),
      "trust_items": z.array(z.object({
        "id": z.string(),
        "value": z.string(),
        "label": z.string(),
        "icon": z.string()
      })),
      "services_heading": z.string(),
      "services_subheading": z.string(),
      "services": z.array(z.object({
        "id": z.string(),
        "title": z.string(),
        "description": z.string()
      })),
      "why_heading": z.string(),
      "why_items": z.array(z.object({
        "id": z.string(),
        "title": z.string(),
        "body": z.string()
      })),
      "areas_heading": z.string(),
      "areas_subheading": z.string(),
      "cta_banner": z.object({
        "heading": z.string(),
        "subheading": z.string(),
        "cta_primary": z.string(),
        "cta_review": z.string()
      })
    }),
    raleigh: z.object({
      "meta": z.object({
        "title": z.string(),
        "description": z.string()
      }),
      "hero": z.object({
        "eyebrow": z.string(),
        "h1": z.string(),
        "intro": z.string()
      }),
      "intro_body": z.string(),
      "services_heading": z.string(),
      "services": z.array(z.object({
        "id": z.string(),
        "h3": z.string(),
        "body": z.string()
      })),
      "why_heading": z.string(),
      "why_items": z.array(z.object({
        "id": z.string(),
        "title": z.string(),
        "body": z.string()
      })),
      "why_checklist": z.array(z.object({
        "id": z.string(),
        "text": z.string()
      })),
      "cta_heading": z.string(),
      "cta_body": z.string(),
      "services_subheading": z.string(),
      "why_subheading": z.string()
    }),
    cary: z.object({
      "meta": z.object({
        "title": z.string(),
        "description": z.string()
      }),
      "hero": z.object({
        "eyebrow": z.string(),
        "h1": z.string(),
        "intro": z.string()
      }),
      "intro_body": z.string(),
      "services_heading": z.string(),
      "services": z.array(z.object({
        "id": z.string(),
        "h3": z.string(),
        "body": z.string()
      })),
      "why_heading": z.string(),
      "why_items": z.array(z.object({
        "id": z.string(),
        "title": z.string(),
        "body": z.string()
      })),
      "why_checklist": z.array(z.object({
        "id": z.string(),
        "text": z.string()
      })),
      "cta_heading": z.string(),
      "cta_body": z.string(),
      "services_subheading": z.string(),
      "why_subheading": z.string()
    }),
    apex: z.object({
      "meta": z.object({
        "title": z.string(),
        "description": z.string()
      }),
      "hero": z.object({
        "eyebrow": z.string(),
        "h1": z.string(),
        "intro": z.string()
      }),
      "intro_body": z.string(),
      "services_heading": z.string(),
      "services": z.array(z.object({
        "id": z.string(),
        "h3": z.string(),
        "body": z.string()
      })),
      "why_heading": z.string(),
      "why_points": z.array(z.object({
        "id": z.string(),
        "title": z.string(),
        "body": z.string()
      }))
    }),
    garner: z.object({
      "meta": z.object({
        "title": z.string(),
        "description": z.string()
      }),
      "hero": z.object({
        "eyebrow": z.string(),
        "h1": z.string(),
        "intro": z.string()
      }),
      "intro_body": z.string(),
      "services_heading": z.string(),
      "services": z.array(z.object({
        "id": z.string(),
        "h3": z.string(),
        "body": z.string()
      })),
      "why_heading": z.string(),
      "why_points": z.array(z.object({
        "id": z.string(),
        "title": z.string(),
        "body": z.string()
      }))
    }),
    about: z.object({
      "meta": z.object({
        "title": z.string(),
        "description": z.string()
      }),
      "hero": z.object({
        "eyebrow": z.string(),
        "h1": z.string(),
        "intro": z.string()
      }),
      "story_heading": z.string(),
      "story_body": z.string(),
      "values_heading": z.string(),
      "values": z.array(z.object({
        "id": z.string(),
        "title": z.string(),
        "body": z.string()
      })),
      "credentials_heading": z.string(),
      "credentials": z.array(z.object({
        "id": z.string(),
        "title": z.string(),
        "value": z.string()
      })),
      "cta_heading": z.string(),
      "cta_body": z.string()
    }),
    contact: z.object({
      "meta": z.object({
        "title": z.string(),
        "description": z.string()
      }),
      "hero": z.object({
        "eyebrow": z.string(),
        "h1": z.string(),
        "intro": z.string()
      }),
      "form_heading": z.string(),
      "phone": z.string(),
      "email": z.string(),
      "service_area": z.string(),
      "hours": z.string(),
      "services_options": z.array(z.string())
    }),
    morrisville: z.object({
      "meta": z.object({
        "title": z.string(),
        "description": z.string()
      }),
      "hero": z.object({
        "eyebrow": z.string(),
        "h1": z.string(),
        "intro": z.string()
      }),
      "intro_body": z.string(),
      "services_heading": z.string(),
      "services": z.array(z.object({
        "id": z.string(),
        "h3": z.string(),
        "body": z.string()
      })),
      "why_heading": z.string(),
      "why_items": z.array(z.object({
        "id": z.string(),
        "title": z.string(),
        "body": z.string()
      })),
      "why_checklist": z.array(z.object({
        "id": z.string(),
        "text": z.string()
      })),
      "cta_heading": z.string(),
      "cta_body": z.string(),
      "services_subheading": z.string(),
      "why_subheading": z.string()
    }),
    services: z.object({
      meta: z.object({
        title: z.string(),
        description: z.string()
      }),
      hero: z.object({
        eyebrow: z.string(),
        h1: z.string(),
        intro: z.string()
      }),
      tabs: z.array(z.object({
        id: z.string(),
        slug: z.string(),
        label: z.string(),
        heading: z.string(),
        subheading: z.string(),
        body1: z.string(),
        body2: z.string(),
        features: z.array(z.object({
          id: z.string(),
          text: z.string()
        })),
        isCommercial: z.boolean().optional(),
        commercialCategories: z.array(z.object({
          id: z.string(),
          heading: z.string(),
          subheading: z.string(),
          intro: z.string(),
          services: z.array(z.object({
            id: z.string(),
            name: z.string(),
            description: z.string()
          }))
        })).optional()
      })),
      cities: z.array(z.object({
        id: z.string(),
        name: z.string(),
        path: z.string()
      })),
      residentialCategories: z.array(z.object({
        id: z.string(),
        heading: z.string(),
        subheading: z.string(),
        intro: z.string(),
        services: z.array(z.object({
          id: z.string(),
          name: z.string(),
          description: z.string()
        }))
      })),
      residentialServiceAreas: z.array(z.object({
        id: z.string(),
        name: z.string(),
        path: z.string()
      }))
    }),
    service_areas: z.object({
      "section_heading": z.string(),
      "section_subheading": z.string(),
      "section_intro": z.string(),
      "cities": z.array(z.object({
        "id": z.string(),
        "slug": z.string(),
        "label": z.string(),
        "path": z.string(),
        "heading": z.string(),
        "subheading": z.string(),
        "body1": z.string(),
        "body2": z.string(),
        "features": z.array(z.object({
          "id": z.string(),
          "text": z.string()
        }))
      }))
    }),
    wake_forest: z.object({
      "meta": z.object({
        "title": z.string(),
        "description": z.string()
      }),
      "hero": z.object({
        "eyebrow": z.string(),
        "h1": z.string(),
        "intro": z.string()
      }),
      "intro_body": z.string(),
      "services_heading": z.string(),
      "services": z.array(z.object({
        "id": z.string(),
        "h3": z.string(),
        "body": z.string()
      })),
      "why_heading": z.string(),
      "why_items": z.array(z.object({
        "id": z.string(),
        "title": z.string(),
        "body": z.string()
      })),
      "why_checklist": z.array(z.object({
        "id": z.string(),
        "text": z.string()
      })),
      "cta_heading": z.string(),
      "cta_body": z.string()
    }),
    commercial_cleaning: z.object({
      "meta": z.object({
        "title": z.string(),
        "description": z.string()
      }),
      "hero": z.object({
        "eyebrow": z.string(),
        "h1": z.string(),
        "intro": z.string(),
        "cta_primary": z.string(),
        "cta_phone": z.string()
      }),
      "features": z.array(z.object({
        "id": z.string(),
        "text": z.string()
      })),
      "categories_section": z.object({
        "eyebrow": z.string(),
        "heading": z.string(),
        "subheading": z.string(),
        "intro": z.string()
      }),
      "categories": z.array(z.object({
        "id": z.string(),
        "heading": z.string(),
        "subheading": z.string(),
        "intro": z.string(),
        "services": z.array(z.object({
          "id": z.string(),
          "name": z.string(),
          "desc": z.string()
        }))
      })),
      "cities_section": z.object({
        "eyebrow": z.string(),
        "heading": z.string(),
        "subheading": z.string(),
        "intro": z.string(),
        "sidebar_heading": z.string(),
        "sidebar_intro": z.string(),
        "cta_sidebar": z.string()
      }),
      "cities": z.array(z.object({
        "id": z.string(),
        "name": z.string(),
        "slug": z.string(),
        "path": z.string(),
        "h1": z.string(),
        "h2": z.string(),
        "h3": z.string(),
        "body": z.string()
      })),
      "cta": z.object({
        "heading": z.string(),
        "body": z.string(),
        "cta_primary": z.string(),
        "cta_review": z.string()
      })
    }),
    service_areas_page: z.object({
      "meta": z.object({
        "title": z.string(),
        "description": z.string()
      }),
      "hero": z.object({
        "eyebrow": z.string(),
        "h1": z.string(),
        "intro": z.string()
      }),
      "cities_heading": z.string(),
      "cities_subheading": z.string(),
      "cities": z.array(z.object({
        "id": z.string(),
        "name": z.string(),
        "state": z.string(),
        "path": z.string(),
        "tagline": z.string(),
        "highlight": z.string(),
        "neighborhoods": z.string(),
        "services": z.array(z.string())
      }))
    }),
    holly_springs: z.object({
      "meta": z.object({
        "title": z.string(),
        "description": z.string()
      }),
      "hero": z.object({
        "eyebrow": z.string(),
        "h1": z.string(),
        "intro": z.string()
      }),
      "intro_body": z.string(),
      "services_heading": z.string(),
      "services": z.array(z.object({
        "id": z.string(),
        "h3": z.string(),
        "body": z.string()
      })),
      "why_heading": z.string(),
      "why_items": z.array(z.object({
        "id": z.string(),
        "title": z.string(),
        "body": z.string()
      })),
      "why_checklist": z.array(z.object({
        "id": z.string(),
        "text": z.string()
      })),
      "cta_heading": z.string(),
      "cta_body": z.string(),
      "services_subheading": z.string(),
      "why_subheading": z.string()
    }),
    fuquay_varina: z.object({
      "meta": z.object({
        "title": z.string(),
        "description": z.string()
      }),
      "hero": z.object({
        "eyebrow": z.string(),
        "h1": z.string(),
        "intro": z.string()
      }),
      "intro_body": z.string(),
      "services_heading": z.string(),
      "services": z.array(z.object({
        "id": z.string(),
        "h3": z.string(),
        "body": z.string()
      })),
      "why_heading": z.string(),
      "why_items": z.array(z.object({
        "id": z.string(),
        "title": z.string(),
        "body": z.string()
      })),
      "why_checklist": z.array(z.object({
        "id": z.string(),
        "text": z.string()
      })),
      "cta_heading": z.string(),
      "cta_body": z.string(),
      "services_subheading": z.string(),
      "why_subheading": z.string()
    }),
    clayton: z.object({
      "meta": z.object({
        "title": z.string(),
        "description": z.string()
      }),
      "hero": z.object({
        "eyebrow": z.string(),
        "h1": z.string(),
        "intro": z.string()
      }),
      "intro_body": z.string(),
      "services_heading": z.string(),
      "services": z.array(z.object({
        "id": z.string(),
        "h3": z.string(),
        "body": z.string()
      })),
      "why_heading": z.string(),
      "why_items": z.array(z.object({
        "id": z.string(),
        "title": z.string(),
        "body": z.string()
      })),
      "why_checklist": z.array(z.object({
        "id": z.string(),
        "text": z.string()
      })),
      "cta_heading": z.string(),
      "cta_body": z.string(),
      "services_subheading": z.string(),
      "why_subheading": z.string()
    }),
    residential: z.object({
      "cityCards": z.array(z.object({
        "name": z.string(),
        "path": z.string(),
        "desc": z.string(),
        "id": z.string()
      }))
    })
  }
};
export type Schemas = typeof schemas;