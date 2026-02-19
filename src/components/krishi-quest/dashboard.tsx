
import type { UserProfile } from "@/lib/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badges } from "./badges";
import { KisanKoinIcon } from "./icons";
import { DailyStreak } from "./daily-streak";
import { UserNav } from "./user-nav";
import { WeatherWidget } from "./weather-widget";
import { Trophy, Star } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";

type DashboardProps = {
  userProfile: UserProfile;
};

const DashboardHeader = ({ userProfile }: DashboardProps) => {
    return (
        <header className="mb-8 rounded-lg p-4 shadow-md text-primary-foreground" style={{ backgroundColor: '#023047' }}>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div>
                        <h1 className="font-headline text-3xl font-bold">Welcome, {userProfile.name.split(' ')[0]}!</h1>
                        <p className="text-white/80">{userProfile.location} Panchayat</p>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                     <div className="flex items-center gap-2 rounded-full bg-black/20 px-4 py-2">
                        <KisanKoinIcon className="h-8 w-8"/>
                        <span className="font-headline text-2xl font-bold text-amber-400">1,250</span>
                        <span className="text-sm font-semibold text-white/80">Koins</span>
                    </div>
                    <div className="text-center">
                        <p className="font-headline text-sm font-semibold text-white/80">LEVEL</p>
                        <p className="text-3xl font-bold">5</p>
                    </div>
                    <UserNav userProfile={userProfile} />
                </div>
            </div>
        </header>
    )
}

const StatCard = ({ className, children }: { className?: string, children: React.ReactNode }) => (
    <Card className={cn("p-4 text-card-foreground shadow-md", className)} style={{ backgroundColor: '#FB8500' }}>
        <CardContent className="p-0">
            {children}
        </CardContent>
    </Card>
);


export function Dashboard({ userProfile }: DashboardProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar on mount
    const timer = setTimeout(() => setProgress(60), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <DashboardHeader userProfile={userProfile} />
      
      <div className="mb-6 lg:mb-8">
        <WeatherWidget />
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Your Rank */}
            <StatCard>
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <h3 className="font-headline text-sm font-medium">Your Rank</h3>
                    <Trophy className="h-6 w-6 text-amber-900" />
                </div>
                <div>
                    <div className="font-headline text-2xl font-bold">#12</div>
                    <p className="text-xs text-black/70">Top 15%</p>
                </div>
            </StatCard>
            {/* Your Level */}
            <StatCard>
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <h3 className="font-headline text-sm font-medium">Your Level</h3>
                    <Star className="h-6 w-6 text-yellow-400" />
                </div>
                <div>
                    <div className="font-headline text-2xl font-bold">Level 5</div>
                    <p className="text-xs text-black/70">250 XP to Level 6</p>
                    <div className="mt-4">
                        <Progress value={progress} className="h-2 bg-white/30 [&>div]:bg-white"/>
                    </div>
                </div>
            </StatCard>
            {/* Daily Streak */}
            <StatCard>
                <DailyStreak />
            </StatCard>
        </div>
        
        <div className="w-full">
            <Badges />
        </div>
      </div>
    </div>
  );
}
