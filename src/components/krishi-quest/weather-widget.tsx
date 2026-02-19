
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sun, Cloud, Wind, Droplets } from "lucide-react";

const weatherData = {
    temperature: "28°C",
    condition: "Partly Cloudy",
    icon: <Cloud className="h-8 w-8 text-blue-400" />,
    humidity: "62%",
    wind: "12 km/h"
};

export function WeatherWidget() {
  return (
    <Card className="shadow-lg text-white" style={{ backgroundColor: '#219ebc' }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-xl">
          Current Weather
        </CardTitle>
        <CardDescription className="text-white/80">Live conditions for your farm area.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center justify-around gap-6 text-center">
            <div className="flex items-center gap-4">
                {weatherData.icon}
                <div>
                    <p className="text-4xl font-bold">{weatherData.temperature}</p>
                    <p className="text-white/80">{weatherData.condition}</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Droplets className="h-6 w-6 text-blue-300" />
                 <div>
                    <p className="text-xl font-bold">{weatherData.humidity}</p>
                    <p className="text-sm text-white/80">Humidity</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Wind className="h-6 w-6 text-gray-300" />
                <div>
                    <p className="text-xl font-bold">{weatherData.wind}</p>
                    <p className="text-sm text-white/80">Wind</p>
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
