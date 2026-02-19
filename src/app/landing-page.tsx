
import { LandingNavbar } from '@/components/krishi-quest/landing-navbar';
import { HeroSection } from '@/components/krishi-quest/hero-section';
import { FeaturesSection } from '@/components/krishi-quest/features-section';
import { TestimonialsSection } from '@/components/krishi-quest/testimonials-section';
import { LandingFooter } from '@/components/krishi-quest/landing-footer';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingNavbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
      </main>
      <LandingFooter />
    </div>
  );
}
