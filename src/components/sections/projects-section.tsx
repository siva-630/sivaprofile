"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Video, ChevronLeft, ChevronRight } from 'lucide-react';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import imgs from './img/im'

export interface Project {
  title: string;
  description: string;
  imageUrl: string | any;
  videoUrl?: string;
  tags: string[];
  liveLink?: string;
  repoLink?: string;
  dataAiHint: string;
  level: 1 | 2 | 3 | 4; // 1: HTML/CSS/JS, 2: React/Tailwind, 3: Full Stack, 4: AI
}

const projectsData: Project[] = [
  {
    title: 'SocialFlow AI',
    description: 'A full-stack social media automation platform built using the MERN Stack, Gemini AI, and CodeRabbit. Generates AI-powered content, schedules posts, and manages campaigns.',
    imageUrl: imgs.socialflow,
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Gemini AI'],
    liveLink: 'https://ai-social-media-automation-navy.vercel.app/',
    repoLink: 'https://github.com/siva-630/AI-Social-Media-Automation',
    dataAiHint: 'social media automation',
    level: 3,
  },
  {
    title: 'ShowTime',
    description: 'AI-Integrated Movie Booking Platform enabling users to discover movies, select seats, and book tickets. Enhanced with Google Gemini for personalized recommendations and chatbot assistance.',
    imageUrl: imgs.showtime,
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Clerk', 'Gemini AI'],
    liveLink: 'https://showtime-mu.vercel.app/',
    repoLink: 'https://github.com/siva-630/showtime',
    dataAiHint: 'movie booking app',
    level: 3,
  },
  {
    title: 'QR code generator',
    description: 'Just Built a QR Code Generator Using HTML, CSS, and JavaScript!',
    imageUrl: imgs.q,
    tags: ['HTML', 'CSS', 'JavaScript'],
    liveLink: 'https://qr-code-siva.vercel.app/',
    repoLink: 'https://github.com/siva-630/qrCode-siva',
    dataAiHint: 'website design',
    level: 1,
  },
  {
    title: 'Simple Age Calculator',
    description: 'A functional calculator built with vanilla JavaScript, HTML, and CSS. It handles basic arithmetic operations.',
    imageUrl: imgs.cal,
    tags: ['HTML', 'CSS', 'JavaScript'],
    liveLink: 'https://agecalculator-siva.vercel.app/',
    repoLink: '#',
    dataAiHint: 'calculator app',
    level: 1,
  },
  {
    title: 'Digital Clock ',
    description: 'Just built a sleek Digital Clock using HTML, CSS, and JavaScript! It updates in real time and looks great with a neon glow aesthetic..',
    imageUrl: imgs.clock,
    tags: ['HTML', 'CSS', 'JavaScript'],
    liveLink: 'https://timer-siva.vercel.app/',
    repoLink: 'https://github.com/siva-630/time-siva',
    dataAiHint: 'weather forecast',
    level: 1,
  },
  {
    title: 'Calculator',
    description: 'A classic to-do list application with features to add, delete, and mark tasks as complete. Uses LocalStorage for persistence.',
    imageUrl: imgs.c,
    tags: ['HTML', 'CSS', 'JavaScript',],
    liveLink: 'https://sivacal.vercel.app/',
    repoLink: '#',
    dataAiHint: 'to do list',
    level: 1,
  },
  {
    title: 'Amazon',
    description: 'amazon landing page build using html,css and javascript',
    imageUrl: imgs.amazon,
    tags: ['HTML', 'CSS', 'Flexbox'],
    liveLink: 'https://amazon-clone-fronted.vercel.app/',
    repoLink: 'https://github.com/siva-630/amazon-clone-fronted',
    dataAiHint: 'landing page',
    level: 1,
  },
  {
    title: 'filecompress',
    description: 'File compression reduces a file’s size by encoding its data more efficiently, saving storage space and transfer time.',
    imageUrl: imgs.fcp,
    videoUrl: '#',
    tags: ['React', 'Tailwind CSS', 'Express', 'clerk', 'lovable'],
    liveLink: 'https://compress-siva.vercel.app/',
    repoLink: 'https://github.com/siva-630/compress-on-the-fly',
    dataAiHint: 'online store',
    level: 2,
  },
  {
    title: 'Contact from',
    description: 'Built a Clean & Responsive Contact Form Using HTML & CSS ',
    imageUrl: imgs.contact,
    tags: ['HTML', 'CSS', 'JavaScript'],
    liveLink: 'https://contactformsiva.vercel.app/',
    repoLink: 'https://github.com/siva-630/contactform',
    dataAiHint: 'quiz interface',
    level: 1,
  }
];

