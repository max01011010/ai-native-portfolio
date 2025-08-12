"use client";

import { MadeWithDyad } from "@/components/made-with-dyad";
import AppCardGrid from "@/components/AppCardGrid";
import CommonNinjaBlogWidget from "@/components/CommonNinjaBlogWidget";
import HeroSection from "@/components/HeroSection";
import KoFiWidget from "@/components/KoFiWidget"; // Import the new KoFiWidget

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <HeroSection />

      {/* Projects Section */}
      <div id="projects">
        <AppCardGrid />
      </div>

      {/* Blog Section */}
      <div id="blog">
        <CommonNinjaBlogWidget />
      </div>

      {/* Ko-fi Widget */}
      <KoFiWidget />

      <MadeWithDyad />
    </div>
  );
};

export default Index;