
'use client';
import { Flame, CheckCircle, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

const days = [
    { name: "Mon", completed: true },
    { name: "Tue", completed: true },
    { name: "Wed", completed: true },
    { name: "Thu", completed: true, isToday: true },
    { name: "Fri", completed: false },
    { name: "Sat", completed: false },
    { name: "Sun", completed: false },
];

export function DailyStreak() {
    const currentStreak = days.filter(d => d.completed).length;

    return (
        <div>
            <div className="flex items-center gap-2 font-headline text-sm font-medium mb-2">
                <Flame className="text-orange-900 h-6 w-6" />
                Daily Login Streak
            </div>
            <div className="font-headline text-2xl font-bold">
                {currentStreak}-day streak!
            </div>
            <p className="text-xs text-black/70">Log in every day to earn rewards!</p>
            
            <div className="flex justify-between items-center mt-4">
                {days.map(day => (
                    <div key={day.name} className="flex flex-col items-center gap-2">
                        <span className="text-xs font-medium text-black/70">{day.name}</span>
                        <div className={cn(
                            "w-7 h-7 rounded-full flex items-center justify-center border-2",
                            day.completed ? "bg-white/50 border-white" : "bg-black/10",
                            day.isToday && "ring-2 ring-white ring-offset-2 ring-offset-background"
                        )}>
                            {day.completed ? (
                                <CheckCircle className="w-4 h-4 text-white"/>
                            ) : (
                                <Circle className="w-4 h-4 text-black/30"/>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
