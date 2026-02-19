
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Lock, Share2 } from 'lucide-react';
import { SproutIcon, TractorIcon, WheatIcon } from "./icons";

const badges = [
    { name: "Green Thumb", unlocked: true, icon: <SproutIcon className="h-8 w-8 text-primary"/>, description: "Complete your first 5 quests." },
    { name: "Harvest King", unlocked: true, icon: <WheatIcon className="h-8 w-8 text-amber-600"/>, description: "Achieve a bumper crop." },
    { name: "Farm Mechanizer", unlocked: false, icon: <TractorIcon className="h-8 w-8 text-muted-foreground"/>, description: "Use 3 different types of equipment." },
    { name: "Panchayat Star", unlocked: false, icon: <Award className="h-8 w-8 text-muted-foreground"/>, description: "Reach the top 10 in the leaderboard." },
]

export function Badges() {

  const handleShare = (badgeName: string) => {
    const message = encodeURIComponent(`I've just unlocked the "${badgeName}" badge on KrishiQuest! 🌱🚜 Come join me!`);
    window.open(`https://api.whatsapp.com/send?text=${message}`);
  }

  return (
    <div style={{ backgroundColor: 'rgb(255, 227, 161)'}} className="p-6 rounded-lg">
      <div className="flex items-center gap-2 font-headline text-xl mb-2">
          <Award className="text-accent"/>
          Your Badges
      </div>
      <p className="text-sm text-card-foreground/80 mb-6">Celebrate your achievements and unlock new ones!</p>
      
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
          {badges.map(badge => (
              <div key={badge.name} className="flex flex-col items-center text-center">
                  <div className={`relative flex h-24 w-24 items-center justify-center rounded-full border-4 ${badge.unlocked ? 'border-accent bg-accent/20' : 'border-dashed border-muted-foreground/50 bg-muted'}`}>
                     {badge.icon}
                     {!badge.unlocked && <Lock className="absolute bottom-1 right-1 h-5 w-5 text-muted-foreground"/>}
                  </div>
                  <h4 className="mt-2 font-semibold text-card-foreground">{badge.name}</h4>
                  <p className="text-xs text-card-foreground/70">{badge.description}</p>
                  {badge.unlocked && (
                      <Button variant="ghost" size="sm" className="mt-1 text-primary" onClick={() => handleShare(badge.name)}>
                          <Share2 className="mr-1 h-3 w-3"/>
                          Share
                      </Button>
                  )}
              </div>
          ))}
      </div>
    </div>
  );
}
