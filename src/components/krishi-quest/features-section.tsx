
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BrainCircuit, CalendarDays, Users, Tractor } from "lucide-react";

const features = [
    {
        icon: <CalendarDays className="h-10 w-10 text-primary" />,
        title: "AI-Powered Crop Calendar",
        description: "Get a personalized, AI-generated schedule for your crops. Know exactly when to water, fertilize, and harvest for maximum yield.",
    },
    {
        icon: <BrainCircuit className="h-10 w-10 text-primary" />,
        title: "Engaging Agro-Quests",
        description: "Test your farming knowledge with fun quizzes and make strategic decisions in our farming simulator to earn valuable 'Kisan Koins'.",
    },
    {
        icon: <Users className="h-10 w-10 text-primary" />,
        title: "Thriving Community Hub",
        description: "Connect with fellow farmers in your area. Share tips, ask questions, and climb the leaderboard to become a star in your Panchayat.",
    },
    {
        icon: <Tractor className="h-10 w-10 text-primary" />,
        title: "Digital Farm Twin",
        description: "Visualize your farm's progress with a digital twin. Watch your virtual crops grow as you follow your tasks and complete quests.",
    }
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-28">
        <div className="container mx-auto max-w-7xl px-4">
            <div className="mb-12 text-center">
                <h2 className="font-headline text-3xl font-bold md:text-4xl">Everything You Need for a Bountiful Harvest</h2>
                <p className="mt-4 text-lg text-muted-foreground">KrishiQuest combines modern technology with the wisdom of the community.</p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                {features.map(feature => (
                    <Card key={feature.title} className="flex flex-col items-center p-6 text-center shadow-lg transition-transform hover:scale-105">
                        <CardHeader className="p-0">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                {feature.icon}
                            </div>
                            <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardDescription className="mt-2 flex-grow">{feature.description}</CardDescription>
                    </Card>
                ))}
            </div>
        </div>
    </section>
  );
}
