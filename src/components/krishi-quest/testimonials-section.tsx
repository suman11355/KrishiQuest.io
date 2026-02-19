
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Avatar1Icon, Avatar2Icon, Avatar3Icon } from "./icons";


const testimonials = [
  {
    name: "Ramesh K.",
    location: "Anandpur",
    avatar: <Avatar1Icon />,
    text: "KrishiQuest's crop calendar is a game-changer. My wheat yield has increased by 20% this season alone! The AI reminders are incredibly accurate.",
  },
  {
    name: "Sunita M.",
    location: "Ramgarh",
    avatar: <Avatar2Icon />,
    text: "I love the community feature. I got great advice on organic pesticides that saved my tomato crop. It feels great to be connected to other farmers.",
  },
  {
    name: "Vikram P.",
    location: "Sujangarh",
    avatar: <Avatar3Icon />,
    text: "The AgroQuiz is fun and I've learned so much. Earning Kisan Koins and climbing the leaderboard makes learning about farming exciting.",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-primary/5 py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-bold md:text-4xl">Trusted by Farmers Across the Region</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See what our users have to say about their journey with KrishiQuest.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="p-6 shadow-lg">
              <CardContent className="p-0">
                <p className="mb-6 text-foreground/80">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border-2 border-primary">
                    {testimonial.avatar}
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-headline font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location} Panchayat</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
