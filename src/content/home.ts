import type { CircleEvent } from "@/components/cards/EventCard";
import type { Location } from "@/components/cards/FeaturedLocationCard";
import type { NewsItem } from "@/components/cards/NewsCard";
import type { Space } from "@/components/cards/SpaceCard";
import type { Testimonial } from "@/components/cards/TestimonialCard";

// Copy taken from the Figma design. Images are left empty on purpose:
// add `image` paths (e.g. "/images/…") and the components will render them.

export const hero = {
  title: "The coliving and coworking community, designed for entrepreneurs and innovators.",
  description:
    "Circles House is a thriving community of entrepreneurs, digital nomads, and innovators. To ensure everyone is a good fit and adds value to our unique ecosystem, we’ve designed a simple and quick application process.",
  video: { label: "Discover Circles House" },
};

export const locations: Location[] = [
  { name: "Circles House Barcelona", address: "Cami de Vallvidrera al Tibidabo 5, Barcelona, Spain", href: "/locations/barcelona" },
  { name: "Circles House Andorra", address: "123 Mountain View, Andorra la Vella, Andorra", href: "/locations/andorra" },
];

export const network = {
  eyebrow: "The Circles House network",
  title: "A more meaningful way to live, work, and connect.",
};

export const spaces: (Space & { size: "large" | "medium" | "small" })[] = [
  {
    size: "small",
    category: "Wellness",
    title: "Spa (Coming Soon)",
    description:
      "The Thermal Baths will offer three types of circuits: relaxing, detox, and revitalizing, as well as Breathwork/Ice Bath sessions.",
    access: "Public",
    address: "123 Mountain View, Andorra la Vella, Andorra",
  },
  {
    size: "large",
    category: "Coworking space",
    title: "Circles House Barcelona",
    description:
      "Our mission is to build a global, decentralized network of spaces where authentic relationships and well-being take center stage, empowering a brighter future.",
    access: "Members only",
    address: "Cami de Vallvidrera al Tibidabo 5, Barcelona, Spain",
    // Example values from the Figma "Location modal - with page".
    details: {
      about:
        "Located in a natural park and only a 5 minute walk from a metro station, our house in Vallvidrera is well-located and allows you to get anywhere quickly and easily.",
      rating: 5,
      price: { label: "Starting from", value: "$1.900€/month" },
      amenities: ["coliving", "coworking"],
      directions: "20 minutes from Gràcia by public transport.",
      page: { label: "View location", href: "/locations/barcelona" },
    },
  },
  {
    size: "medium",
    category: "Culinary Experience",
    title: "Restaurant Andorra",
    description:
      "The best quality local produce and a commitment to biodynamic and sustainable methods are the key ingredients in a recipe for happiness at Bodega Bonay.",
    access: "Public",
    address: "123 Mountain View, Andorra la Vella, Andorra",
    // Example values from the Figma "Location modal - without page".
    details: { rating: 5, directions: "20 minutes from Gràcia by public transport." },
  },
  {
    size: "small",
    category: "Events",
    title: "Rooftop",
    description:
      "Our house offers a range of thoughtfully designed rooms to suit various lifestyles, combining luxury and functionality. Whether you’re looking for a monthly stay or a flexible option, we’ve got you covered.",
    access: "Members only",
    address: "Cami de Vallvidrera al Tibidabo 5, Barcelona, Spain",
  },
];

const eventDate = { month: "Aug", day: 18, dateLabel: "Monday, August 18", timeLabel: "9:00 PM - 11:30 PM GMT+2" };

export const happeningNow = {
  eyebrow: "Happening now",
  title: "Here's what's coming up",
  cities: ["Barcelona", "Andorra"],
  viewAll: { label: "View all", href: "/events" },
  events: [
    {
      ...eventDate,
      city: "Barcelona",
      access: "Members only",
      title: "Movie Night",
      description:
        "Join us for a cozy Rooftop Movie Night exclusively for Circles House members! Relax and unwind with a film, great company, and snacks. This is a great chance to connect with fellow members while enjoying a laid-back evening.",
    },
    {
      ...eventDate,
      city: "Barcelona",
      access: "Public",
      title: "HIIT Workout",
      description:
        "We’re thrilled to have special guest instructor Raluca Andreea leading this week’s HIIT Workout Class at Circles House! 🌟",
    },
    {
      ...eventDate,
      city: "Andorra",
      access: "Public",
      title: "Spanish Conversation Club and Networking",
      description:
        "Join us for a Spanish Conversation Club. This is a time dedicated to improving our Spanish communication skills and networking with an international community of entrepreneurs and digital nomads.",
    },
  ] satisfies (CircleEvent & { city: string })[],
};

