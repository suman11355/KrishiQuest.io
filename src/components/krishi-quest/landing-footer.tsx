
import Link from 'next/link';
import { LeafIcon } from './icons';

export function LandingFooter() {
  return (
    <footer className="border-t" style={{ backgroundColor: '#023047' }}>
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <LeafIcon className="h-6 w-6 text-white" />
            <span className="font-headline font-bold text-white">KrishiQuest</span>
          </div>
          <p className="text-sm text-white/70">
            © {new Date().getFullYear()} KrishiQuest. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm text-white/70 hover:text-white">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-white/70 hover:text-white">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
