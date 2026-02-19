
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, Sprout, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function QuestsPage() {
  return (
    <div className="container mx-auto px-4 pt-8">
        <div className="text-center">
            <h1 className="font-headline text-5xl font-bold text-primary mb-2">Quests</h1>
            <p className="text-muted-foreground mb-8">
                Test your knowledge and farming strategy to earn rewards.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-xl">
                <BrainCircuit className="text-primary" />
                AgroQuiz
                </CardTitle>
                <CardDescription>
                Answer farming questions to climb through 50 levels of challenges.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">Ready to test your agricultural knowledge? Complete all the levels to prove you are a quiz master!</p>
            </CardContent>
            <div className="p-6 pt-0">
                <Link href="/quests/agroquiz" passHref>
                  <Button className="w-full" asChild><span>Play AgroQuiz</span></Button>
                </Link>
            </div>
            </Card>

            <Card className="shadow-lg hover-shadow-xl transition-shadow">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-xl">
                <Sprout className="text-primary" />
                Plant a Tree
                </CardTitle>
                <CardDescription>
                Contribute to a greener planet. Plant a tree and upload a photo.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">Help the environment and earn Kisan Koins. Upload a picture of you planting a sapling to complete the quest.</p>
            </CardContent>
            <div className="p-6 pt-0">
                <Link href="/quests/plant-tree" passHref>
                    <Button className="w-full" asChild><span>Start Quest</span></Button>
                </Link>
            </div>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-xl">
                <BookOpen className="text-primary" />
                Learning Hub
                </CardTitle>
                <CardDescription>
                Read articles and answer questions to expand your knowledge.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">Learn about important topics like organic fertilizers and new government schemes, and earn rewards for your knowledge.</p>
            </CardContent>
            <div className="p-6 pt-0">
                <Link href="/quests/learning-hub" passHref>
                    <Button className="w-full" asChild><span>Visit Hub</span></Button>
                </Link>
            </div>
            </Card>

        </div>
    </div>
  );
}
