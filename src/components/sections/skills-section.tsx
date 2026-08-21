"use client";

import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { 
  FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaPython, 
  FaDocker, FaGithub, FaFigma, FaJava, FaAws 
} from 'react-icons/fa';
import { 
  SiTailwindcss, SiJavascript, SiNextdotjs, SiExpress, 
  SiMongodb, SiPostgresql, SiFirebase, SiTypescript, 
  SiPrisma, SiRedux, SiGraphql 
} from 'react-icons/si';

const fullstackIcons = [
  { icon: FaHtml5, color: '#E34F26', name: 'HTML5' },
  { icon: FaCss3Alt, color: '#1572B6', name: 'CSS3' },
  { icon: SiJavascript, color: '#F7DF1E', name: 'JavaScript' },
  { icon: SiTypescript, color: '#3178C6', name: 'TypeScript' },
  { icon: FaReact, color: '#61DAFB', name: 'React' },
  { icon: SiNextdotjs, color: '#ffffff', name: 'Next.js' },
  { icon: SiTailwindcss, color: '#06B6D4', name: 'Tailwind CSS' },
  { icon: FaNodeJs, color: '#339933', name: 'Node.js' },
  { icon: SiExpress, color: '#ffffff', name: 'Express' },
  { icon: FaPython, color: '#3776AB', name: 'Python' },
  { icon: FaJava, color: '#007396', name: 'Java' },
  { icon: SiMongodb, color: '#47A248', name: 'MongoDB' },
  { icon: SiPostgresql, color: '#4169E1', name: 'PostgreSQL' },
  { icon: SiFirebase, color: '#FFCA28', name: 'Firebase' },
  { icon: SiPrisma, color: '#2D3748', name: 'Prisma' },
  { icon: SiRedux, color: '#764ABC', name: 'Redux' },
  { icon: SiGraphql, color: '#E10098', name: 'GraphQL' },
  { icon: FaAws, color: '#FF9900', name: 'AWS' },
  { icon: FaDocker, color: '#2496ED', name: 'Docker' },
  { icon: FaGithub, color: '#ffffff', name: 'GitHub' },
  { icon: FaFigma, color: '#F24E1E', name: 'Figma' },
];

export default function SkillsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollability = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollWidth - clientWidth - scrollLeft > 5);
    }
  };

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
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="skills" className="relative w-full pt-16 md:pt-24 lg:pt-32 pb-8 md:pb-12 lg:pb-16 bg-black text-gray-200 overflow-hidden">
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
            Skills
          </h2>
        </div>

        <div className="relative w-full group/scrollable">
          {/* Gradient Overlays */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

          {/* Navigation Buttons */}
          {canScrollLeft && (
            <Button
              variant="outline"
              size="sm"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 rounded-full bg-background/70 hover:bg-background text-foreground opacity-100 transition-opacity duration-300 shadow-lg md:opacity-0 md:group-hover/scrollable:opacity-100"
              onClick={() => handleScroll('left')}
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}

          {canScrollRight && (
            <Button
              variant="outline"
              size="sm"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 rounded-full bg-background/70 hover:bg-background text-foreground opacity-100 transition-opacity duration-300 shadow-lg md:opacity-0 md:group-hover/scrollable:opacity-100"
              onClick={() => handleScroll('right')}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          )}

          {/* Icon Track */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-8 sm:gap-12 md:gap-16 scrollbar-hide py-8 px-16"
          >
            {fullstackIcons.map((item, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 flex flex-col items-center justify-center group cursor-pointer"
              >
                <div 
                  className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl bg-white/5 border border-white/10 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-white/10 group-hover:border-white/20"
                >
                  <item.icon 
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 opacity-80 group-hover:opacity-100 transition-all duration-300"
                    style={{ 
                      color: item.color,
                      filter: `drop-shadow(0 0 8px ${item.color}40)` 
                    }} 
                  />
                </div>
                <span className="mt-4 text-xs sm:text-sm font-medium text-gray-500 group-hover:text-gray-200 transition-colors duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
