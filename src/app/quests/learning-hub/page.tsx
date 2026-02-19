
'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Sprout, Landmark } from 'lucide-react';
import Link from 'next/link';

const learningModules = [
  {
    slug: 'organic-fertilizers',
    title: 'The Benefits of Organic Fertilizers',
    description: 'Learn how organic fertilizers improve soil health and lead to sustainable farming.',
    icon: <Sprout className="h-8 w-8 text-green-600" />,
  },
  {
    slug: 'pm-kisan-scheme',
    title: 'Understanding the PM-KISAN Scheme',
    description: 'Get details on this government scheme that provides income support to farmers.',
    icon: <Landmark className="h-8 w-8 text-blue-600" />,
  },
];

export default function LearningHubMenuPage() {
  return (
    <>
      <div className="text-center mb-8 pt-8">
        <h1 className="font-headline text-4xl font-bold text-primary mb-2">Learning Hub</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Expand your knowledge by choosing a topic below. Read the article and complete the quiz to earn rewards.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {learningModules.map((module) => (
          <Card key={module.slug} className="shadow-lg hover:shadow-xl transition-shadow flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 font-headline text-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    {module.icon}
                </div>
                {module.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{module.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Link href={`/quests/learning-hub/${module.slug}`} passHref className="w-full">
                <Button className="w-full" asChild>
                  <span>Start Learning</span>
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button variant="link" asChild>
          <Link href="/quests">Back to Quests</Link>
        </Button>
      </div>
    </>
  );
}