export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <Card
    className="relative flex flex-col h-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group bg-card/60 backdrop-blur-sm border-white/10 text-card-foreground"
  >
    <GlowingEffect
      disabled={false}
      autoAnimate={false}
      spread={25}
      borderWidth={1.5}
      glow={true}
      proximity={50}
      inactiveZone={0.3}
      movementDuration={0.5}
    />
    <CardHeader className="p-0 relative z-10">
      <Image
        src={project.imageUrl}
        alt={project.title}
        width={600}
        height={400}
        className="object-cover w-full h-40 transition-transform duration-500 group-hover:scale-105"
        data-ai-hint={project.dataAiHint}
      />
      {project.videoUrl && (
        <div className="absolute top-2 right-2">
          <Button variant="secondary" size="icon" asChild>
            <a href={project.videoUrl} target="_blank" rel="noopener noreferrer" aria-label="Watch video demo">
              <Video className="h-5 w-5" />
            </a>
          </Button>
        </div>
      )}
    </CardHeader>
    <CardContent className="p-4 flex-grow z-10 flex flex-col">
      <CardTitle
        className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors"
        style={{ color: `hsl(var(--portfolio-brand-hue, 230), 100%, 70%)` }}
      >
        {project.title}
      </CardTitle>
      <CardDescription className="text-sm text-card-foreground/80 mb-4 h-16 overflow-y-auto">{project.description}</CardDescription>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge key={tag} variant="secondary">{tag}</Badge>
        ))}
      </div>
    </CardContent>
    <CardFooter className="p-4 flex justify-end space-x-3 z-10 mt-auto">
      {project.liveLink && (
        <Button variant="outline" size="sm" asChild>
          <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
          </a>
        </Button>
      )}
      {project.repoLink && (
        <Button variant="default" size="sm" asChild>
          <a href={project.repoLink} target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-4 w-4" /> View Code
          </a>
        </Button>
      )}
    </CardFooter>
  </Card>
);

export default function ProjectsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollability = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollWidth - clientWidth - scrollLeft > 5);
    }
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      updateScrollability();
      container.addEventListener('scroll', updateScrollability, { passive: true });
      window.addEventListener('resize', updateScrollability);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', updateScrollability);
      }
      window.removeEventListener('resize', updateScrollability);
    };
  }, [updateScrollability]);

  const handleScrollClick = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const cardElement = container.querySelector(':scope > div');
      const gap = 32; // gap-8
      let scrollAmount = 370;
      if (cardElement) {
        scrollAmount = (cardElement as HTMLElement).offsetWidth + gap;
      }
      container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="relative w-full pt-8 md:pt-12 lg:pt-16 pb-16 md:pb-24 lg:pb-32 bg-black text-gray-200 overflow-hidden">
      <GlowingEffect
        disabled={false}
        autoAnimate={false}
        glow={true}
        proximity={50}
        inactiveZone={0.3}
        movementDuration={0.5}
        spread={40}
        borderWidth={1}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center text-center mb-16 md:mb-24">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter"
            style={{ color: `hsl(var(--portfolio-brand-hue, 230), 100%, 70%)` }}
          >
            Projects
          </h2>
        </div>

        <div className="relative group/scrollable-row">
          {canScrollLeft && (
            <Button
              variant="outline"
              size="sm"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-30 rounded-full bg-background/70 hover:bg-background text-foreground opacity-100 transition-opacity duration-300 shadow-lg md:opacity-0 md:group-hover/scrollable-row:opacity-100"
              onClick={() => handleScrollClick('left')}
              aria-label="Scroll projects left"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-8 px-4 sm:px-8 py-4 scrollbar-hide"
          >
            {projectsData.map((project, cardIdx) => (
              <div key={`${project.title}-${cardIdx}`} className="flex-shrink-0 w-[280px]">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>

          {canScrollRight && (
            <Button
              variant="outline"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-30 rounded-full bg-background/70 hover:bg-background text-foreground opacity-100 transition-opacity duration-300 shadow-lg md:opacity-0 md:group-hover/scrollable-row:opacity-100"
              onClick={() => handleScrollClick('right')}
              aria-label="Scroll projects right"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
