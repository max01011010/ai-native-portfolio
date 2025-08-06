"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  link: string;
  published: string;
  summary: string;
}

const BlogFeed: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        // Public CORS proxy
        const proxyUrl = "https://cors-anywhere.herokuapp.com/";
        // Updated Blogger Atom feed URL
        const feedUrl = "https://freedbydesign.blogspot.com/feeds/posts/default?alt=atom";
        
        // Combine proxy URL with the actual feed URL
        const response = await fetch(proxyUrl + feedUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "application/xml");

        const entries = xmlDoc.getElementsByTagName("entry");
        const fetchedPosts: BlogPost[] = [];

        for (let i = 0; i < entries.length; i++) {
          const entry = entries[i];
          const titleElement = entry.getElementsByTagName("title")[0];
          const linkElement = entry.getElementsByTagName("link")[1]; // The second link is usually the permalink
          const publishedElement = entry.getElementsByTagName("published")[0];
          const summaryElement = entry.getElementsByTagName("summary")[0];

          if (titleElement && linkElement && publishedElement && summaryElement) {
            fetchedPosts.push({
              id: entry.getElementsByTagName("id")[0]?.textContent || `post-${i}`,
              title: titleElement.textContent || "No Title",
              link: linkElement.getAttribute("href") || "#",
              published: new Date(publishedElement.textContent || "").toLocaleDateString(),
              summary: summaryElement.textContent || "No summary available.",
            });
          }
        }
        setPosts(fetchedPosts.slice(0, 3)); // Displaying up to 3 recent posts
      } catch (e: any) {
        console.error("Failed to fetch blog posts:", e);
        setError("Failed to load blog posts. This might be due to CORS restrictions or network issues. If using a public proxy, it might be rate-limited or down.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <section className="py-12 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">Latest Blog Posts</h2>
        {loading && <p className="text-center text-gray-600 dark:text-gray-300">Loading blog posts...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && posts.length === 0 && (
          <p className="text-center text-gray-600 dark:text-gray-300">No blog posts found.</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                  Published: {post.published}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-700 dark:text-gray-300 line-clamp-3">{post.summary}</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <a href={post.link} target="_blank" rel="noopener noreferrer">
                    Read More <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogFeed;