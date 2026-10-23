/**
 * Which image goes where. Used by `npm run upload-images`.
 *
 * - file:  name of the file inside the media folder
 * - doc:   Sanity document id (as created by `npm run seed`)
 * - field: image field in that document ("memberships.image" = field inside an object)
 * - alt:   alternative text (accessibility/SEO) — marketing can edit it later in the Studio
 *
 * Change any line and run the script again: images already uploaded are not duplicated.
 */
export type MediaAssignment = { file: string; doc: string; field: string; alt: string };

export const MEDIA_MAP: MediaAssignment[] = [
  // Locations (Home slider)
  { file: "circles-front.png", doc: "location-barcelona", field: "image", alt: "Front of Circles House Barcelona" },
  { file: "andorra-panoremic.png", doc: "location-andorra", field: "image", alt: "Panoramic view of Andorra" },

  // Spaces ("A more meaningful way to live, work, and connect.")
  // ⚠ Assumption: the only "more-meaningfull" image is the first card (Spa).
  { file: "more-meaningfull-1.png", doc: "space-spa-coming-soon", field: "image", alt: "Spa at Circles House" },
  { file: "circles-front.png", doc: "space-circles-house-barcelona", field: "image", alt: "Front of Circles House Barcelona" },
  { file: "kitchen.png", doc: "space-restaurant-andorra", field: "image", alt: "Restaurant kitchen" },
  { file: "rooftop.png", doc: "space-rooftop", field: "image", alt: "Rooftop at Circles House" },

  // Events ("Here's what's coming up"), in the order shown on the Home
  { file: "whats-comming-1.jpg", doc: "event-movie-night", field: "image", alt: "Rooftop movie night" },
  { file: "whats-comming-2.jpg", doc: "event-hiit-workout", field: "image", alt: "HIIT workout class" },
  { file: "whats-comming-3.jpg", doc: "event-spanish-conversation-club-and-networking", field: "image", alt: "Spanish conversation club" },

  // News ("Latest announcements"), in the order shown on the Home
  { file: "last-announcements-1.png", doc: "newsPost-science-of-supper", field: "image", alt: "Community dinner at Circles House" },
  { file: "last-announcements-2.png", doc: "newsPost-gen-z-housing", field: "image", alt: "Coworking at Circles House" },
  { file: "last-announcements-3.png", doc: "newsPost-summer-giveaway", field: "image", alt: "Circles House Barcelona" },

  // Memberships background — ⚠ the thumbnail ("memberships.thumbnail") has no image yet.
  { file: "become-a-member.png", doc: "homePage", field: "memberships.image", alt: "Members at Circles House" },

  // Footer
  { file: "footer.png", doc: "siteSettings", field: "footer.image", alt: "Circles House" },
];
