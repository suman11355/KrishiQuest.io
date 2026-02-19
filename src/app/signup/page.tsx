
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LeafIcon } from '@/components/krishi-quest/icons';

export default function SignupPage() {
  const router = useRouter();

  const handleSignup = (event: React.FormEvent) => {
    event.preventDefault();
    // In a real app, you'd handle user registration here.
    // For now, we'll just redirect to the profile setup.
    router.push('/profile-setup');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <div className="mb-8 flex items-center gap-4 text-primary">
            <LeafIcon className="h-12 w-12" />
            <h1 className="font-headline text-5xl font-bold">KrishiQuest</h1>
        </div>
      <Card className="mx-auto max-w-lg">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSignup}>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="bg-white text-black"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required className="bg-white text-black"/>
              </div>
              <Button type="submit" className="w-full">
                Create an account
              </Button>
            </div>
          </CardContent>
        </form>
        <div className="mt-4 p-6 pt-0 text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </Card>
    </main>
  );
}
