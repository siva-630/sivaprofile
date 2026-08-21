
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Award, CalendarDays } from 'lucide-react';
import { GlowingEffect } from '@/components/ui/glowing-effect';

interface TimelineItem {
  type: 'education' | 'achievement';
  title: string;
  institutionOrEvent: string;
  date: string;
  description: string;
}

const timelineData: TimelineItem[] = [
  {
    type: 'education',
    title: 'Bachelor of Technology (B.Tech) in Artificial Intelligence & Data Science',
    institutionOrEvent: 'Vishnu Institute of Technology, Bhimavaram, Andhra Pradesh',
    date: '2024 - 2027 | 91%',
    description: 'Focused on software engineering, data structures, algorithms, and AI.',
  },
  {
    type: 'education',
    title: 'Diploma in Computer Science',
    institutionOrEvent: 'A.A.N.M & V.V.R.S Polytechnic, Andhra Pradesh',
    date: '2021 - 2023 | 89.85%',
    description: 'Built a strong foundation in computer science and programming fundamentals.',
  },
  {
    type: 'education',
    title: 'Scrimba Learning MERN Stack',
    institutionOrEvent: 'Scrimba',
    date: 'Summer 2022',
    description: 'Intensive program covering full-stack web development with React, Node.js, and MongoDB.',
  },
  {
    type: 'achievement',
    title: 'Google Student Ambassador',
    institutionOrEvent: 'Google',
    date: 'Present',
    description: 'Organized technical workshops and community sessions on web development.',
  },
  {
    type: 'achievement',
    title: 'Solved 365+ DSA problems on LeetCode',
    institutionOrEvent: 'LeetCode',
    date: 'Ongoing',
    description: 'Consistently practicing and solving Data Structures and Algorithms problems to improve problem-solving skills.',
  },
];

export default function EducationSection() {
  return (
    <section id="education" className="relative w-full py-8 md:py-12 lg:py-16 bg-black text-gray-200">
       <GlowingEffect
        disabled={false}
        autoAnimate={false}
        spread={30}
        borderWidth={2}
        glow={true}
        proximity={50}
        inactiveZone={0.3}
        movementDuration={0.5}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12">
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tighter"
            style={{ color: `hsl(var(--portfolio-brand-hue, 230), 100%, 70%)` }}
          >
            Education & Achievements
          </h2>
          <p className="max-w-[700px] text-gray-300 text-base sm:text-xl/relaxed">
            My academic journey and key accomplishments that have shaped my skills and knowledge.
          </p>
        </div>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-border -ml-0.5 hidden md:block"></div>

          {timelineData.map((item, index) => (
            <div key={index} className={`mb-8 flex md:items-start w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="hidden md:block w-1/2"></div>
              <div className="hidden md:block relative mt-6">
                <div className={`absolute w-6 h-6 rounded-full ${item.type === 'education' ? 'bg-primary' : 'bg-accent'} -mt-3 left-1/2 -ml-3 border-4 border-background shadow-md z-10`}>
                   {item.type === 'education' ? <GraduationCap className="text-primary-foreground w-3 h-3 m-auto" /> : <Award className="text-accent-foreground w-3 h-3 m-auto" />}
                </div>
              </div>
              <Card className={`relative w-full md:w-1/2 shadow-lg transition-all duration-300 hover:shadow-xl ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'} bg-card text-card-foreground`}>
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
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="tracking-tight text-lg font-semibold md:text-xl">{item.title}</CardTitle>
                    {item.type === 'education' ?
                      <GraduationCap className="h-8 w-8 text-primary md:hidden" style={{ color: `hsl(var(--portfolio-brand-hue, 230), 100%, 70%)` }} /> :
                      <Award className="h-8 w-8 text-accent md:hidden" />
                    }
                  </div>
                  <CardDescription className="text-sm text-gray-400">
                    {item.institutionOrEvent}
                  </CardDescription>
                  <div className="flex items-center text-xs text-gray-500 pt-1">
                    <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
                    {item.date}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300">{item.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
