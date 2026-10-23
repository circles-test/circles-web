/**
 * The site's content model. Pages and components only know these types;
 * each adapter (local files, Sanity, …) maps its own data into them.
 * Switching CMS = writing a new adapter, nothing else.
 */
import type { CircleEvent } from "@/components/cards/EventCard";
import type { Location } from "@/components/cards/FeaturedLocationCard";
import type { NewsItem } from "@/components/cards/NewsCard";
import type { Space } from "@/components/cards/SpaceCard";
import type { Testimonial } from "@/components/cards/TestimonialCard";

export type { CircleEvent, Location, NewsItem, Space, Testimonial };

export type Link = { label: string; href: string };

export type SocialNetwork = "whatsapp" | "instagram" | "tiktok" | "linkedin" | "facebook" | "youtube" | "pinterest";

export type SiteSettings = {
  promotion?: string;
  mainNav: Link[];
  login: Link;
  book: Link;
  footer: {
    main: Link[];
    extras: Link[];
    legal: Link[];
    image?: string;
  };
  contact: {
    about: string;
    phone: string;
    address: string;
    copyright: string;
  };
  socials: { network: SocialNetwork; label: string; href: string }[];
};

export type HomePage = {
  hero: {
    title: string;
    description: string;
    video?: { label: string; poster?: string; src?: string };
  };
  slider: Location[];
  network: {
    eyebrow: string;
    title: string;
    spaces: (Space & { size: "large" | "medium" | "small" })[];
  };
  happeningNow: {
    eyebrow: string;
    title: string;
    cities: string[];
    viewAll: Link;
    events: (CircleEvent & { city: string })[];
  };
  memberships: {
    eyebrow: string;
    title: string;
    description: string;
    cta: Link;
    highlights: string[];
    image?: string;
    thumbnail?: string;
  };
  introduction: {
    title: string;
    highlight: string;
    intro: string;
    body: string;
    cta: Link;
    images?: { main?: string; left?: string; right?: string };
  };
  testimonials: Testimonial[];
  news: { eyebrow: string; title: string; items: NewsItem[] };
  newsletter: { description: string };
};

export interface ContentAdapter {
  getSiteSettings(): Promise<SiteSettings>;
  getHomePage(): Promise<HomePage>;
}
