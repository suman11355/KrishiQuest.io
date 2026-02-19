
'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Sprout, Upload, Image as ImageIcon, CheckCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { KisanKoinIcon } from '@/components/krishi-quest/icons';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import Link from 'next/link';

const QUEST_REWARD = 150;

export default function PlantTreePage() {
  const { toast } = useToast();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showResultDialog, setShowResultDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setIsVerified(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVerify = () => {
    if (!uploadedImage) {
      toast({
        variant: 'destructive',
        title: 'No Image Uploaded',
        description: 'Please upload an image to verify your task.',
      });
      return;
    }

    setIsVerifying(true);
    // Simulate AI verification
    setTimeout(() => {
        setIsVerifying(false);
        setIsVerified(true);
        setShowResultDialog(true);
        toast({
            title: 'Verification Successful!',
            description: 'Thank you for contributing to a greener planet.',
        });
    }, 2000);
  };

  const triggerFileUpload = () => {
      fileInputRef.current?.click();
  }

  const resetQuest = () => {
      setShowResultDialog(false);
      // In a real app, you would save completion state and prevent re-submission
      setUploadedImage(null);
      setIsVerified(false);
  }

  return (
    <>
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center p-4">
        <div className="w-full max-w-2xl">
            <Card className="shadow-lg">
            <CardHeader className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Sprout className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline text-3xl text-primary">Plant a Tree Quest</CardTitle>
                <CardDescription className="text-lg">
                    Help our planet, one tree at a time. Plant a sapling and upload a photo to earn your reward.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                    <div 
                        className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={triggerFileUpload}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept="image/*"
                        />
                        {uploadedImage ? (
                            <Image src={uploadedImage} alt="Uploaded sapling" fill className="object-contain rounded-lg p-2" />
                        ) : (
                            <div className="text-center text-muted-foreground">
                                <Upload className="h-12 w-12 mx-auto mb-2" />
                                <p className="font-semibold">Click to upload a photo</p>
                                <p className="text-sm">or drag and drop it here</p>
                            </div>
                        )}
                    </div>

                    {uploadedImage && !isVerified && (
                        <p className="text-center text-sm text-muted-foreground">Image ready for verification. Click below to submit.</p>
                    )}

                    {isVerified && (
                        <div className="flex items-center justify-center gap-2 text-green-600 font-bold text-lg">
                            <CheckCircle className="h-6 w-6"/>
                            <p>Quest Completed!</p>
                        </div>
                    )}
            </CardContent>
            <CardFooter>
                <Button onClick={handleVerify} disabled={!uploadedImage || isVerifying || isVerified} className="w-full" size="lg">
                    {isVerifying ? (
                        <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Verifying with AI...</>
                    ) : isVerified ? (
                        <><CheckCircle className="mr-2 h-5 w-5" /> Verified!</>
                    ) : (
                        <><ImageIcon className="mr-2 h-5 w-5" /> Verify & Complete Quest</>
                    )}
                </Button>
            </CardFooter>
            </Card>
            <div className="mt-4 text-center">
                <Button variant="link" asChild>
                    <Link href="/quests">Back to Quests</Link>
                </Button>
            </div>
        </div>
      </div>

        <Dialog open={showResultDialog} onOpenChange={resetQuest}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="font-headline text-2xl text-center">Quest Complete!</DialogTitle>
                </DialogHeader>
                <div className="py-4 text-center space-y-4">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto"/>
                    <DialogDescription className="text-xl font-bold text-green-600">Thank You, Eco-Warrior!</DialogDescription>
                    <p className="text-lg">Your contribution makes a real difference. You've earned a reward for your efforts.</p>
                    <div className="flex justify-center items-center gap-2">
                        <p className="text-lg font-semibold">You earned:</p>
                        <div className="flex items-center gap-2 rounded-full bg-accent/20 px-3 py-1">
                            <KisanKoinIcon className="h-6 w-6"/>
                            <span className="font-headline text-xl font-bold text-amber-600">{QUEST_REWARD}</span>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={resetQuest} className="w-full">
                        Back to Quests
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
  );
}
