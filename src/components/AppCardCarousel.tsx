"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface AppCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  isComingSoon?: boolean;
}

const appData: AppCardProps[] = [
  {
    id: "1",
    title: "Bit - AI Powered Habit Tracker",
    description: "An AI-powered habit tracker designed to help you build and maintain positive habits effortlessly.",
    imageUrl: "/achievements.png", // Updated to use the new image
    link: "https://bits-eta.vercel.app/",
  },
  {
    id: "2",
    title: "Shelter Availability Map",
    description: "A map showing real-time shelter availability. Launching in September!",
    imageUrl: "/placeholder.svg",
    link: "#",
    isComingSoon: true,
  },
];

const AppCardCarousel: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">My Projects</h2>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {appData.map((app) => (
              <CarouselItem key={app.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="flex flex-col h-full">
                    <CardHeader>
                      <img src={app.imageUrl} alt={app.title} className="w-full h-48 object-cover rounded-md mb-4" />
                      <CardTitle>{app.title}</CardTitle>
                      <CardDescription>{app.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow"></CardContent>
                    <CardFooter>
                      <Button asChild className="w-full" disabled={app.isComingSoon}>
                        {app.isComingSoon ? (
                          <span>Coming Soon!</span>
                        ) : (
                          <a href={app.link} target="_blank" rel="noopener noreferrer">
                            View Project <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default AppCardCarousel;