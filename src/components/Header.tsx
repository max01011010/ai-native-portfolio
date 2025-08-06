"use client";

import React from "react";
import NavigationMenuComponent from "./NavigationMenuComponent"; // Import the new NavigationMenuComponent

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 dark:bg-blue-800 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Max's Dev Portfolio</h1>
        <NavigationMenuComponent /> {/* Add the navigation menu here */}
      </div>
    </header>
  );
};

export default Header;