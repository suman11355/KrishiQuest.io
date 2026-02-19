

'use client';

import { useState, useEffect } from 'react';
import { Dashboard } from '@/components/krishi-quest/dashboard';
import type { UserProfile } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

// This is a mock user profile. In a real application, you would fetch this
// from your authentication provider or database.
const mockUserProfile: UserProfile = {
  name: 'Ramesh Kumar',
  location: 'Anandpur',
  avatar: 'avatar1',
  crop: 'Wheat',
};

export default function DashboardPage() {
    // We'll use state to hold the profile to simulate fetching it.
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        // Simulate fetching user profile from localStorage if it exists
        const savedProfile = localStorage.getItem('krishi-quest-user-profile');
        let profile: UserProfile;
        if (savedProfile) {
            profile = JSON.parse(savedProfile);
            
        } else {
             profile = mockUserProfile;
        }
        setUserProfile(profile);

        // Welcome toast
        if (profile.name) {
            toast({
                title: `Welcome Back, ${profile.name.split(' ')[0]}!`,
                description: "Your farm is looking great today. Let's get to work!",
            });
        }

    }, [toast]);

    if (!userProfile) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p>Loading profile...</p>
            </div>
        );
    }
  
    return <Dashboard userProfile={userProfile} />;
}
