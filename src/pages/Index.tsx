"use client";

import { MadeWithDyad } from "@/components/made-with-dyad";
import AppCardCarousel from "@/components/AppCardCarousel";
import CommonNinjaBlogWidget from "@/components/CommonNinjaBlogWidget";
import HeroSection from "@/components/HeroSection"; // Import the HeroSection

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <HeroSection />

      {/* Projects Section */}
      <div id="projects">
        <AppCardCarousel />
      </div>

      {/* Blog Section */}
      <div id="blog">
        <CommonNinjaBlogWidget />
      </div>

      <MadeWithDyad />
    </div>
  );
};

export default Index;