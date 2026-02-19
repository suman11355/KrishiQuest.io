
import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';

export const IconContainer = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex h-16 w-16 items-center justify-center rounded-full bg-secondary',
      className
    )}
    {...props}
  />
);

export const LeafIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M11 20A7 7 0 0 1 4 13V8a5 5 0 0 1 5-5h2" />
    <path d="M11 20v-1a2 2 0 0 1 2-2h4a5 5 0 0 0 5-5V8" />
    <path d="M11 20a4 4 0 0 0-4-4" />
  </svg>
);

export const TractorIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M3 15h1" />
    <path d="M12 15h8" />
    <path d="M6 15a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    <path d="M17 15a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    <path d="M8 11V8h6l2 3" />
    <path d="m14 11-2 3" />
    <path d="M4 11h4" />
  </svg>
);

export const WheatIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M2 22v-4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4" />
    <path d="M18 22v-4a2 2 0 0 0-2-2h-4" />
    <path d="M11 16V4a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v12" />
    <path d="m14 9 3-3 3 3" />
    <path d="M17 6v6" />
  </svg>
);

export const CornIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 12a3 3 0 0 0-3-3v0a3 3 0 0 0-3 3v5a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3" />
    <path d="M9 12a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3h0a3 3 0 0 1-3-3" />
    <path d="M9 12a3 3 0 0 0 3 3v0a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3h0a3 3 0 0 0-3 3" />
    <path d="M15 12a3 3 0 0 1-3 3v0a3 3 0 0 1-3-3v-2a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3" />
    <path d="M9 20V10a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v10" />
    <path d="M12 22V4" />
  </svg>
);

export const SproutIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M7 20h10" />
    <path d="M12 20V6" />
    <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
    <path d="M12 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" />
    <path d="M12 4a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
  </svg>
);

export const KisanKoinIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="8" fill="hsl(var(--accent))" stroke="hsl(var(--accent-foreground))" />
    <path d="M12 15a3 3 0 0 0 3-3H9a3 3 0 0 1 3-3v6Z" stroke="hsl(var(--accent-foreground))" />
  </svg>
);

export const Avatar1Icon = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 80 80" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="80" height="80" rx="40" fill="#f2d4c2"></rect>
        <rect y="40" width="80" height="40" rx="0" fill="#6a4e3a"></rect>
        <circle cx="40" cy="30" r="14" fill="#6a4e3a"></circle>
        <path d="M40 44 C 48 44 52 40 52 30 C 52 20 48 16 40 16" fill="#f2d4c2" />
        <circle cx="33" cy="32" r="3" fill="#2c2c2c" />
        <path d="M38 38 C 40 42 42 42 44 38" stroke="#2c2c2c" strokeWidth="2" fill="none" />
    </svg>
);

export const Avatar2Icon = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 80 80" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="80" height="80" rx="40" fill="#ffdea6"></rect>
        <rect y="44" width="80" height="36" fill="#8d5524"></rect>
        <path d="M24 52 C 24 38 32 32 40 32 C 48 32 56 38 56 52" fill="#2c2c2c" />
        <circle cx="34" cy="38" r="3" fill="white" />
        <circle cx="46" cy="38" r="3" fill="white" />
        <path d="M38 46 C 40 44 42 44 44 46" stroke="white" strokeWidth="2" fill="none" />
    </svg>
);

export const Avatar3Icon = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 80 80" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="80" height="80" rx="40" fill="#d1b399"></rect>
        <rect y="40" width="80" height="40" fill="#a0522d"></rect>
        <circle cx="40" cy="34" r="16" fill="#4a3731"></circle>
        <path d="M40 38 L 28 50 L 52 50 Z" fill="#ffffff" />
        <circle cx="33" cy="36" r="2" fill="white" />
        <circle cx="47" cy="36" r="2" fill="white" />
    </svg>
);
