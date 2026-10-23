"use client";

import { useState } from "react";
import { SegmentedControl } from "@/components/ui/SegmentedControl";

const options = [
  { value: "all", label: "All" },
  { value: "barcelona", label: "Barcelona" },
  { value: "andorra", label: "Andorra" },
] as const;

export function SegmentedControlDemo() {
  const [value, setValue] = useState<(typeof options)[number]["value"]>("all");
  return <SegmentedControl label="City" options={options} value={value} onChange={setValue} />;
}
