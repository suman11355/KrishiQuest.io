
'use client';

import { useState } from 'react';
import { addDays, format, isBefore, parse } from 'date-fns';
import { Calendar as CalendarIcon, Loader2, Wand2, Check, AlertTriangle, Leaf, Wheat, Info, PlusCircle } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { cn } from '@/lib/utils';
import type { CalendarEvent } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { CornIcon, SproutIcon } from './icons';

// Pre-made crop schedules
const cropSchedules = {
    "Tomato-Pusa_Ruby": [
        { daysAfterPlanting: 10, title: "Germination", description: "Your little tomato seeds are sprouting! Keep the soil moist." },
        { daysAfterPlanting: 15, title: "First Watering", description: "Time for their first proper drink. Water at the base." },
        { daysAfterPlanting: 25, title: "Fertilizing (1st)", description: "Give your seedlings a nutrient boost to help them grow strong." },
        { daysAfterPlanting: 40, title: "Pest Check", description: "Look for common pests like aphids. Early detection is key!" },
        { daysAfterPlanting: 60, title: "Mid-growth Fertilization", description: "Another round of fertilizer to support flowering." },
        { daysAfterPlanting: 90, title: "Harvest Time", description: "Your Pusa Ruby tomatoes are ready to be picked! Well done!" },
    ],
    "Wheat-HD_2967": [
        { daysAfterPlanting: 8, title: "Sprouting", description: "The first green shoots of wheat are appearing. A great sign!" },
        { daysAfterPlanting: 21, title: "First Irrigation", description: "Crown Root Initiation stage. A critical time for watering." },
        { daysAfterPlanting: 45, title: "Tillering Stage Fertilization", description: "Apply nitrogen to encourage more tillers for a better yield." },
        { daysAfterPlanting: 65, title: "Weed Control", description: "Check for weeds that compete for nutrients. Keep your field clean." },
        { daysAfterPlanting: 85, title: "Flowering Stage Irrigation", description: "Ensure adequate moisture for healthy grain development." },
        { daysAfterPlanting: 120, title: "Harvest Time", description: "Your HD 2967 wheat is golden and ready for harvest. Congratulations!" },
    ],
    "Rice-IR_64": [
        { daysAfterPlanting: 5, title: "Germination in Nursery", description: "Seeds have sprouted. Ensure nursery bed is moist." },
        { daysAfterPlanting: 25, title: "Transplanting", description: "Transplant the seedlings from the nursery to the main field." },
        { daysAfterPlanting: 35, title: "First Top Dressing", description: "Apply first dose of Nitrogen fertilizer." },
        { daysAfterPlanting: 55, title: "Panicle Initiation", description: "Critical water stage. Ensure the field is adequately irrigated." },
        { daysAfterPlanting: 80, title: "Milking Stage", description: "Protect the crop from pests like Gundhi bug." },
        { daysAfterPlanting: 110, title: "Harvest Time", description: "Your IR 64 Rice is ready for harvest." },
    ],
    "Corn-Hybrid_900M": [
        { daysAfterPlanting: 7, title: "Emergence", description: "Corn seedlings are emerging from the soil." },
        { daysAfterPlanting: 30, title: "Knee-High Stage Fertilization", description: "Apply second dose of Nitrogen. This is a rapid growth phase." },
        { daysAfterPlanting: 55, title: "Tasseling/Silking", description: "Pollination is occurring. Avoid water stress." },
        { daysAfterPlanting: 75, title: "Blister Stage", description: "Kernels are developing. Check for corn earworms." },
        { daysAfterPlanting: 100, title: "Harvest Time", description: "Your Hybrid 900M Gold Corn is ready to be harvested." },
    ],
    "Potato-Kufri_Jyoti": [
        { daysAfterPlanting: 15, title: "Sprouting", description: "Potato sprouts are emerging." },
        { daysAfterPlanting: 30, title: "Earthing Up", description: "Hill the soil around the plants to protect developing tubers." },
        { daysAfterPlanting: 45, title: "Tuber Formation Fertilization", description: "Apply fertilizer, focus on Potassium." },
        { daysAfterPlanting: 60, title: "Late Blight Watch", description: "Monitor for signs of late blight, especially in humid weather." },
        { daysAfterPlanting: 90, title: "Haulm Cutting", description: "Cut the top foliage to help skins of tubers to harden." },
        { daysAfterPlanting: 100, title: "Harvest Time", description: "Your Kufri Jyoti potatoes are ready for digging." },
    ],
    "Sugarcane-Co_86032": [
        { daysAfterPlanting: 30, title: "Germination", description: "Sugarcane setts are germinating. Fill any gaps." },
        { daysAfterPlanting: 60, title: "Formative Stage Irrigation", description: "Frequent irrigation is required during this growth phase." },
        { daysAfterPlanting: 90, title: "First Fertilization", description: "Apply the first dose of fertilizer." },
        { daysAfterPlanting: 120, title: "Earthing Up and Tying", description: "Provide support to the cane to prevent lodging." },
        { daysAfterPlanting: 270, title: "Maturity Check", description: "Check for maturity using a hand refractometer." },
        { daysAfterPlanting: 330, title: "Harvest Time", description: "Your Co 86032 sugarcane is ready to be cut." },
    ]
};

