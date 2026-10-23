import type { SpaceAmenity } from "@/components/cards/SpaceCard";
import type { ContentAdapter, HomePage, Link, Location, SiteSettings, SocialNetwork } from "../../types";
import { imageUrl, sanityFetch, type SanityImage } from "./client";

type Fetcher = <T>(query: string) => Promise<T>;
import { homePageQuery, siteSettingsQuery } from "./queries";

// ---- Raw shapes returned by the GROQ queries --------------------------------

type RawLocation = {
  name: string;
  slug?: string;
  address?: string;
  city?: string;
  timeZone?: string;
  comingSoon?: boolean;
  image?: SanityImage;
};

type RawSiteSettings = {
  promotion?: string;
  mainNav?: Link[];
  login?: Link;
  book?: Link;
  footer?: { main?: Link[]; extras?: Link[]; legal?: Link[]; image?: SanityImage };
  contact?: Partial<SiteSettings["contact"]>;
  socials?: { network: SocialNetwork; url: string }[];
};

type RawHome = {
  page: {
    hero?: { title?: string; description?: string; videoLabel?: string; videoUrl?: string; videoPoster?: SanityImage };
    slider?: (RawLocation | null)[];
    network?: {
      eyebrow?: string;
      title?: string;
      spaces?: {
        size?: "large" | "medium" | "small";
        space?: {
          title: string;
          category?: string;
          description?: string;
          access?: string;
          comingSoon?: boolean;
          image?: SanityImage;
          location?: RawLocation;
          // Location modal
          about?: string;
          rating?: number;
          price?: { label?: string; value?: string };
          amenities?: SpaceAmenity[];
          directions?: string;
          mapImage?: SanityImage;
          page?: Link;
          cta?: Link;
        } | null;
      }[];
    };
    happeningNow?: { eyebrow?: string; title?: string; viewAll?: Link };
    memberships?: Omit<HomePage["memberships"], "image" | "thumbnail"> & { image?: SanityImage; thumbnail?: SanityImage };
    introduction?: Omit<HomePage["introduction"], "images"> & {
      imageMain?: SanityImage;
      imageLeft?: SanityImage;
      imageRight?: SanityImage;
    };
    testimonials?: ({ quote: string; author: string; source?: string; url?: string } | null)[];
    news?: { eyebrow?: string; title?: string };
    newsletter?: { description?: string };
  } | null;
  events: {
    title: string;
    slug?: string;
    description?: string;
    access?: string;
    startsAt: string;
    endsAt?: string;
    image?: SanityImage;
    cta?: Link;
    location?: RawLocation;
  }[];
  news: {
    title: string;
    slug: string;
    excerpt?: string;
    category?: string;
    publishedAt?: string;
    image?: SanityImage;
  }[];
};

// ---- Mappers -----------------------------------------------------------------

const socialLabels: Record<SocialNetwork, string> = {
  whatsapp: "WhatsApp",
  instagram: "Instagram",
  tiktok: "TikTok",
  linkedin: "LinkedIn",
  facebook: "Facebook",
  youtube: "YouTube",
  pinterest: "Pinterest",
};

const DEFAULT_TIME_ZONE = "Europe/Madrid";

function toLocation(raw: RawLocation): Location {
  return {
    name: raw.name,
    address: raw.address ?? "",
    href: raw.slug ? `/locations/${raw.slug}` : "#",
    image: imageUrl(raw.image),
  };
}

/** Event dates as the cards show them: "Aug" · "18" · "Monday, August 18" · "9:00 PM - 11:30 PM GMT+2". */
function formatEventDate(startsAt: string, endsAt: string | undefined, timeZone: string) {
  const start = new Date(startsAt);
  const fmt = (options: Intl.DateTimeFormatOptions, date = start) =>
    new Intl.DateTimeFormat("en-US", { timeZone, ...options }).format(date);
  const time = (date: Date) => fmt({ hour: "numeric", minute: "2-digit" }, date);
  const offset = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "shortOffset" })
    .formatToParts(start)
    .find((part) => part.type === "timeZoneName")?.value;

  return {
    month: fmt({ month: "short" }),
    day: fmt({ day: "numeric" }),
    dateLabel: fmt({ weekday: "long", month: "long", day: "numeric" }),
    timeLabel: [endsAt ? `${time(start)} - ${time(new Date(endsAt))}` : time(start), offset].filter(Boolean).join(" "),
  };
}

function formatNewsDate(date?: string) {
  return date ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(date)) : "";
}

const missing = (what: string): never => {
  throw new Error(`Sanity: "${what}" has not been created or published yet. Open the Studio and publish it.`);
};

// ---- Adapter -----------------------------------------------------------------

