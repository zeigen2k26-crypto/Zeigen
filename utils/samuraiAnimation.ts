import React from "react";
import { SYMPOSIUM_CONFIG } from "@/constants/config";

/**
 * Utility to trigger the Samurai tree-cutting animation in HeroSection
 */
export function triggerSamuraiCutAnimation() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("samurai-cut-tree"));
  }
}

/**
 * Handles Register button click:
 * 1. Prevents default instant navigation
 * 2. Triggers the Samurai tree cut animation
 * 3. Scrolls to hero section if not already in view
 * 4. Waits 2 seconds for animation completion
 * 5. Opens the Google Form registration page in a new tab
 */
export function handleRegisterClick(
  e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  targetUrl: string = SYMPOSIUM_CONFIG.GOOGLE_FORM_URL
) {
  if (e) {
    e.preventDefault();
  }

  triggerSamuraiCutAnimation();

  // Scroll to hero if user is scrolled away, so they can watch the tree get sliced
  if (typeof window !== "undefined") {
    const heroEl = document.getElementById("hero");
    if (heroEl) {
      const rect = heroEl.getBoundingClientRect();
      if (rect.top < -300 || rect.bottom > window.innerHeight + 300) {
        heroEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  // 2 second timeout after tree is cut before opening register link
  setTimeout(() => {
    if (typeof window !== "undefined") {
      window.open(targetUrl, "_blank", "noopener,noreferrer");
    }
  }, 2000);
}
