"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { getPersonalizedQuestRecommendations } from '@/ai/flows/personalized-quest-recommendations';
import type { UserProfile } from '@/lib/types';
import { Wand2, Loader2, CheckCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type QuestRecommendationsProps = {
  userProfile: UserProfile;
};

export function QuestRecommendations({ userProfile }: QuestRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { toast } = useToast();

  const handleGetRecommendations = async () => {
    setIsLoading(true);
    setRecommendations([]);
    try {
      const result = await getPersonalizedQuestRecommendations({
        ...userProfile,
        level: 5, // Using mock level from dashboard
      });
      setRecommendations(result.quests);
      setIsCompleted(true);
    } catch (error) {
      console.error("Failed to get recommendations:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not fetch quest recommendations. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Personalized Quests</CardTitle>
        <CardDescription>
          Get AI-powered quest recommendations based on your profile to maximize your yield and rewards.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center gap-2 text-primary">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="font-semibold">Generating your quests...</span>
          </div>
        ) : recommendations.length > 0 ? (
          <ul className="space-y-3">
            {recommendations.map((quest, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 flex-shrink-0 text-primary" />
                <span>{quest}</span>
              </li>
            ))}
          </ul>
        ) : (
          <Alert>
            <Wand2 className="h-4 w-4" />
            <AlertTitle>Ready for a challenge?</AlertTitle>
            <AlertDescription>
              Click the button below to generate quests tailored just for you.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleGetRecommendations} disabled={isLoading || isCompleted} className="w-full">
            {isLoading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</>
            ) : isCompleted ? (
                <>Quests Generated!</>
            ) : (
                <><Wand2 className="mr-2 h-4 w-4" /> Generate Quests</>
            )}
        </Button>
      </CardFooter>
    </Card>
  );
}