/** `fetcher` is injectable so the mapping can be tested against local GROQ (see scripts/test-sanity-adapter.ts). */
export const createSanityAdapter = (fetcher: Fetcher): ContentAdapter => ({
  async getSiteSettings() {
    const raw = await fetcher<RawSiteSettings | null>(siteSettingsQuery);
    if (!raw) return missing("Site settings");

    return {
      promotion: raw.promotion,
      mainNav: raw.mainNav ?? [],
      login: raw.login ?? { label: "Members Login", href: "/login" },
      book: raw.book ?? { label: "Book a Stay", href: "/book" },
      footer: {
        main: raw.footer?.main ?? [],
        extras: raw.footer?.extras ?? [],
        legal: raw.footer?.legal ?? [],
        image: imageUrl(raw.footer?.image, 800),
      },
      contact: {
        about: raw.contact?.about ?? "",
        phone: raw.contact?.phone ?? "",
        address: raw.contact?.address ?? "",
        copyright: raw.contact?.copyright ?? "",
      },
      socials: (raw.socials ?? []).map((s) => ({ network: s.network, label: socialLabels[s.network], href: s.url })),
    };
  },

  async getHomePage() {
    const { page, events, news } = await fetcher<RawHome>(homePageQuery);
    if (!page) return missing("Home page");

    const mappedEvents = events.map((event) => ({
      title: event.title,
      description: event.description ?? "",
      access: event.access ?? "Public",
      image: imageUrl(event.image, 1200),
      cta: event.cta,
      city: event.location?.city ?? "",
      ...formatEventDate(event.startsAt, event.endsAt, event.location?.timeZone ?? DEFAULT_TIME_ZONE),
    }));

    return {
      hero: {
        title: page.hero?.title ?? "",
        description: page.hero?.description ?? "",
        video: page.hero?.videoLabel
          ? { label: page.hero.videoLabel, src: page.hero.videoUrl, poster: imageUrl(page.hero.videoPoster, 800) }
          : undefined,
      },
      // References resolve to null when the target is missing or unpublished — skip those.
      slider: (page.slider ?? []).filter(isPresent).map(toLocation),
      network: {
        eyebrow: page.network?.eyebrow ?? "",
        title: page.network?.title ?? "",
        spaces: (page.network?.spaces ?? [])
          .filter((item) => item.space)
          .map(({ size = "medium", space }) => ({
            size,
            title: space!.title,
            category: space!.category ?? "",
            description: space!.description,
            access: space!.access,
            comingSoon: space!.comingSoon,
            address: space!.location?.address,
            image: imageUrl(space!.image, 1200),
            details: {
              about: space!.about,
              rating: space!.rating,
              price: space!.price?.value ? { label: space!.price.label ?? "", value: space!.price.value } : undefined,
              amenities: space!.amenities,
              directions: space!.directions,
              mapImage: imageUrl(space!.mapImage, 900),
              page: space!.page?.href ? space!.page : undefined,
              cta: space!.cta?.href ? space!.cta : undefined,
            },
          })),
      },
      happeningNow: {
        eyebrow: page.happeningNow?.eyebrow ?? "",
        title: page.happeningNow?.title ?? "",
        viewAll: page.happeningNow?.viewAll ?? { label: "View all", href: "/events" },
        cities: [...new Set(mappedEvents.map((e) => e.city).filter(Boolean))],
        events: mappedEvents,
      },
      memberships: {
        ...missingSafe(page.memberships, "Memberships"),
        highlights: page.memberships?.highlights ?? [],
        image: imageUrl(page.memberships?.image),
        thumbnail: imageUrl(page.memberships?.thumbnail, 400),
      },
      introduction: {
        ...missingSafe(page.introduction, "Introduction"),
        images: {
          main: imageUrl(page.introduction?.imageMain, 1200),
          left: imageUrl(page.introduction?.imageLeft, 800),
          right: imageUrl(page.introduction?.imageRight, 600),
        },
      },
      testimonials: (page.testimonials ?? []).filter(isPresent).map((t) => ({
        quote: t.quote,
        author: t.author,
        source: t.source ?? "",
        href: t.url,
      })),
      news: {
        eyebrow: page.news?.eyebrow ?? "",
        title: page.news?.title ?? "",
        items: news.map((post) => ({
          title: post.title,
          excerpt: post.excerpt ?? "",
          category: post.category ?? "News",
          date: formatNewsDate(post.publishedAt),
          image: imageUrl(post.image, 1200),
          href: `/news/${post.slug}`,
        })),
      },
      newsletter: { description: page.newsletter?.description ?? "" },
    };
  },
});

export const sanityAdapter = createSanityAdapter((query) => sanityFetch(query));

function isPresent<T>(value: T | null | undefined): value is T {
  return value != null;
}

function missingSafe<T extends object>(section: T | undefined, name: string): T {
  return section ?? missing(`Home page › ${name}`);
}
