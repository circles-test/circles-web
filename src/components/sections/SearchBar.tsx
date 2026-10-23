"use client";

import { IconSearch } from "@tabler/icons-react";
import { IconButton } from "@/components/ui/IconButton";
import { Field } from "@/components/ui/Field";
import { cn } from "@/lib/cn";

/**
 * Booking search.
 * Mobile: a single "Start your search" field + search button.
 * Desktop: Location · Check in | Check out · Guests · search button.
 * The fields are triggers: wire `onOpen` to the location dropdown / calendar / guests pickers.
 */
export type SearchValues = {
  location?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
};

export type SearchPicker = "location" | "dates" | "guests";

export function SearchBar({
  values = {},
  onOpen,
  onSearch,
  className,
}: {
  values?: SearchValues;
  onOpen?: (picker: SearchPicker) => void;
  onSearch?: (values: SearchValues) => void;
  className?: string;
}) {
  const searchButton = (
    <IconButton
      label="Search"
      onClick={() => onSearch?.(values)}
      icon={<IconSearch size={16} stroke={1.5} />}
      shape="search"
      slide="none"
      className="h-auto self-stretch lg:h-[58px]"
    />
  );

  return (
    <div className={cn("flex w-full items-center gap-0.5", className)}>
      {/* Mobile */}
      <button
        type="button"
        onClick={() => onOpen?.("location")}
        className="flex h-[58px] min-w-0 flex-1 items-center rounded-lg bg-black/12 px-4 py-2 text-left text-body text-black/50 lg:hidden"
      >
        Start your search
      </button>

      {/* Desktop */}
      <Field
        label="Location"
        value={values.location}
        placeholder="Anywhere"
        onClick={() => onOpen?.("location")}
        className="hidden w-[270px] shrink-0 lg:flex"
      />
      <div className="hidden min-w-0 flex-1 overflow-hidden rounded-lg lg:flex">
        <Field
          label="Check in"
          value={values.checkIn}
          placeholder="Add dates"
          joined
          onClick={() => onOpen?.("dates")}
          className="flex-1 border-r border-black/8"
        />
        <Field
          label="Check out"
          value={values.checkOut}
          placeholder="Add dates"
          joined
          onClick={() => onOpen?.("dates")}
          className="flex-1"
        />
      </div>
      <Field
        label="Guests"
        value={String(values.guests ?? 1)}
        onClick={() => onOpen?.("guests")}
        className="hidden w-42 shrink-0 lg:flex"
      />
      {searchButton}
    </div>
  );
}
