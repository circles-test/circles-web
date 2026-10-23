import * as home from "@/content/home";
import * as navigation from "@/content/navigation";
import type { ContentAdapter } from "../types";

/** Reads the static files in src/content. Useful offline and as seed data. */
export const localAdapter: ContentAdapter = {
  async getSiteSettings() {
    return {
      promotion: navigation.promotion,
      mainNav: navigation.mainNav,
      login: navigation.headerActions.login,
      book: navigation.headerActions.book,
      footer: navigation.footerNav,
      contact: navigation.contact,
      socials: [...navigation.socials],
    };
  },

  async getHomePage() {
    return {
      hero: home.hero,
      slider: home.locations,
      network: { ...home.network, spaces: home.spaces },
      happeningNow: home.happeningNow,
      memberships: home.memberships,
      introduction: home.introduction,
      testimonials: home.testimonials,
      news: home.news,
      newsletter: home.newsletter,
    };
  },
};
