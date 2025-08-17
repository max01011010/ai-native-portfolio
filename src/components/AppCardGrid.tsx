"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
    title: "Bit - AI Powered Habits",
    description: "An AI-powered habit tracker designed to help you build and maintain positive habits effortlessly.",
    imageUrl: "/Placeholder1Zoomed.png",
    link: "https://bits-eta.vercel.app/",
  },
  {
    id: "4",
    title: "JobRewrite",
    description: "AI powered tool to rewrite resume entries to be ATS-compliant and results-oriented.",
    imageUrl: "/JobRewrite.png",
    link: "https://jobrewrite.vercel.app/",
    isComingSoon: false,
  },
  {
    id: "2",
    title: "Shelter Connect",
    description: "A map showing real-time shelter availability. Launching in September!",
    imageUrl: "/mappreview.png",
    link: "#",
    isComingSoon: true,
  },
  {
    id: "3",
    title: "Practicum",
    description: "AI supported and adaptive language learning app. Under development.",
    imageUrl: "/placeholder.svg",
    link: "#",
    isComingSoon: true,
  },
];

const AppCardGrid: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100 opacity-0 animate-fade-in-up">My Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {appData.map((app, index) => (
            <Card
              key={app.id}
              className="flex flex-col h-full opacity-0 animate-fade-in-up transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
              style={{ animationDelay: `${index * 100 + 200}ms` }}
            >
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppCardGrid;