
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LeafIcon } from './icons';
import { ModeToggle } from './mode-toggle';

export function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b" style={{ backgroundColor: '#023047' }}>
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <LeafIcon className="h-8 w-8 text-white" />
          <span className="font-headline text-2xl font-bold text-white">KrishiQuest</span>
        </Link>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button variant="ghost" asChild className="text-white hover:bg-white/10 hover:text-white">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild style={{ backgroundColor: '#FB8500' }} className="text-white hover:bg-amber-600">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