export const memberships = {
  eyebrow: "Join us",
  title: "Become a Member",
  description:
    "Our digital community is where ambitious entrepreneurs come together with seamless opportunities to engage, share ideas, spark connections, and turn visions into reality.",
  cta: { label: "Apply", href: "/memberships" },
  highlights: ["Instant Community", "Focused Channels", "Collaboration"],
};

export const introduction = {
  title: "ONE COMMUNITY, ONE HOME WORLDWIDE",
  highlight: "MANY LIFE EXPERIENCES",
  intro:
    "Circles House is a thriving community of entrepreneurs, digital nomads, and innovators. To ensure everyone is a good fit and adds value to our unique ecosystem, we’ve designed a simple and quick application process.",
  body: "We bring humans to the center of every decision. Kindness, love, respect, genuinity and the desire to see your peers grow is key to creating personal and professional relationships that will last a lifetime.",
  cta: { label: "About us", href: "/about" },
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "I’ve been staying at Circles and I absolutely love it! The location up in Tibidabo is incredible, the views are breathtaking, and it’s so peaceful, yet still close enough to enjoy everything the city has to offer. The house itself is beautiful, super comfortable, and always spotless.",
    author: "Maria Isabel Arbelaez",
    source: "5 out of 5 Review on Google",
    href: "#",
  },
  {
    quote:
      "Circles House is a great place to work. The coworking space is productive. I have met lots of interesting people just by being there. It’s easy to focus, network with professionals, and even stay healthy thanks to the on-site gym. If you’re looking for a solid spot to get work done and connect with people, I definitely recommend it.",
    author: "Forne Ce",
    source: "5 out of 5 Review on Google",
    href: "#",
  },
  {
    quote:
      "From the very first moment, it became clear that this place is more than just a temporary home. I was warmly welcomed into an atmosphere where everything felt not only well-organized but also genuinely heartfelt. Everything was perfectly prepared, allowing me to settle in immediately and fully embrace the experience. My room was spotless, tastefully furnished, and radiated a sense of comfort and care.",
    author: "Enrico Schmidt",
    source: "5 out of 5 Review on Google",
    href: "#",
  },
];

export const news = {
  eyebrow: "News",
  title: "Latest announcements",
  items: [
    {
      title: "The Science of Supper: How Community Dinners Cultivate Wellbeing",
      excerpt:
        "Discover how community dinners in our Barcelona coliving boost your wellbeing. Backed by science, learn how social eating improves happiness, strengthens your immune system, and helps you build genuine connections.",
      category: "Announcement",
      date: "Aug 21, 2025",
      href: "/news/science-of-supper",
    },
    {
      title: "Why Gen Z Doesn’t Want a 9-to-5 — and What That Means for Housing",
      excerpt:
        "Discover how community dinners in our Barcelona coliving boost your wellbeing. Backed by science, learn how social eating improves happiness, strengthens your immune system, and helps you build genuine connections.",
      category: "Announcement",
      date: "Aug 21, 2025",
      href: "/news/gen-z-housing",
    },
    {
      title: "Win a One-Week Stay at Circles House Barcelona – Our Summer Giveaway for Entrepreneurs",
      excerpt:
        "Circles House Barcelona is gifting one entrepreneur or creative a free 1-week coliving and coworking stay this August. Apply by July 20, 2025, for a chance to stay in a private room, work from our inspiring space, and connect.",
      category: "Announcement",
      date: "Aug 21, 2025",
      href: "/news/summer-giveaway",
    },
  ] satisfies NewsItem[],
};

export const newsletter = {
  description:
    "Join our newsletter to connect with a vibrant community of entrepreneurs and innovators at Circles House. Stay updated and be part of our unique ecosystem!",
};
