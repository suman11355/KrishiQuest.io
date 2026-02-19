import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Percent, Sprout, Shirt } from 'lucide-react';
import { KisanKoinIcon } from "./icons";

const bazaarItems = [
    {
        title: "Seed Discount",
        description: "10% off on your next seed purchase.",
        cost: 500,
        icon: <Percent className="h-8 w-8 text-yellow-400"/>
    },
    {
        title: "Discount on Fertilizer",
        description: "Get 15% off on your next fertilizer purchase.",
        cost: 800,
        icon: <Sprout className="h-8 w-8 text-green-500"/>
    },
    {
        title: "Agroplay T-shirt",
        description: "Show off your farming prowess with this cool t-shirt.",
        cost: 1500,
        icon: <Shirt className="h-8 w-8 text-blue-400"/>
    }
]

export function KisanBazaar() {
  return (
    <Card className="shadow-lg h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-xl">
          <Shirt className="text-primary" />
          Kisan Bazaar
        </CardTitle>
        <CardDescription>Redeem your Kisan Koins for rewards!</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
            {bazaarItems.map(item => (
                <div key={item.title} className="flex items-center gap-4 rounded-lg border p-3 text-white" style={{ backgroundColor: '#219ebc' }}>
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-black/10">
                      {item.icon}
                    </div>
                    <div className="flex-grow">
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-white/80">{item.description}</p>
                    </div>
                    <Button variant="secondary" size="sm" className="shrink-0 text-black">
                        <div className="flex items-center gap-1.5">
                            <KisanKoinIcon className="h-4 w-4"/>
                            <span>{item.cost}</span>
                        </div>
                    </Button>
                </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
