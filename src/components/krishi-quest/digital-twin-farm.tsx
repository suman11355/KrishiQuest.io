import type { Crop } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';
import { WheatIcon, CornIcon, SproutIcon } from "./icons";

type DigitalTwinFarmProps = {
  crop: Crop;
};

const cropData = {
    Wheat: {
        image: "https://picsum.photos/800/400?random=1",
        hint: "wheat field",
        icon: <WheatIcon className="h-6 w-6 text-amber-600" />
    },
    Corn: {
        image: "https://picsum.photos/800/400?random=2",
        hint: "corn field",
        icon: <CornIcon className="h-6 w-6 text-yellow-500" />
    },
    Rice: {
        image: "https://picsum.photos/800/400?random=3",
        hint: "rice paddy",
        icon: <SproutIcon className="h-6 w-6 text-green-600" />
    },
}

export function DigitalTwinFarm({ crop }: DigitalTwinFarmProps) {
  const { image, hint, icon } = cropData[crop];
  
  return (
    <Card className="overflow-hidden shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-xl">
            {icon}
            Your Digital {crop} Farm
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative aspect-video w-full">
             <Image 
                src={image}
                alt={`A digital representation of a ${crop} farm.`}
                fill
                className="object-cover"
                data-ai-hint={hint}
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
             <div className="absolute bottom-4 left-4">
                <h3 className="font-headline text-2xl font-bold text-white">Status: Thriving</h3>
                <p className="text-sm text-white/90">Next harvest in 12 days</p>
             </div>
        </div>
      </CardContent>
    </Card>
  );
}
