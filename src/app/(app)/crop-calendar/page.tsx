

import { CropCalendar } from '@/components/krishi-quest/crop-calendar';

export default function CropCalendarPage() {
  return (
    <div className="container mx-auto px-4">
        <div className="text-center mb-8 pt-12">
            <h1 className="font-headline text-4xl font-bold text-primary mb-2">Crop Calendar</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Plan your farming activities and get an AI-generated schedule for your crops.</p>
        </div>
        <CropCalendar />
    </div>
  );
}
