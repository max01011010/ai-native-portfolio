"use client";

import AppCardGrid from "@/components/AppCardGrid";
import CommonNinjaBlogWidget from "@/components/CommonNinjaBlogWidget";
import HeroSection from "@/components/HeroSection";
import KoFiWidget from "@/components/KoFiWidget";
import Footer from "@/components/Footer"; // Import the new Footer component

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

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Index;