// GROQ queries. Document types and fields match the schemas in studio-circles-house/schemaTypes.

const link = `{ label, href }`;

const location = `{
  name,
  "slug": slug.current,
  address,
  city,
  timeZone,
  comingSoon,
  image
}`;

export const siteSettingsQuery = /* groq */ `*[_type == "siteSettings"][0]{
  promotion,
  mainNav[]${link},
  login${link},
  book${link},
  footer{ main[]${link}, extras[]${link}, legal[]${link}, image },
  contact,
  socials[]{ network, url }
}`;

export const homePageQuery = /* groq */ `{
  "page": *[_type == "homePage"][0]{
    hero,
    "slider": slider[]->${location},
    network{
      eyebrow,
      title,
      spaces[]{ size, "space": space->{ ..., "location": location->${location} } }
    },
    happeningNow{ eyebrow, title, viewAll${link} },
    memberships{ ..., cta${link} },
    introduction{ ..., cta${link} },
    "testimonials": testimonials[]->{ quote, author, source, url },
    news{ eyebrow, title },
    newsletter
  },
  "events": *[_type == "event" && dateTime(endsAt) >= dateTime(now())] | order(startsAt asc)[0...12]{
    title,
    "slug": slug.current,
    description,
    access,
    startsAt,
    endsAt,
    image,
    cta${link},
    "location": location->${location}
  },
  "news": *[_type == "newsPost" && defined(slug.current)] | order(publishedAt desc)[0...6]{
    title,
    "slug": slug.current,
    excerpt,
    category,
    publishedAt,
    image
  }
}`;
