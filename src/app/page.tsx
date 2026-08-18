import { HeroSection } from '@/components/ui/hero-odyssey'; // Updated import
import AboutMeSection from '@/components/sections/about-me-section';
import SocialLinksSection from '@/components/sections/social-links-section';
import SkillsSection from '@/components/sections/skills-section';
import ProjectsSection from '@/components/sections/projects-section';
import EducationSection from '@/components/sections/education-section';
import ContactSection from '@/components/sections/contact-section';

export default function Home() {
  return (
    <>
      <HeroSection /> {/* Using the new HeroSection from hero-odyssey */}
      <AboutMeSection />
      <SocialLinksSection />
      <SkillsSection />
      <ProjectsSection />
      <EducationSection />
      <ContactSection />
    </>
  );
}