
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ListChecks, Users, ShoppingCart, CalendarDays, Gamepad2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/quests/agroplay', label: 'AgroPlay', icon: Gamepad2 },
  { href: '/quests', label: 'Quests', icon: ListChecks },
  { href: '/community', label: 'Community', icon: Users },
  { href: '/bazaar', label: 'Bazaar', icon: ShoppingCart },
  { href: '/crop-calendar', label: 'Calendar', icon: CalendarDays },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav 
        className="fixed bottom-0 left-0 right-0 z-50 border-t backdrop-blur-sm safe-area-inset-bottom"
        style={{ backgroundColor: '#8ecae6' }}
    >
      <div className="container mx-auto grid h-20 max-w-lg grid-cols-6">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-primary',
                isActive && 'text-primary'
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs font-medium text-center">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
