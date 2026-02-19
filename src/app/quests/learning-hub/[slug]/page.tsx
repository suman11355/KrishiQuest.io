
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { BookOpen, CheckCircle, XCircle, Landmark, Sprout } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { KisanKoinIcon } from '@/components/krishi-quest/icons';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { useParams, useRouter } from 'next/navigation';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';

const learningData = {
  'organic-fertilizers': {
    slug: 'organic-fertilizers',
    title: 'The Benefits of Organic Fertilizers',
    icon: <Sprout className="h-6 w-6 text-primary" />,
    content: `
      <p>Organic fertilizers are derived from natural sources like compost, manure, and bone meal. Unlike their chemical counterparts, they improve soil structure, increase its ability to hold water and nutrients, and promote the growth of beneficial microorganisms.</p>
      <p class="mt-4">Using organic fertilizers is a long-term investment in your farm's health. They release nutrients slowly, which prevents nutrient runoff and water pollution. This slow-release process ensures that plants receive a steady supply of food as they need it, leading to healthier growth and more resilient crops.</p>
      <p class="mt-4">While chemical fertilizers might provide a quick boost, they can degrade soil quality over time, increase soil salinity, and harm the local ecosystem. Organic methods, on the other hand, build a sustainable foundation for future harvests.</p>
    `,
    quiz: {
      question: 'What is a key long-term benefit of using organic fertilizers?',
      options: [
        'They provide a quick nutrient boost.',
        'They improve soil structure and health over time.',
        'They are always cheaper than chemical fertilizers.',
        'They work best when used in large quantities.',
      ],
      answer: 'They improve soil structure and health over time.',
      reward: 50,
    }
  },
  'pm-kisan-scheme': {
    slug: 'pm-kisan-scheme',
    title: 'Understanding the PM-KISAN Scheme',
    icon: <Landmark className="h-6 w-6 text-primary" />,
    content: `
      <p>The Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a central government scheme that provides income support to all landholding farmer families in the country. The scheme aims to supplement the financial needs of the farmers in procuring various inputs related to agriculture and allied activities as well as domestic needs.</p>
      <p class="mt-4">Under the scheme, an income support of ₹6,000 per year in three equal installments is provided to all eligible farmer families. The funds are directly transferred to the bank accounts of the beneficiaries.</p>
      <p class="mt-4">Farmer families with total landholding of up to 2 hectares were initially eligible. The scheme was later expanded to cover all farmer families irrespective of the size of their landholdings.</p>
    `,
    quiz: {
      question: 'How much financial support is provided annually to eligible farmers under the PM-KISAN scheme?',
      options: [
        '₹2,000',
        '₹4,000',
        '₹6,000',
        '₹12,000',
      ],
      answer: '₹6,000',
      reward: 40,
    }
  }
};


export default function LearningArticlePage() {
  const { toast } = useToast();
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const article = learningData[slug as keyof typeof learningData];
  
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showResultDialog, setShowResultDialog] = useState(false);

  if (!article) {
    return (
        <div className="max-w-2xl mx-auto text-center">
            <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Module Not Found</AlertTitle>
                <AlertDescription>
                    The learning module you are looking for does not exist.
                </AlertDescription>
            </Alert>
            <Button asChild variant="link" className="mt-4">
                <Link href="/quests/learning-hub">Return to Learning Hub</Link>
            </Button>
        </div>
    )
  }

  const handleAnswerSubmit = () => {
    if (!selectedAnswer) {
      toast({
        variant: 'destructive',
        title: 'No Answer Selected',
        description: 'Please select an answer to submit.',
      });
      return;
    }

    setIsAnswered(true);
    const correct = selectedAnswer === article.quiz.answer;
    setIsCorrect(correct);
    setShowResultDialog(true);
  };

  const closeDialog = () => {
      setShowResultDialog(false);
      if (isCorrect) {
        // Navigate back to the hub menu on correct answer
        router.push('/quests/learning-hub');
      }
  }

  return (
    <>
        <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg">
            <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        {article.icon}
                    </div>
                    <CardTitle className="font-headline text-3xl text-primary">{article.title}</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <div className="prose prose-lg max-w-none text-foreground/90" dangerouslySetInnerHTML={{ __html: article.content }} />
                
                <hr className="my-8"/>

                <div className="rounded-lg bg-secondary/50 p-6">
                    <h3 className="font-headline text-xl font-bold mb-4">Knowledge Check</h3>
                    <p className="font-semibold mb-4 text-lg">{article.quiz.question}</p>
                    
                    <RadioGroup onValueChange={setSelectedAnswer} value={selectedAnswer ?? ''} className="space-y-4">
                        {article.quiz.options.map(option => (
                            <Label key={option} htmlFor={`option-${option}`} className={cn(
                                "flex items-center space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-all bg-background",
                                isAnswered ? "cursor-not-allowed" : "cursor-pointer",
                                "border-border"
                                )}>
                                <RadioGroupItem value={option} id={`option-${option}`} className="w-5 h-5" disabled={isAnswered}/>
                                <span className="text-base flex-1">{option}</span>
                            </Label>
                        ))}
                    </RadioGroup>
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={handleAnswerSubmit} disabled={isAnswered} className="w-full" size="lg">Submit Answer</Button>
            </CardFooter>
            </Card>
        </div>

        <Dialog open={showResultDialog} onOpenChange={closeDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="font-headline text-2xl text-center">Quiz Result</DialogTitle>
                </DialogHeader>
                <div className="py-4 text-center space-y-4">
                    {isCorrect ? (
                        <>
                            <CheckCircle className="h-16 w-16 text-green-500 mx-auto"/>
                            <DialogDescription className="text-xl font-bold text-green-600">Correct!</DialogDescription>
                            <p className="text-lg">Great job! You've understood the material well.</p>
                            <div className="flex justify-center items-center gap-2">
                                <p className="text-lg font-semibold">You earned:</p>
                                <div className="flex items-center gap-2 rounded-full bg-accent/20 px-3 py-1">
                                    <KisanKoinIcon className="h-6 w-6"/>
                                    <span className="font-headline text-xl font-bold text-amber-600">{article.quiz.reward}</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <XCircle className="h-16 w-16 text-red-500 mx-auto"/>
                            <DialogDescription className="text-xl font-bold text-red-600">Not Quite</DialogDescription>
                            <p className="text-lg">That wasn't the right answer. Please review the article and try again.</p>
                        </>
                    )}
                </div>
                <DialogFooter>
                    <Button onClick={closeDialog} className="w-full">
                        {isCorrect ? 'Back to Hub' : 'Try Again'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
  );
}
