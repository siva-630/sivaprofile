
"use client";

import { useRef, useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Lightbulb, Cpu, Code, Database, Palette, Cloud, Wind, Github, Server, Box, Figma, ChevronLeft, ChevronRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { GlowingEffect } from '@/components/ui/glowing-effect';

interface Skill {
  name: string;
  description: string;
  icon: LucideIcon;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

const skillsData: Skill[] = [
  { name: 'HTML5', description: 'Proficient in semantic HTML structure and modern web standards.', icon: Code, level: 'Advanced' },
  { name: 'CSS3', description: 'Skilled in styling with CSS3, Flexbox, and Grid for responsive web design.', icon: Palette, level: 'Advanced' },
  { name: 'Tailwind CSS', description: 'Proficient in building responsive and modern UIs with the utility-first CSS framework Tailwind CSS.', icon: Wind, level: 'Advanced' },
  { name: 'JavaScript', description: 'Strong understanding of ES6+ JavaScript, DOM manipulation, and asynchronous programming.', icon: Code, level: 'Advanced' },
  { name: 'React & Next.js', description: 'Experienced in building dynamic UIs with React and server-rendered applications with Next.js.', icon: Code, level: 'Intermediate' },
  { name: 'Node.js', description: 'Experience with server-side JavaScript using Node.js and Express.', icon: Database, level: 'Intermediate' },
  { name: 'Python', description: 'Experience with Python for scripting and backend development.', icon: Code, level: 'Intermediate' },
  { name: 'SQL', description: 'Proficient in writing SQL queries for databases like PostgreSQL and MySQL.', icon: Database, level: 'Intermediate' },
  { name: 'Firebase', description: 'Familiar with Firebase services like Firestore, Authentication, and Hosting for full-stack development.', icon: Cloud, level: 'Intermediate' },
  { name: 'REST APIs', description: 'Skilled in designing, building, and consuming RESTful APIs.', icon: Server, level: 'Advanced' },
  { name: 'Git & GitHub', description: 'Proficient with version control using Git and collaborating on GitHub.', icon: Github, level: 'Advanced' },
  { name: 'Docker', description: 'Experience with containerizing applications using Docker for consistent environments.', icon: Box, level: 'Beginner' },
  { name: 'Figma', description: 'Skilled in creating wireframes, mockups, and prototypes using Figma.', icon: Figma, level: 'Advanced' },
  { name: 'AI/ML Concepts', description: 'Basic understanding of machine learning concepts and experience with AI APIs.', icon: Cpu, level: 'Beginner' },
  { name: 'UI/UX Design', description: 'Knowledge of UI/UX principles, wireframing, and prototyping tools.', icon: Lightbulb, level: 'Intermediate' },
];

export default function SkillsSection() {
  const skillsInFirstRow = 8;
  const skillRows = [
    { skills: skillsData.slice(0, skillsInFirstRow) },
    { skills: skillsData.slice(skillsInFirstRow) },
  ];

  const scrollContainerRefs = skillRows.map(() => useRef<HTMLDivElement>(null));
  const [scrollStates, setScrollStates] = useState(
    skillRows.map(() => ({ canScrollLeft: false, canScrollRight: false }))
  );

  const updateScrollability = useCallback((rowIndex: number) => {
    const container = scrollContainerRefs[rowIndex].current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const canScrollLeft = scrollLeft > 5;
      const canScrollRight = scrollWidth - clientWidth - scrollLeft > 5;
      
      setScrollStates(prevStates => {
        const newStates = [...prevStates];
        if (newStates[rowIndex].canScrollLeft !== canScrollLeft || newStates[rowIndex].canScrollRight !== canScrollRight) {
          newStates[rowIndex] = { canScrollLeft, canScrollRight };
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
  }, [updateScrollability, skillsData]);

  const handleScrollClick = (rowIndex: number, direction: 'left' | 'right') => {
    const container = scrollContainerRefs[rowIndex].current;
    if (container) {
      const scrollAmount = 220 + 32; // card width + gap
      container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="skills" className="relative w-full py-12 md:py-16 lg:py-24 bg-black text-gray-200">
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
            My Skillset
          </h2>
          <p className="max-w-[700px] text-gray-300 text-base sm:text-xl/relaxed">
            A glimpse into the technologies and tools I work with to bring ideas to life.
          </p>
        </div>
        <TooltipProvider delayDuration={100}>
          {skillRows.map(({ skills }, rowIndex) => (
            <div key={rowIndex} className="relative group/scrollable-row mb-8 last:mb-0">
              {scrollStates[rowIndex]?.canScrollLeft && (
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 rounded-full bg-background/70 hover:bg-background text-foreground opacity-100 transition-opacity duration-300 shadow-lg md:opacity-0 md:group-hover/scrollable-row:opacity-100"
                  onClick={() => handleScrollClick(rowIndex, 'left')}
                  aria-label="Scroll skills left"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              )}
              <div
                ref={scrollContainerRefs[rowIndex]}
                className="flex overflow-x-auto gap-8 px-4 sm:px-8 py-4 scrollbar-hide"
              >
                {skills.map((skill) => (
                  <div key={skill.name} className="flex-shrink-0 w-[220px]">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Card className="relative text-center shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:border-primary transform hover:scale-105 bg-card text-card-foreground h-full">
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
                          <CardContent className="p-4 flex flex-col items-center justify-center space-y-3 h-full">
                            <skill.icon className="h-12 w-12 text-accent group-hover:text-primary transition-colors duration-300" />
                            <h3 className="text-lg font-semibold">{skill.name}</h3>
                            <Badge variant={skill.level === 'Advanced' || skill.level === 'Expert' ? 'default' : 'secondary'}>{skill.level}</Badge>
                          </CardContent>
                        </Card>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="max-w-xs bg-popover text-popover-foreground p-3 rounded-md shadow-lg">
                        <p>{skill.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                ))}
              </div>
              {scrollStates[rowIndex]?.canScrollRight && (
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 rounded-full bg-background/70 hover:bg-background text-foreground opacity-100 transition-opacity duration-300 shadow-lg md:opacity-0 md:group-hover/scrollable-row:opacity-100"
                  onClick={() => handleScrollClick(rowIndex, 'right')}
                  aria-label="Scroll skills right"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              )}
            </div>
          ))}
        </TooltipProvider>
      </div>
    </section>
  );
}
