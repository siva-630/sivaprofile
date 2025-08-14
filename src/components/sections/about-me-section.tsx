import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GlowingEffect } from '@/components/ui/glowing-effect';

import imgs from './img/im'

export default function AboutMeSection() {
  return (
    <section id="about" className="relative w-full py-8 md:py-12 lg:py-16 bg-black text-gray-200">
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
        <div className="grid gap-8 lg:grid-cols-2 items-center md:gap-10">
          <div className="flex justify-center lg:justify-start">
            <div className="relative group w-full max-w-[350px] mx-auto lg:mx-50 ml-100">
              <Image
                src={imgs.siva}
                alt="About Me Photo"
                width={500}
                height={600}
                className="rounded-xl object-cover object-center shadow-2xl w-full h-auto transform transition-all duration-300 group-hover:scale-105"
                data-ai-hint="about me photo"
                priority
              />
               
            </div>
          </div>
          <div className="space-y-4 md:space-y-6">
            <h2
              className="text-3xl md:text-4xl font-bold tracking-tighter sm:text-4xl text-center"
              style={{ color: `hsl(var(--portfolio-brand-hue, 230), 100%, 70%)` }}
            >
              About Me
            </h2>
            <Card className="relative shadow-lg bg-card text-card-foreground">
              <GlowingEffect
                disabled={false}
                autoAnimate={false}
                spread={20}
                borderWidth={1.5}
                glow={true}
                blur={0}
                proximity={50}
                inactiveZone={0.3}
                movementDuration={0.5}
              />
              <CardContent className="pt-4">
                <p>
                  Hello! I'm N Siva Shankar passionate and driven student with a strong interest in technology, design, and innovation.
                  I thrive on solving complex problems and creating meaningful digital experiences. My journey in tech has been fueled by curiosity and a desire to continuously learn and grow.
                </p>
                <p className="mt-4">
                  Currently, I'm exploring the intersections of web development, artificial intelligence, and user experience design. I believe in the power of technology to make a positive impact on the world, and I'm excited to contribute my skills to projects that matter.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
