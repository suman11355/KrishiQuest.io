
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star } from 'lucide-react';
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const stats = [
  {
    title: "Panchayat Rank",
    value: "#12",
    description: "Top 15%",
    icon: <Trophy className="h-6 w-6 text-amber-500" />,
  },
  {
    title: "Farmer Level",
    value: "Level 5",
    description: "250 XP to Level 6",
    icon: <Star className="h-6 w-6 text-yellow-400" />,
  },
];

export function ProgressTracker() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar on mount
    const timer = setTimeout(() => setProgress(60), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {stats.map((stat, index) => (
        <div key={stat.title}>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="font-headline text-sm font-medium">{stat.title}</h3>
            {stat.icon}
          </div>
          <div>
            <div className="font-headline text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
            {stat.title === "Farmer Level" && ( // Add progress bar only for the Level card
              <div className="mt-4">
                <Progress value={progress} className="h-2"/>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
