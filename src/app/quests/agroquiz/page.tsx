
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Lock } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const totalLevels = 50; // Increased to 50 levels

const QuizLevel = ({ level, isUnlocked, isCompleted }: { level: number; isUnlocked: boolean; isCompleted: boolean; }) => {
  const LevelContent = () => (
     <div
        className={cn(
            'w-16 h-16 rounded-full flex items-center justify-center border-4 relative',
             isCompleted
            ? 'bg-green-500 border-green-700'
            : isUnlocked
            ? 'bg-primary border-primary/50'
            : 'bg-muted border-dashed'
        )}
      >
        {isCompleted ? (
          <CheckCircle className="w-8 h-8 text-white" />
        ) : isUnlocked ? (
          <span className="text-2xl font-bold text-primary-foreground">{level}</span>
        ) : (
          <Lock className="w-8 h-8 text-muted-foreground" />
        )}
      </div>
  );

  if (!isUnlocked) {
    return (
        <div className="relative flex flex-col items-center">
            <LevelContent />
            {level < totalLevels && <div className="absolute top-1/2 left-full w-12 h-1 bg-border -z-10" />}
        </div>
    )
  }
  
  return (
    <div className="relative flex flex-col items-center">
      <Link href={`/quests/agroquiz/${level}`} passHref>
        <div className="cursor-pointer hover:opacity-80 transition-opacity">
            <LevelContent />
        </div>
      </Link>
      {level < totalLevels && <div className="absolute top-1/2 left-full w-12 h-1 bg-border -z-10" />}
    </div>
  );
};

export default function AgroQuizPage() {
    const [completedLevels, setCompletedLevels] = useState(0); 

    useEffect(() => {
        const savedProgress = localStorage.getItem('agroquiz-completed-levels');
        if (savedProgress) {
            setCompletedLevels(parseInt(savedProgress, 10));
        }
    }, []);

  return (
    <div className="container mx-auto px-4">
        <div className="text-center mb-8 pt-8">
            <h1 className="font-headline text-4xl font-bold text-primary mb-2">AgroQuiz Challenge</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
            Travel through the roadmap, complete quizzes at each level, and become a farming expert.
            </p>
        </div>

        <Card className="p-6 shadow-lg">
            <CardContent className="p-0">
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
                {Array.from({ length: totalLevels }, (_, i) => i + 1).map(level => (
                <QuizLevel
                    key={level}
                    level={level}
                    isUnlocked={level <= completedLevels + 1}
                    isCompleted={level <= completedLevels}
                />
                ))}
            </div>
            </CardContent>
        </Card>
        <div className="mt-8 text-center">
            <Button variant="link" asChild>
                <Link href="/quests">Back to Quests</Link>
            </Button>
        </div>
    </div>
  );
}
