"use client";

import React, { useState } from "react";
import LoadingScreen  from "@/components/LoadingScreen";
import HeroSection    from "@/components/sections/HeroSection";
import AboutSection   from "@/components/sections/AboutSection";
import EventsSection  from "@/components/sections/EventsSection";
import ScheduleSection from "@/components/sections/ScheduleSection";
import SpeakersSection from "@/components/sections/SpeakersSection";
import FaqSection     from "@/components/sections/FaqSection";
import ContactSection from "@/components/sections/ContactSection";
import BackToTop      from "@/components/BackToTop";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      <div
        className={`transition-opacity duration-700 ${loading ? "opacity-0" : "opacity-100"}`}
      >
        <HeroSection />
        <AboutSection />
        <EventsSection />
        <ScheduleSection />
        <SpeakersSection />
        <FaqSection />
        <ContactSection />
        <BackToTop />
      </div>
    </>
  );
}
