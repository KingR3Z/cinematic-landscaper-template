"use client";

import { useABTest } from "@/components/ABTestProvider";
import HeroOverlay from "@/components/HeroOverlay";
import HeroOverlayB from "@/components/HeroOverlayB";

export default function HeroSwitch() {
  const { variant } = useABTest();
  return variant === "B" ? <HeroOverlayB /> : <HeroOverlay />;
}