const cropOptions = [
    { value: "Tomato-Pusa_Ruby", label: "Tomato (Pusa Ruby)", icon: <Leaf className="h-5 w-5 text-red-600"/> },
    { value: "Wheat-HD_2967", label: "Wheat (HD 2967)", icon: <Wheat className="h-5 w-5 text-amber-500"/> },
    { value: "Rice-IR_64", label: "Rice (IR 64)", icon: <SproutIcon className="h-5 w-5 text-cyan-500" /> },
    { value: "Corn-Hybrid_900M", label: "Corn (Hybrid 900M)", icon: <CornIcon className="h-5 w-5 text-yellow-500" /> },
    { value: "Potato-Kufri_Jyoti", label: "Potato (Kufri Jyoti)", icon: <SproutIcon className="h-5 w-5 text-yellow-700" /> },
    { value: "Sugarcane-Co_86032", label: "Sugarcane (Co 86032)", icon: <SproutIcon className="h-5 w-5 text-green-700" /> },
];


export function CropCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEventDetailOpen, setIsEventDetailOpen] = useState(false);
  const [eventsForSelectedDate, setEventsForSelectedDate] = useState<CalendarEvent[]>([]);
  const [selectedCrop, setSelectedCrop] = useState('');
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const { toast } = useToast();

  const dayHasEvent = (day: Date) => {
    return events.some(event => format(new Date(event.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'));
  }

  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
    const eventsOnDay = events.filter(event => format(new Date(event.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'));
    setEventsForSelectedDate(eventsOnDay);
    setIsEventDetailOpen(true);
  };

  const openAddCropForm = () => {
    setIsEventDetailOpen(false);
    setIsFormOpen(true);
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedCrop) return;

    const schedule = cropSchedules[selectedCrop as keyof typeof cropSchedules];
    if (!schedule) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "No schedule found for the selected crop.",
        });
        return;
    }

    const plantingDate = new Date(selectedDate.setHours(0, 0, 0, 0));

    const newEvents = schedule.map(event => {
      const eventDate = addDays(plantingDate, event.daysAfterPlanting);
      return {
        ...event,
        date: eventDate.toISOString(),
      };
    });

    setEvents(prevEvents => [...prevEvents, ...newEvents]);
    setSelectedCrop('');
    setIsFormOpen(false);
    toast({
        title: "Calendar Updated!",
        description: `Your schedule for ${cropOptions.find(c => c.value === selectedCrop)?.label} has been added.`,
    });
  };

  const today = new Date();
  today.setHours(0,0,0,0);

  const upcomingEvents = events
    .filter(event => !isBefore(new Date(event.date), today))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
       <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a New Crop</DialogTitle>
            <DialogDescription>
              Select a crop planted on {selectedDate ? format(selectedDate, 'PPP') : ''}. A pre-made schedule will be added.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="crop-name" className="text-right">
                  Crop
                </Label>
                <div className="col-span-3">
                    <Select onValueChange={setSelectedCrop} value={selectedCrop}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a crop and variety..." />
                        </SelectTrigger>
                        <SelectContent>
                            {cropOptions.map(option => (
                                <SelectItem key={option.value} value={option.value}>
                                    <div className="flex items-center gap-2">
                                        {option.icon}
                                        {option.label}
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={!selectedCrop}>
                <Wand2 className="mr-2 h-4 w-4" />
                Add Schedule
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isEventDetailOpen} onOpenChange={setIsEventDetailOpen}>
          <DialogContent>
            <DialogHeader>
                <DialogTitle>Tasks for {selectedDate ? format(selectedDate, 'PPP') : ''}</DialogTitle>
                <DialogDescription>Here are your scheduled tasks for this day. You can also add a new crop.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                {eventsForSelectedDate.length > 0 ? (
                    eventsForSelectedDate.map((event, index) => (
                        <div key={index} className="flex items-start gap-4 rounded-lg border p-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                <Info className="h-5 w-5 text-primary"/>
                            </div>
                            <div>
                                <p className="font-semibold">{event.title}</p>
                                <p className="text-sm text-muted-foreground">{event.description}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-muted-foreground">No tasks scheduled for this day.</p>
                )}
            </div>
            <DialogFooter className="sm:justify-between">
                <Button variant="outline" onClick={() => setIsEventDetailOpen(false)}>Close</Button>
                <Button onClick={openAddCropForm}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Crop
                </Button>
            </DialogFooter>
          </DialogContent>
      </Dialog>

      <div className="col-span-1">
        <Card className="shadow-lg w-full">
          <CardContent className="p-2 flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              onDayClick={handleDayClick}
              className="p-0"
              modifiers={{
                  hasEvent: dayHasEvent
              }}
              modifiersClassNames={{
                  hasEvent: 'bg-primary/20 rounded-full',
              }}
            />
          </CardContent>
        </Card>
      </div>
      <div className="col-span-1">
          <Card className="shadow-lg h-full">
              <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                      <CalendarIcon className="text-primary"/>
                      Upcoming Timeline
                  </CardTitle>
              </CardHeader>
              <CardContent>
                  {upcomingEvents.length === 0 && (
                      <Alert>
                          <AlertTriangle className="h-4 w-4" />
                          <AlertTitle>No Upcoming Events</AlertTitle>
                          <AlertDescription>
                          Click a date on the calendar to plant a new crop and add its schedule.
                          </AlertDescription>
                      </Alert>
                  )}
                  {upcomingEvents.length > 0 && (
                      <div className="relative pl-6">
                          <div className="absolute left-0 top-0 h-full w-0.5 bg-border -translate-x-1/2 ml-3"></div>
                          <ul className="space-y-8">
                          {upcomingEvents.map((event, index) => {
                              const eventDate = new Date(event.date);
                              const isPast = isBefore(eventDate, today);
                              return (
                                  <li key={index} className="flex items-start gap-4">
                                  <div className={cn(
                                      "flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-background",
                                      isPast ? "bg-muted-foreground" : "bg-primary"
                                  )}>
                                      <Check className="h-4 w-4 text-primary-foreground" />
                                  </div>
                                  <div className="flex-1 -mt-1.5">
                                      <p className="font-semibold">{event.title}</p>
                                      <p className="text-sm text-muted-foreground">{format(eventDate, 'PPP')}</p>
                                      <p className="text-sm mt-1">{event.description}</p>
                                  </div>
                                  </li>
                              )
                          })}
                          </ul>
                      </div>
                  )}
              </CardContent>
          </Card>
      </div>
    </div>
  );
}
