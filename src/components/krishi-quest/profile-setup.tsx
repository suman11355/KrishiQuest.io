
"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { UserProfile, Crop, AvatarId } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { SproutIcon } from 'lucide-react';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  location: z.string().min(3, 'Panchayat/Location is required.'),
  avatar: z.enum(['avatar1', 'avatar2', 'avatar3']),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const avatars: { id: AvatarId; src: string; alt: string; hint: string }[] = [
    { id: 'avatar1', src: 'https://picsum.photos/seed/avatar1/200', alt: 'Avatar of a smiling farmer', hint: 'smiling farmer' },
    { id: 'avatar2', src: 'https://picsum.photos/seed/avatar2/200', alt: 'Avatar of a woman in a field', hint: 'woman farmer' },
    { id: 'avatar3', src: 'https://picsum.photos/seed/avatar3/200', alt: 'Avatar of a farmer with a turban', hint: 'farmer turban' },
];

type ProfileSetupProps = {
  onProfileCreate: (profile: UserProfile) => void;
};

export function ProfileSetup({ onProfileCreate }: ProfileSetupProps) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      location: '',
      avatar: 'avatar1',
    },
  });

  function onSubmit(data: ProfileFormValues) {
    onProfileCreate({ ...data, crop: 'Wheat' });
  }

  return (
    <Card className="w-full max-w-2xl shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Create Your Farmer Profile</CardTitle>
        <CardDescription>
          Tell us a bit about yourself to start your farming journey.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., Ramesh Kumar" {...field} className="bg-white text-black"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Panchayat</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., Anandpur" {...field} className="bg-white text-black"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Choose Your Avatar</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4 pt-2"
                    >
                      {avatars.map((avatar) => (
                        <FormItem key={avatar.id}>
                          <FormControl>
                            <RadioGroupItem value={avatar.id} className="sr-only" />
                          </FormControl>
                          <FormLabel>
                            <div
                              className={cn(
                                'cursor-pointer rounded-full border-4 border-transparent transition-all hover:opacity-80',
                                field.value === avatar.id && 'border-primary'
                              )}
                            >
                              <div className="relative h-20 w-20 overflow-hidden rounded-full">
                                <Image 
                                    src={avatar.src} 
                                    alt={avatar.alt} 
                                    fill 
                                    className="object-cover" 
                                    data-ai-hint={avatar.hint}
                                />
                              </div>
                            </div>
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" size="lg" className="w-full font-bold">
              <SproutIcon className="mr-2 h-5 w-5" />
              Start My Quest!
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
