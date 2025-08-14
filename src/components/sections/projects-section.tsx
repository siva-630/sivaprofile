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
  imageUrl: string;
  videoUrl?: string;
  tags: string[];
  liveLink?: string;
  repoLink?: string;
  dataAiHint: string;
  level: 1 | 2 | 3 | 4; // 1: HTML/CSS/JS, 2: React/Tailwind, 3: Full Stack, 4: AI
}

const projectsData: Project[] = [
  {
    title: 'filecompress',
    description: 'File compression reduces a file’s size by encoding its data more efficiently, saving storage space and transfer time.',
    imageUrl: imgs.fcp,
    videoUrl: '#',
    tags: ['React', 'Tailwind CSS', 'Express' ,'clerk','lovable'],
    liveLink: 'https://compress-siva.vercel.app/',
    repoLink: 'https://github.com/siva-630/compress-on-the-fly',
    dataAiHint: 'online store',
    level: 3,
  },
  {
    title: 'AI Powered Chatbot',
    description: 'An intelligent chatbot application using modern AI APIs to provide customer support and answer queries.',
    imageUrl: 'https://placehold.co/600x400.png',
    videoUrl: '#',
    tags: ['Python', 'Flask', 'NLP', 'React'],
    liveLink: '#',
    repoLink: '#',
    dataAiHint: 'chatbot interface',
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
    imageUrl: imgs.cal ,
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
    tags: ['HTML', 'CSS', 'JavaScript', ],
    liveLink: 'https://sivacal.vercel.app/',
    repoLink: '#',
    dataAiHint: 'to do list',
    level: 1,
  },
  {
    title: 'Amazon',
    description: 'amazon landing page build using html,css and javascript',
    imageUrl:imgs.amazon,
    tags: ['HTML', 'CSS', 'Flexbox'],
    liveLink: 'https://amazon-clone-fronted.vercel.app/',
    repoLink: 'https://github.com/siva-630/amazon-clone-fronted',
    dataAiHint: 'landing page',
    level: 1,
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
  },
  {
    title: 'JavaScript Drum Kit',
    description: 'A fun web app that plays drum sounds when corresponding keys are pressed, using JavaScript to handle keyboard events and audio playback.',
    imageUrl: 'https://placehold.co/600x400.png',
    tags: ['HTML', 'CSS', 'JavaScript', 'Audio API'],
    liveLink: '#',
    repoLink: '#',
    dataAiHint: 'drum set',
    level: 1,
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management tool to help teams organize and track their work effectively. Features real-time updates.',
    imageUrl: 'https://placehold.co/600x400.png',
    tags: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    repoLink: '#',
    dataAiHint: 'task board',
    level: 3,
  },
  {
    title: 'Real-time Collaborative Whiteboard',
    description: 'A web application allowing multiple users to draw and collaborate on a shared whiteboard in real-time. Built with WebSockets.',
    imageUrl: 'https://placehold.co/600x400.png',
    tags: ['React', 'Node.js', 'Express', 'Socket.io', 'Canvas API'],
    liveLink: '#',
    repoLink: '#',
    dataAiHint: 'digital whiteboard collaboration',
    level: 3,
  },
  {
    title: 'Personal Finance Tracker',
    description: 'A dashboard to track income, expenses, and investments, with data visualization and budget planning features.',
    imageUrl: 'https://placehold.co/600x400.png',
    tags: ['Vue.js', 'Spring Boot', 'PostgreSQL', 'Chart.js'],
    liveLink: '#',
    dataAiHint: 'finance dashboard charts',
    level: 3,
  },
  {
    title: 'Recipe Sharing Platform',
    description: 'Users can create, share, and discover recipes. Includes user ratings, comments, and advanced search functionality.',
    imageUrl: 'https://placehold.co/600x400.png',
    tags: ['Angular', 'Django', 'MongoDB', 'Elasticsearch'],
    liveLink: '#',
    repoLink: '#',
    dataAiHint: 'food recipe website',
    level: 3,
  },
  {
    title: 'Online Learning Hub',
    description: 'A platform for instructors to create and sell courses, and for students to enroll and learn at their own pace.',
    imageUrl: 'https://placehold.co/600x400.png',
    tags: ['Next.js', 'Strapi', 'GraphQL', 'Stripe'],
    repoLink: '#',
    dataAiHint: 'elearning platform interface',
    level: 3,
  },
  {
    title: 'Event Management System',
    description: 'Comprehensive tool for planning, promoting, and managing events, including ticketing and attendee management.',
    imageUrl: 'https://placehold.co/600x400.png',
    tags: ['Ruby on Rails', 'PostgreSQL', 'React', 'Tailwind CSS'],
    liveLink: '#',
    repoLink: '#',
    dataAiHint: 'event calendar app',
    level: 3,
  },
  {
    title: 'Fitness Activity Logger',
    description: 'Log workouts, track progress, and connect with friends. Integrates with wearable fitness trackers.',
    imageUrl: 'https://placehold.co/600x400.png',
    tags: ['React Native', 'Firebase', 'Google Fit API'],
    liveLink: '#',
    dataAiHint: 'fitness app dashboard',
    level: 3,
  },
  {
    title: 'AI Story Generator',
    description: 'An application that uses generative AI to create unique stories based on user prompts and selected genres.',
    imageUrl: 'https://placehold.co/600x400.png',
    tags: ['Python', 'FastAPI', 'Genkit', 'Svelte'],
    repoLink: '#',
    dataAiHint: 'ai writing tool',
    level: 3,
  },
  {
    title: 'Sentiment Analysis Tool',
    description: 'Analyzes user-provided text to determine if the sentiment is positive, negative, or neutral using an AI model.',
    imageUrl: 'https://placehold.co/600x400.png',
    tags: ['Genkit', 'Next.js', 'NLP'],
    liveLink: '#',
    repoLink: '#',
    dataAiHint: 'text analysis',
    level: 4,
  },
  {
    title: 'Image Recognition App',
    description: 'Identifies and labels objects within an uploaded image using a pre-trained computer vision model.',
    imageUrl: 'https://placehold.co/600x400.png',
    tags: ['Genkit', 'React', 'Computer Vision'],
    liveLink: '#',
    repoLink: '#',
    dataAiHint: 'image recognition',
    level: 4,
  },
  {
    title: 'AI Code Assistant',
    description: 'A simple web-based tool that suggests code completions and helps debug simple functions.',
    imageUrl: 'https://placehold.co/600x400.png',
    tags: ['Genkit', 'TypeScript', 'LLM'],
    liveLink: '#',
    repoLink: '#',
    dataAiHint: 'code editor',
    level: 4,
  },
  {
    title: 'Personalized News Feed',
    description: 'Curates a list of news articles based on the user\'s reading history and preferences.',
    imageUrl: 'https://placehold.co/600x400.png',
    tags: ['Genkit', 'Python', 'Recommendation Engine'],
    liveLink: '#',
    repoLink: '#',
    dataAiHint: 'news website',
    level: 4,
  },
  {
    title: 'Generative Art Creator',
    description: 'Creates unique, abstract images from simple text prompts using a generative AI model.',
    imageUrl: 'https://placehold.co/600x400.png',
    tags: ['Genkit', 'Image Generation', 'React'],
    liveLink: '#',
    repoLink: '#',
    dataAiHint: 'abstract art',
    level: 4,
  },
  {
    title: 'AI-driven Music Composer',
    description: 'Generates short, simple musical melodies based on a selected mood or genre.',
    imageUrl: 'https://placehold.co/600x400.png',
    tags: ['Genkit', 'Web Audio API', 'Tone.js'],
    liveLink: '#',
    repoLink: '#',
    dataAiHint: 'music notes',
    level: 4,
  },
  {
    title: 'Automated Resume Parser',
    description: 'Extracts key information like contact details, skills, and experience from uploaded resumes.',
    imageUrl: 'https://placehold.co/600x400.png',
    tags: ['Genkit', 'Next.js', 'NLP'],
    liveLink: '#',
    repoLink: '#',
    dataAiHint: 'resume document',
    level: 4,
  },
  {
    title: 'Real-time Translation Service',
    description: 'Translates spoken language in real-time using speech-to-text and translation APIs.',
    imageUrl: 'https://placehold.co/600x400.png',
    tags: ['Genkit', 'WebSockets', 'Speech-to-Text'],
    liveLink: '#',
    repoLink: '#',
    dataAiHint: 'translation app',
    level: 4,
  },
  {
    title: 'AI Health Diagnosis Bot',
    description: 'A demonstration chatbot that provides preliminary health advice based on user-described symptoms.',
    imageUrl: 'https://placehold.co/600x400.png',
    tags: ['Genkit', 'React', 'Medical AI'],
    liveLink: '#',
    repoLink: '#',
    dataAiHint: 'health chat',
    level: 4,
  },
  {
    title: 'Stock Market Predictor',
    description: 'A simplified model that uses historical data to forecast potential stock market trends.',
    imageUrl: 'https://placehold.co/600x400.png',
    tags: ['Genkit', 'Python', 'TensorFlow'],
    liveLink: '#',
    repoLink: '#',
    dataAiHint: 'stock chart',
    level: 4,
  },
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
  const level1Projects = projectsData.filter(p => p.level === 1);
  const level2Projects = projectsData.filter(p => p.level === 2);
  const level3Projects = projectsData.filter(p => p.level === 3);
  const level4Projects = projectsData.filter(p => p.level === 4);

  const levelTitles = {
    1: "Frontend Foundations",
    2: "Modern Frontend Development",
    3: "Full Stack Applications",
    4: "AI-Powered Projects",
  };

  const projectLevels = [
    { title: levelTitles[1], projects: level1Projects, id: 'level1' },
    { title: levelTitles[2], projects: level2Projects, id: 'level2' },
    { title: levelTitles[3], projects: level3Projects, id: 'level3' },
    { title: levelTitles[4], projects: level4Projects, id: 'level4' },
  ];

  const scrollContainerRefs = projectLevels.map(() => useRef<HTMLDivElement>(null));
  const [scrollStates, setScrollStates] = useState(
    projectLevels.map(() => ({ canScrollLeft: false, canScrollRight: false }))
  );

  const updateScrollability = useCallback((levelIndex: number) => {
    const container = scrollContainerRefs[levelIndex].current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const canScrollLeft = scrollLeft > 5; // Allow for minor pixel differences
      const canScrollRight = scrollWidth - clientWidth - scrollLeft > 5; // Allow for minor pixel differences
      
      setScrollStates(prevStates => {
        const newStates = [...prevStates];
        if (newStates[levelIndex].canScrollLeft !== canScrollLeft || newStates[levelIndex].canScrollRight !== canScrollRight) {
          newStates[levelIndex] = { canScrollLeft, canScrollRight };
          return newStates;
        }
        return prevStates;
      });
    }
  }, [scrollContainerRefs]); 

  useEffect(() => {
    const observers: ResizeObserver[] = [];
    const currentRefs = scrollContainerRefs.map(ref => ref.current);

    currentRefs.forEach((container, index) => {
      if (container) {
        updateScrollability(index);
        container.addEventListener('scroll', () => updateScrollability(index), { passive: true });
        
        const observer = new ResizeObserver(() => updateScrollability(index));
        observer.observe(container);
        observers.push(observer);
      }
    });

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        currentRefs.forEach((_, index) => updateScrollability(index));
      }, 100);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(resizeTimeout);
      currentRefs.forEach((container, index) => {
        if (container) {
            container.removeEventListener('scroll', () => updateScrollability(index));
        }
      });
      observers.forEach(observer => observer.disconnect());
      window.removeEventListener('resize', handleResize);
    };
  }, [updateScrollability, projectsData]);

  const handleScrollClick = (levelIndex: number, direction: 'left' | 'right') => {
    const container = scrollContainerRefs[levelIndex].current;
    if (container) {
      const cardElement = container.querySelector(':scope > div');
      const gap = 32; // Corresponds to gap-8
      let scrollAmount = 370; // A reasonable default
      if (cardElement) {
        scrollAmount = cardElement.offsetWidth + gap;
      }
      container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="relative w-full py-12 md:py-16 lg:py-24 bg-black text-gray-200">
      <GlowingEffect
        disabled={false}
        autoAnimate={false}
        glow={true}
        proximity={50}
        inactiveZone={0.3}
        movementDuration={0.5}
        spread={30}
        borderWidth={2}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12">
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tighter"
            style={{ color: `hsl(var(--portfolio-brand-hue, 230), 100%, 70%)` }}
          >
            Featured Projects
          </h2>
          <p className="max-w-[700px] text-gray-300 text-base sm:text-xl/relaxed px-4">
            Here are some of the projects I've worked on, demonstrating my skills and passion for development.
          </p>
        </div>

        {projectLevels.map(({ title, projects }, levelIndex) => {
          if (projects.length === 0) return null;
          const currentScrollState = scrollStates[levelIndex];

          return (
            <div key={title} className="mb-12 last:mb-0">
              <h3 
                className="text-2xl font-semibold mb-6 text-center"
                style={{ color: `hsl(var(--portfolio-brand-hue, 230), 100%, 70%)` }}
              >
                {title}
              </h3>
              <div className="relative group/scrollable-row">
                {currentScrollState.canScrollLeft && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-20 rounded-full bg-background/70 hover:bg-background text-foreground opacity-100 transition-opacity duration-300 shadow-lg md:opacity-0 md:group-hover/scrollable-row:opacity-100"
                    onClick={() => handleScrollClick(levelIndex, 'left')}
                    aria-label={`Scroll ${title} projects left`}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                )}
                <div
                  ref={scrollContainerRefs[levelIndex]}
                  className="flex overflow-x-auto gap-8 px-4 sm:px-8 py-4 scrollbar-hide"
                >
                  {projects.map((project, cardIdx) => (
                    <div key={`${project.title}-${cardIdx}`} className="flex-shrink-0 w-[280px]">
                      <ProjectCard project={project} />
                    </div>
                  ))}
                </div>
                {currentScrollState.canScrollRight && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-20 rounded-full bg-background/70 hover:bg-background text-foreground opacity-100 transition-opacity duration-300 shadow-lg md:opacity-0 md:group-hover/scrollable-row:opacity-100"
                    onClick={() => handleScrollClick(levelIndex, 'right')}
                    aria-label={`Scroll ${title} projects right`}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

