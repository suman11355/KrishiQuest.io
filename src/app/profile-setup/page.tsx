
'use client';

import { useRouter } from 'next/navigation';
import { ProfileSetup } from '@/components/krishi-quest/profile-setup';
import type { UserProfile } from '@/lib/types';

export default function ProfileSetupPage() {
  const router = useRouter();

  const handleProfileCreate = (profile: UserProfile) => {
    console.log('Profile Created:', profile);
    // In a real app, you would save the profile to your database.
    // We'll also save it to localStorage for this demo to persist it across pages.
    localStorage.setItem('krishi-quest-user-profile', JSON.stringify(profile));
    router.push('/dashboard');
  };

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <h1 className="font-headline text-4xl font-bold text-primary mb-2">Welcome to KrishiQuest!</h1>
        <p className="mb-8 max-w-2xl text-center text-lg text-foreground/80">
            Let&apos;s set up your digital farm to begin your quest for a bountiful harvest.
        </p>
        <ProfileSetup onProfileCreate={handleProfileCreate} />
    </main>
  );
}
