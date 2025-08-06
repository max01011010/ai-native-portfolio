"use client";

import * as React from "react";
import { Link } from "react-router-dom";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const NavigationMenuComponent: React.FC = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/" className={navigationMenuTriggerStyle()}>
            Home
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <a href="#projects" className={navigationMenuTriggerStyle()}>
            Projects
          </a>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <a href="#blog" className={navigationMenuTriggerStyle()}>
            Blog
          </a>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavigationMenuComponent;