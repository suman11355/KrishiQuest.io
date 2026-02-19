
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section id="hero" className="relative bg-primary/5 py-20 md:py-32">
        <div className="container mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 text-center md:grid-cols-2 md:text-left">
            <div className="space-y-6">
                <h1 className="font-headline text-4xl font-bold tracking-tighter text-primary md:text-5xl lg:text-6xl">
                    Unlock Your Farm's Potential with KrishiQuest
                </h1>
                <p className="text-lg text-muted-foreground md:text-xl">
                    The gamified mobile companion that makes farming smarter, more productive, and more fun. Get AI-powered advice, track your progress, and connect with a community of farmers.
                </p>
                <div className="flex flex-col items-center gap-4 md:flex-row">
                     <Button size="lg" asChild>
                        <Link href="/signup">
                            Get Started for Free
                            <ChevronRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                     <Button size="lg" variant="outline" asChild>
                        <Link href="#features">Learn More</Link>
                    </Button>
                </div>
            </div>
             <div className="relative h-80 w-full md:h-96">
                <Image 
                    src="https://t4.ftcdn.net/jpg/04/52/10/59/240_F_452105934_G6a3r3QFZSN06HkXwQrd7SajAuLP9v1X.jpg"
                    alt="A farmer holding a smartphone with a blank screen in a cotton field"
                    fill
                    className="rounded-lg object-cover shadow-xl"
                    data-ai-hint="farmer phone"
                />
            </div>
        </div>
    </section>
  );
}
