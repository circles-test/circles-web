"use client";

import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, type FormEvent } from "react";
import { IconButton } from "@/components/ui/IconButton";

/** Figma: Newsletter — black block with an underlined email field. */
export function Newsletter({
  title = "Join our Newsletter",
  description,
  onSubscribe,
}: {
  title?: string;
  description: string;
  /** Hook up the email provider here. */
  onSubscribe?: (email: string) => Promise<void> | void;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get("email");
    if (typeof email !== "string" || !email) return;
    setStatus("sending");
    await onSubscribe?.(email);
    setStatus("done");
  }

  return (
    <section className="px-4 lg:px-6">
      <div className="bg-black p-6 text-white lg:flex lg:items-end lg:gap-4">
        <h2 className="font-display text-h1 lg:flex-1">{title}</h2>
        <div className="flex flex-col gap-4 pt-12 lg:w-[516px] lg:pt-0">
          <p className="font-display text-h3">{description}</p>
          <form onSubmit={handleSubmit} className="flex items-center gap-4 border-b border-white pt-4 pb-2">
            <label htmlFor="newsletter-email" className="sr-only">
              Email
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="Enter your email"
              disabled={status !== "idle"}
              className="min-w-0 flex-1 bg-transparent text-body text-white outline-none placeholder:text-white"
            />
            <IconButton
              type="submit"
              label="Subscribe"
              disabled={status !== "idle"}
              icon={<IconArrowNarrowRight size={16} stroke={1.5} />}
              tone="light"
            />
          </form>
          {status === "done" && <p className="text-detail">Thanks! You’re on the list.</p>}
        </div>
      </div>
    </section>
  );
}
