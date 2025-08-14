
"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

// The direct URL to the video file.
// For production, it's highly recommended to download this video,
// optimize it for web, and host it locally in your /public folder.
const videoUrl = "https://cdn.pixabay.com/video/2022/05/19/121032-715919998_large.mp4";

export default function HeroSection() {
  const displayName = "N. Siva Shankar";

  return (
    <section
      id="hero"
      className="relative solar-system-bg w-full min-h-[calc(100vh-4rem)] flex items-center justify-center py-16 md:py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline // Important for iOS and other mobile browsers
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={videoUrl}
        // It's good practice to provide a poster image as a fallback or while video loads
        // poster="/path/to/your/video-poster.jpg"
      >
        {/* You can add <source> tags here for different video formats if needed */}
        {/* <source src="path/to/video.webm" type="video/webm" /> */}
        Your browser does not support the video tag.
      </video>

      {/* Main content container - ensure it's above the video */}
      <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center justify-center space-y-6">
          <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl !leading-tight text-foreground animate-typewriter neon-text-glow">
            {displayName}
          </h1>
          <Button
            asChild
            size="lg"
            className="mt-6 text-white font-semibold rounded-lg bg-gradient-to-r from-sky-400 via-blue-500 to-purple-600 shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[0_0_20px_theme(colors.purple.400)] focus:outline-none focus:ring-4 focus:ring-sky-500/60"
          >
            <a href="/resume.pdf" download="N-Siva-Shankar-Resume.pdf">
              <FileText className="mr-2 h-5 w-5" />
              Resume
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
