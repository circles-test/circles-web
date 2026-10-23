"use client";

import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandPinterest,
  IconBrandTiktok,
  IconBrandWhatsapp,
  IconBrandYoutube,
  IconChevronUp,
} from "@tabler/icons-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Media } from "@/components/ui/Media";
import type { SiteSettings } from "@/lib/content/types";
import { cn } from "@/lib/cn";

const socialIcons = {
  whatsapp: IconBrandWhatsapp,
  instagram: IconBrandInstagram,
  tiktok: IconBrandTiktok,
  linkedin: IconBrandLinkedin,
  facebook: IconBrandFacebook,
  youtube: IconBrandYoutube,
  pinterest: IconBrandPinterest,
};

function Column({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col", className)}>
      <p className="text-detail text-black/50">{title}</p>
      <div className="flex flex-1 flex-col pt-2.5">{children}</div>
    </div>
  );
}

function Address({ contact }: { contact: SiteSettings["contact"] }) {
  return (
    <div className="flex flex-col gap-2.5 text-detail">
      <p>{contact.address}</p>
      <p>{contact.copyright}</p>
    </div>
  );
}

/** Figma: Footer — "Footer - top" (image, Main, Extras, Info) + "Footer - bottom". */
export function Footer({
  footer,
  contact,
  socials,
}: Pick<SiteSettings, "footer" | "contact" | "socials">) {
  return (
    <footer className="bg-background">
      <div className="flex flex-col gap-12 px-4 pt-16 pb-12 lg:grid lg:grid-cols-[318px_1fr_161px_1fr] lg:gap-4 lg:px-6 lg:pt-32 lg:pb-6">
        <div className="relative h-[412px] w-full">
          <Media src={footer.image} alt="" sizes="(min-width: 1024px) 318px, 100vw" />
        </div>

        <div className="lg:hidden">
          <Address contact={contact} />
        </div>

        <Column title="Main" className="lg:pl-28">
          <nav aria-label="Footer main" className="flex flex-col items-start gap-2.5">
            {footer.main.map((link) => (
              <Button key={link.href} href={link.href} variant="large">
                {link.label}
              </Button>
            ))}
          </nav>
        </Column>

        <Column title="Extras">
          <nav aria-label="Footer extras" className="flex flex-col items-start gap-2.5">
            {footer.extras.map((link) => (
              <Button key={link.href} href={link.href} variant="simple">
                {link.label}
              </Button>
            ))}
          </nav>
        </Column>

        <Column title="Info" className="lg:pl-28">
          <div className="flex flex-col gap-6 text-body">
            <p>{contact.about}</p>
            {contact.phone && <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>}
          </div>
          <div className="flex items-end justify-between gap-4 pt-6 lg:flex-1 lg:flex-col lg:items-stretch lg:justify-start lg:gap-0">
            <ul className="flex flex-wrap gap-4 lg:flex-1">
              {socials.map(({ network, label, href }) => {
                const Icon = socialIcons[network];
                return (
                  <li key={network}>
                    <a href={href} aria-label={label} target="_blank" rel="noopener noreferrer" className="block transition-opacity hover:opacity-50">
                      <Icon size={24} stroke={1.5} />
                    </a>
                  </li>
                );
              })}
            </ul>
            <IconButton
              label="Back to top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              icon={<IconChevronUp size={16} stroke={1.5} />}
              tone="muted"
              shape="circle"
              slide="up"
              className="lg:self-end"
            />
          </div>
        </Column>
      </div>

      <div className="flex flex-col gap-6 p-4 lg:flex-row lg:items-start lg:gap-4 lg:p-6">
        <div className="hidden flex-1 lg:block">
          <Address contact={contact} />
        </div>
        <nav aria-label="Legal" className="grid grid-cols-2 gap-x-4 gap-y-2.5 lg:flex lg:gap-4">
          {[footer.legal.slice(0, 2), footer.legal.slice(2)].map((group, i) => (
            <div key={i} className="contents lg:flex lg:flex-col lg:items-start lg:gap-2.5">
              {group.map((link) => (
                <Link key={link.href} href={link.href} className="text-detail hover:underline">
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>
        <p className="text-detail lg:hidden">{contact.copyright}</p>
      </div>
    </footer>
  );
}
