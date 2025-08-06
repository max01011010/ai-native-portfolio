"use client";

import { MadeWithDyad } from "@/components/made-with-dyad";
import AppCardCarousel from "@/components/AppCardCarousel";
import CommonNinjaBlogWidget from "@/components/CommonNinjaBlogWidget";
import Header from "@/components/Header"; // Import the new Header component

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Header Section */}
      <Header />

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