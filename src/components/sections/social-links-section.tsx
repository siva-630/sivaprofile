import { Card, CardContent } from '@/components/ui/card';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { Github, Linkedin, Code, Twitter } from 'lucide-react';
import Link from 'next/link';

const socialLinks = [
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: '#',
    description: 'Connect with me professionally and view my experience.',
  },
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/siva-630',
    description: 'Check out my code repositories and open-source contributions.',
  },
  {
    name: 'LeetCode',
    icon: Code,
    url: '#',
    description: 'View my problem-solving skills and coding challenges.',
  },
  {
    name: 'Twitter / X',
    icon: Twitter,
    url: '#',
    description: 'Follow my thoughts and tech updates.',
  },
];

export default function SocialLinksSection() {
  return (
    <section id="profiles" className="relative w-full py-8 md:py-12 bg-black text-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tighter"
            style={{ color: `hsl(var(--portfolio-brand-hue, 230), 100%, 70%)` }}
          >
            My Profiles
          </h2>
          <p className="text-gray-300 text-base sm:text-xl/relaxed">
            Find me on these platforms to see my work and get in touch.
          </p>
        </div>
        
        {/* One column layout for profile links */}
        <div className="flex flex-col gap-5">
          {socialLinks.map((link) => (
            <Link key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="group block w-full">
              <Card className="relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-gray-800 bg-card hover:border-primary transform hover:scale-[1.02]">
                <GlowingEffect
                  disabled={false}
                  autoAnimate={false}
                  glow={true}
                  proximity={50}
                  inactiveZone={0.3}
                  movementDuration={0.5}
                  spread={20}
                  borderWidth={1.5}
                />
                <CardContent className="p-4 sm:p-6 flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="p-3 bg-gray-900 rounded-full group-hover:bg-primary/20 transition-colors duration-300 flex-shrink-0">
                      <link.icon className="h-8 w-8 sm:h-10 sm:w-10 text-gray-300 group-hover:text-primary transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-100 group-hover:text-primary transition-colors">{link.name}</h3>
                      <p className="text-sm sm:text-base text-gray-400 group-hover:text-gray-300 transition-colors hidden sm:block mt-1">
                        {link.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-gray-500 group-hover:text-primary transition-colors hidden sm:block">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link h-6 w-6">
                      <path d="M15 3h6v6"/>
                      <path d="M10 14 21 3"/>
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
