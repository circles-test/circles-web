export type NavLink = { label: string; href: string };

export const promotion =
  "Members save 15 % on trips of 7+ nights, 30% on 30+ nights trips and 35% on 60+ night trips.";

export const mainNav: NavLink[] = [
  { label: "Coliving", href: "/coliving" },
  { label: "Coworking", href: "/coworking" },
  { label: "Community", href: "/community" },
  { label: "Happening Now", href: "/events" },
  { label: "About", href: "/about" },
  { label: "Deals", href: "/deals" },
];

export const headerActions = {
  login: { label: "Members Login", href: "/login" },
  book: { label: "Book a Stay", href: "/book" },
};

// Footer labels are not legible in the Figma metadata — placeholders to review.
export const footerNav = {
  main: [...mainNav, headerActions.book],
  extras: [
    { label: "FAQ", href: "/faq" },
    { label: "What is Circles", href: "/what-is-circles" },
    { label: "Life@Circles", href: "/life" },
    { label: "Memberships", href: "/memberships" },
    { label: "Team", href: "/team" },
    { label: "For Investors", href: "/investors" },
    { label: "Partnerships", href: "/partnerships" },
    { label: "Become an Ambassador", href: "/ambassadors" },
  ],
  legal: [
    { label: "Terms & Conditions", href: "/legal/terms" },
    { label: "Privacy Policy", href: "/legal/privacy" },
    { label: "Cookie Policy", href: "/legal/cookies" },
    { label: "Legal Notice", href: "/legal/notice" },
  ],
} satisfies Record<string, NavLink[]>;

export const contact = {
  about:
    "Circles House is a community designed for entrepreneurs and innovators seeking a more meaningful way to live, work, and connect.",
  phone: "+34 619 43 24 69",
  address: "Camí de Vallvidrera al Tibidabo, 05 - 08017 - Barcelona, Barcelona, Spain",
  copyright: "© 2025 circles.house - All rights reserved",
};

export const socials = [
  { network: "whatsapp", label: "WhatsApp", href: "#" },
  { network: "instagram", label: "Instagram", href: "#" },
  { network: "tiktok", label: "TikTok", href: "#" },
  { network: "linkedin", label: "LinkedIn", href: "#" },
  { network: "facebook", label: "Facebook", href: "#" },
  { network: "youtube", label: "YouTube", href: "#" },
  { network: "pinterest", label: "Pinterest", href: "#" },
] as const;
