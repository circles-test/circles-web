import type { Metadata } from "next";
import { Hanken_Grotesk, Space_Grotesk } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PromotionBanner } from "@/components/layout/PromotionBanner";
import { getSiteSettings } from "@/lib/content";
import "./globals.css";

// Temporary stand-ins for Clash Display / PP Fragment Sans (see globals.css).
const displayFallback = Space_Grotesk({
  variable: "--font-display-fallback",
  subsets: ["latin"],
});

const sansFallback = Hanken_Grotesk({
  variable: "--font-sans-fallback",
  subsets: ["latin"],
  weight: ["300", "400"],
});

export const metadata: Metadata = {
  title: "Circles House",
  description:
    "The coliving and coworking community, designed for entrepreneurs and innovators.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" className={`${displayFallback.variable} ${sansFallback.variable}`}>
      <body>
        {settings.promotion && <PromotionBanner>{settings.promotion}</PromotionBanner>}
        <Header nav={settings.mainNav} login={settings.login} book={settings.book} />
        <main>{children}</main>
        <Footer footer={settings.footer} contact={settings.contact} socials={settings.socials} />
      </body>
    </html>
  );
}
