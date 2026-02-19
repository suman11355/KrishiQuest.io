
'use client';

import { useState, useReducer, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Leaf, Droplets, Banknote, Sun, CloudRain, Bug, Award, Sparkles, Wand2, Loader2, BarChart, Wind, Thermometer, ChevronLeft, History, ShoppingCart, Globe, FlaskConical, Recycle, ArrowRight } from 'lucide-react';
import { WheatIcon, SproutIcon, CornIcon } from '@/components/krishi-quest/icons';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { KisanKoinIcon } from '@/components/krishi-quest/icons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { getAgroPlayRecommendation, AgroPlayRecommendationInput, AgroPlayRecommendationOutput } from '@/ai/flows/agro-play-recommendation-flow';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';


type CropType = 'wheat' | 'rice' | 'tomato' | 'potato' | 'corn' | 'sugarcane' | 'maize';
type FertilizerId = 'urea' | 'dap' | 'mop' | 'ssp' | 'npk_10_26_26' | 'npk_12_32_16' | 'fym' | 'compost' | 'vermicompost' | 'neem_cake' | 'green_manure';
type SoilType = 'Alluvial' | 'Black' | 'Red' | 'Laterite' | 'Loamy' | 'Clayey';
type WeatherType = 'Favorable' | 'Average' | 'Drought-Prone' | 'Excess-Rainfall' | 'Sunny' | 'Cloudy' | 'Rainy';
type MarketDemand = 'High' | 'Normal' | 'Low';

type SeasonResult = {
    season: number;
    crop: CropType;
    fertilizers: FertilizerId[];
    netProfit: number;
    soilHealthChange: number;
}


const cropData: Record<CropType, { name: string; icon: React.ReactNode; baseCost: number; baseRevenue: number; waterNeed: number; soilImpact: number; nUptake: number; pUptake: number; kUptake: number; }> = {
    wheat: { name: "Wheat", icon: <WheatIcon className="h-10 w-10 text-amber-500" />, baseCost: 800, baseRevenue: 1600, waterNeed: 0.6, soilImpact: -5, nUptake: 12, pUptake: 5, kUptake: 10 },
    rice: { name: "Rice", icon: <SproutIcon className="h-10 w-10 text-cyan-500" />, baseCost: 1200, baseRevenue: 2200, waterNeed: 1.0, soilImpact: -10, nUptake: 15, pUptake: 7, kUptake: 18 },
    tomato: { name: "Tomato", icon: <SproutIcon className="h-10 w-10 text-red-500" />, baseCost: 600, baseRevenue: 2000, waterNeed: 0.8, soilImpact: -8, nUptake: 10, pUptake: 4, kUptake: 15 },
    potato: { name: "Potato", icon: <SproutIcon className="h-10 w-10 text-yellow-600" />, baseCost: 1000, baseRevenue: 2100, waterNeed: 0.7, soilImpact: -12, nUptake: 18, pUptake: 8, kUptake: 20 },
    corn: { name: "Corn", icon: <CornIcon className="h-10 w-10 text-yellow-500" />, baseCost: 900, baseRevenue: 1800, waterNeed: 0.7, soilImpact: -7, nUptake: 14, pUptake: 6, kUptake: 12 },
    sugarcane: { name: "Sugarcane", icon: <SproutIcon className="h-10 w-10 text-green-500" />, baseCost: 1500, baseRevenue: 3000, waterNeed: 1.2, soilImpact: -15, nUptake: 20, pUptake: 9, kUptake: 25 },
    maize: { name: "Maize", icon: <CornIcon className="h-10 w-10 text-yellow-500" />, baseCost: 850, baseRevenue: 1700, waterNeed: 0.65, soilImpact: -6, nUptake: 13, pUptake: 5, kUptake: 11 },
}

const fertilizerData: Record<FertilizerId, { name: string; type: 'chemical' | 'organic'; cost: number; yieldMultiplier: number; soilImpact: number; n: number; p: number; k: number; phImpact: number; description: string; }> = {
    // Organic
    fym: { name: "Farmyard Manure", type: 'organic', cost: 500, yieldMultiplier: 1.05, soilImpact: 15, n: 5, p: 2, k: 5, phImpact: 0.1, description: "Improves soil structure." },
    compost: { name: "Compost", type: 'organic', cost: 600, yieldMultiplier: 1.08, soilImpact: 20, n: 10, p: 5, k: 10, phImpact: 0.2, description: "Rich in organic matter." },
    vermicompost: { name: "Vermicompost", type: 'organic', cost: 800, yieldMultiplier: 1.12, soilImpact: 25, n: 15, p: 10, k: 12, phImpact: 0.3, description: "Nutrient-dense worm castings." },
    neem_cake: { name: "Neem Cake", type: 'organic', cost: 700, yieldMultiplier: 1.06, soilImpact: 10, n: 20, p: 5, k: 5, phImpact: 0.05, description: "Also acts as a natural pesticide." },
    green_manure: { name: "Green Manure", type: 'organic', cost: 300, yieldMultiplier: 1.03, soilImpact: 18, n: 12, p: 2, k: 8, phImpact: 0.15, description: "Crops grown to be tilled in." },
    // Chemical
    urea: { name: "Urea", type: 'chemical', cost: 400, yieldMultiplier: 1.25, soilImpact: -10, n: 46, p: 0, k: 0, phImpact: -0.2, description: "High nitrogen content (46% N)." },
    dap: { name: "DAP", type: 'chemical', cost: 600, yieldMultiplier: 1.3, soilImpact: -15, n: 18, p: 46, k: 0, phImpact: -0.3, description: "For Nitrogen & Phosphorus needs." },
    mop: { name: "Muriate of Potash (MOP)", type: 'chemical', cost: 500, yieldMultiplier: 1.1, soilImpact: -5, n: 0, p: 0, k: 60, phImpact: -0.1, description: "Main source of Potassium." },
    ssp: { name: "Single Super Phosphate", type: 'chemical', cost: 450, yieldMultiplier: 1.15, soilImpact: -8, n: 0, p: 16, k: 0, phImpact: -0.25, description: "Source of Phosphorus and Sulphur." },
    npk_10_26_26: { name: "NPK Complex (10:26:26)", type: 'chemical', cost: 900, yieldMultiplier: 1.4, soilImpact: -20, n: 10, p: 26, k: 26, phImpact: -0.4, description: "Balanced N, P, and K." },
    npk_12_32_16: { name: "NPK Complex (12:32:16)", type: 'chemical', cost: 950, yieldMultiplier: 1.45, soilImpact: -22, n: 12, p: 32, k: 16, phImpact: -0.45, description: "High P, balanced N & K." },
};


type GameState = {
  stage: 'world_creation' | 'setup' | 'decision' | 'simulation' | 'report';
  worldName: string;
  season: number;
  capital: number;
  soilFertility: number; // This can now be a calculated value
  unlockedCrops: CropType[];
  unlockedFertilizers: FertilizerId[];
  history: SeasonResult[];
  
  // New detailed scenario inputs
  temperature: [number, number];
  humidity: [number, number];
  moisture: [number, number];
  nitrogen: number;
  potassium: number;
  phosphorus: number;
  soilPh: number;
  soilType: SoilType;
  weather: WeatherType;
  marketDemand: MarketDemand;

  isRecommending: boolean;
  recommendation: AgroPlayRecommendationOutput | null;

  cropChoice: CropType | null;
  fertilizerChoices: FertilizerId[];
  results: {
    grossRevenue: number;
    totalCost: number;
    netProfit: number;
    soilHealthChange: number;
    soil: {
        before: { n: number, p: number, k: number, ph: number };
        after: { n: number, p: number, k: number, ph: number };
    }
  } | null;
};

type GameAction =
  | { type: 'SET_WORLD_NAME'; payload: string }
  | { type: 'START_SETUP' }
  | { type: 'SET_FARM_PARAMETER'; payload: { key: keyof GameState; value: any } }
  | { type: 'START_DECISION' }
  | { type: 'GET_RECOMMENDATION' }
  | { type: 'SET_RECOMMENDATION'; payload: AgroPlayRecommendationOutput | null }
  | { type: 'CHOOSE_CROP'; payload: CropType }
  | { type: 'TOGGLE_FERTILIZER'; payload: FertilizerId }
  | { type: 'RUN_SIMULATION' }
  | { type: 'START_NEW_SEASON' }
  | { type: 'BUY_CROP'; payload: CropType }
  | { type: 'BUY_FERTILIZER'; payload: FertilizerId };

const INITIAL_STATE: GameState = {
  stage: 'world_creation',
  worldName: '',
  season: 1,
  capital: 10000,
  unlockedCrops: ['wheat', 'rice', 'tomato', 'potato'],
  unlockedFertilizers: ['fym', 'compost', 'urea', 'dap', 'mop', 'ssp', 'green_manure'],
  history: [],
  
  // New initial states
  temperature: [26, 28],
  humidity: [56, 60],
  moisture: [35, 40],
  nitrogen: 15,
  potassium: 3,
  phosphorus: 20,
  soilPh: 6.8,
  soilType: 'Loamy',
  weather: 'Average',
  marketDemand: 'Normal',

  soilFertility: 70, // Will be calculated based on inputs
  isRecommending: false,
  recommendation: null,
  cropChoice: null,
  fertilizerChoices: [],
  results: null,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_WORLD_NAME':
        return { ...state, worldName: action.payload };
    case 'START_SETUP':
        return { ...state, stage: 'setup' };
    case 'SET_FARM_PARAMETER':
        return { ...state, [action.payload.key]: action.payload.value };
    case 'START_DECISION':
        const {nitrogen, potassium, phosphorus} = state;
        // Simple fertility calculation for now. Can be expanded.
        const calculatedFertility = Math.min(100, (nitrogen*2 + potassium*1.5 + phosphorus*1.5));
        
        return { ...state, stage: 'decision', soilFertility: calculatedFertility, recommendation: null, cropChoice: null, fertilizerChoices: [], results: null };
    case 'GET_RECOMMENDATION':
        return { ...state, isRecommending: true };
    case 'SET_RECOMMENDATION':
        return { ...state, isRecommending: false, recommendation: action.payload };
    case 'CHOOSE_CROP':
      return { ...state, cropChoice: action.payload };
    case 'TOGGLE_FERTILIZER': {
        const newChoices = state.fertilizerChoices.includes(action.payload)
            ? state.fertilizerChoices.filter(f => f !== action.payload)
            : [...state.fertilizerChoices, action.payload];
        return { ...state, fertilizerChoices: newChoices };
    }
    case 'BUY_CROP':
        const crop = cropData[action.payload];
        if (state.capital >= crop.baseCost * 2 && !state.unlockedCrops.includes(action.payload)) {
            return {
                ...state,
                capital: state.capital - crop.baseCost * 2,
                unlockedCrops: [...state.unlockedCrops, action.payload]
            }
        }
        return state;
    case 'BUY_FERTILIZER':
        const fertilizer = fertilizerData[action.payload];
        const cost = fertilizer.cost * 1.5; // Unlock cost
        if (state.capital >= cost && !state.unlockedFertilizers.includes(action.payload)) {
            return {
                ...state,
                capital: state.capital - cost,
                unlockedFertilizers: [...state.unlockedFertilizers, action.payload]
            }
        }
        return state;
    case 'RUN_SIMULATION': {
        if (!state.cropChoice || state.fertilizerChoices.length === 0) return state;

        const selectedCrop = cropData[state.cropChoice];
        
        // --- 1. Store "Before" state ---
        const soilBefore = {
            n: state.nitrogen,
            p: state.phosphorus,
            k: state.potassium,
            ph: state.soilPh
        };

        // --- 2. Calculate fertilizer effects ---
        const totalFertilizerCost = state.fertilizerChoices.reduce((acc, id) => acc + fertilizerData[id].cost, 0);
        let totalYieldMultiplier = 1;
        let totalSoilImpact = 0;
        let totalPhImpact = 0;
        const nutrientsAdded = { n: 0, p: 0, k: 0 };
        
        state.fertilizerChoices.forEach(id => {
            const fert = fertilizerData[id];
            totalYieldMultiplier *= fert.yieldMultiplier;
            totalSoilImpact += fert.soilImpact;
            totalPhImpact += fert.phImpact;
            nutrientsAdded.n += fert.n;
            nutrientsAdded.p += fert.p;
            nutrientsAdded.k += fert.k;
        });
        
        // --- 3. Calculate financial outcomes ---
        let revenueMultiplier = 1.0;
        if (state.marketDemand === 'High') revenueMultiplier *= 1.2;
        if (state.marketDemand === 'Low') revenueMultiplier *= 0.8;
       
        let yieldMultiplier = totalYieldMultiplier;
        if (state.weather === 'Favorable' || state.weather === 'Sunny') yieldMultiplier *= 1.2;
        if (state.weather === 'Drought-Prone') yieldMultiplier *= (1 - (selectedCrop.waterNeed * 0.4));
        if (state.weather === 'Excess-Rainfall' || state.weather === 'Rainy') yieldMultiplier *= (1 - ((1 - selectedCrop.waterNeed) * 0.3));

        const soilHealthFactor = state.soilFertility / 100;
        yieldMultiplier *= (0.5 + (soilHealthFactor * 0.5));

        const grossRevenue = Math.round(selectedCrop.baseRevenue * yieldMultiplier * revenueMultiplier);
        const totalCost = selectedCrop.baseCost + totalFertilizerCost;
        const netProfit = grossRevenue - totalCost;
        
        // --- 4. Calculate "After" soil state ---
        const soilHealthChange = selectedCrop.soilImpact + totalSoilImpact;
        const newSoilFertility = Math.max(0, Math.min(100, state.soilFertility + soilHealthChange));
        
        // Nutrients: (Start + Added) - (Crop Uptake * Yield Multiplier)
        // Yield multiplier affects how much nutrient is taken up
        const finalYieldFactor = yieldMultiplier * revenueMultiplier;
        const newNitrogen = Math.max(0, soilBefore.n + (nutrientsAdded.n / 10) - (selectedCrop.nUptake * finalYieldFactor / 20));
        const newPhosphorus = Math.max(0, soilBefore.p + (nutrientsAdded.p / 10) - (selectedCrop.pUptake * finalYieldFactor / 20));
        const newPotassium = Math.max(0, soilBefore.k + (nutrientsAdded.k / 10) - (selectedCrop.kUptake * finalYieldFactor / 20));
        const newSoilPh = Math.max(1, Math.min(14, soilBefore.ph + totalPhImpact));
        
        const soilAfter = {
            n: newNitrogen,
            p: newPhosphorus,
            k: newPotassium,
            ph: newSoilPh
        };

        return {
            ...state,
            stage: 'report',
            capital: state.capital + netProfit,
            soilFertility: newSoilFertility,
            nitrogen: newNitrogen,
            phosphorus: newPhosphorus,
            potassium: newPotassium,
            soilPh: newSoilPh,
            results: { 
                grossRevenue, 
                totalCost, 
                netProfit, 
                soilHealthChange,
                soil: { before: soilBefore, after: soilAfter }
            }
        };
    }
    case 'START_NEW_SEASON': {
        if (!state.results || !state.cropChoice || !state.fertilizerChoices) return state;

        const newHistoryEntry: SeasonResult = {
            season: state.season,
            crop: state.cropChoice,
            fertilizers: state.fertilizerChoices,
            netProfit: state.results.netProfit,
            soilHealthChange: state.results.soilHealthChange,
        }

        return { 
            ...state,
            stage: 'setup',
            season: state.season + 1,
            history: [...state.history, newHistoryEntry],
            // Reset seasonal choices
            recommendation: null,
            cropChoice: null,
            fertilizerChoices: [],
            results: null,
        };
    }
    default:
      return state;
  }
}

const DecisionCard = ({ title, icon, description, cost, onClick, disabled, isRecommended, children }: { title: string, icon: React.ReactNode, description: string, cost: number, onClick: () => void, disabled?: boolean, isRecommended?: boolean, children: React.ReactNode }) => (
    <Card className={cn(
        "flex flex-col bg-white/80 p-4 text-black transition-all border-2 border-transparent relative overflow-hidden",
        disabled && "opacity-50 cursor-not-allowed",
        isRecommended && "border-blue-600"
    )}>
         {isRecommended && <div className="absolute top-0 right-0 bg-blue-600 text-white px-2 py-0.5 text-xs font-bold">Recommended</div>}
        <div className="flex justify-center mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-center mb-2">{title}</h3>
        <p className="text-sm text-center text-black/70 mb-4">{description}</p>
        <div className="mb-4 space-y-2 text-sm text-black/80 flex-grow bg-black/5 p-3 rounded-md">
            {children}
        </div>
         <Button onClick={disabled ? undefined : onClick} disabled={disabled} variant="secondary" className="w-full mt-auto bg-blue-500 hover:bg-blue-600 text-white font-bold">
            Select (Cost: ₹{cost})
        </Button>
    </Card>
);

const RangeSlider = ({ label, description, value, onValueChange, min, max, step }: { label: string, description: string, value: number, onValueChange: (value: number[]) => void, min: number, max: number, step: number }) => (
    <div className="space-y-3 p-4 bg-black/5 rounded-lg">
        <div>
            <Label className="font-bold">{label}: <span className="font-normal text-blue-600">{value.toFixed(2)}</span></Label>
            <p className="text-xs text-black/60">{description}</p>
        </div>
        <Slider
            value={[value]}
            onValueChange={onValueChange}
            min={min}
            max={max}
            step={step}
            className="[&>span]:bg-blue-500 [&>div>span]:bg-blue-500"
        />
    </div>
);


export default function AgroPlayPage() {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { toast } = useToast();

  const handleGetRecommendation = async () => {
    dispatch({ type: 'GET_RECOMMENDATION' });
    try {
        const payload: AgroPlayRecommendationInput = {
            soil: {
                type: state.soilType,
                fertility: state.soilFertility / 100,
            },
            weather: {
                forecast: state.weather
            },
            market: {
                demand: state.marketDemand
            }
        };
        const recommendation = await getAgroPlayRecommendation(payload);
        dispatch({ type: 'SET_RECOMMENDATION', payload: recommendation });
        toast({
            title: "AI Recommendation Ready!",
            description: "Your personalized crop and fertilizer advice has been generated."
        })
    } catch(error) {
        console.error(error);
        toast({ variant: 'destructive', title: 'Error', description: 'Could not generate a recommendation. Please try again.' });
        dispatch({ type: 'SET_RECOMMENDATION', payload: null }); // Reset state
    }
  };

  const handleBuyItem = (type: 'crop' | 'fertilizer', id: CropType | FertilizerId) => {
    const item = type === 'crop' ? cropData[id as CropType] : fertilizerData[id as FertilizerId];
    const cost = type === 'crop' ? item.baseCost * 2 : item.cost * 1.5;

    dispatch(type === 'crop' ? { type: 'BUY_CROP', payload: id as CropType } : { type: 'BUY_FERTILIZER', payload: id as FertilizerId });
    toast({
        title: `${type === 'crop' ? 'Crop' : 'Fertilizer'} Unlocked!`,
        description: `You can now use ${item.name} in your simulations.`,
    })
  }

  const renderContent = () => {
    switch(state.stage) {
        case 'world_creation':
            return (
                 <Card className="w-full max-w-lg bg-white/80 border-blue-200 text-black">
                    <CardHeader className="text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mb-4">
                            <Globe className="h-8 w-8 text-blue-600"/>
                        </div>
                        <CardTitle className="font-headline text-3xl">Create Your Farm World</CardTitle>
                        <CardDescription className="text-black/80">Give your persistent farm simulation a name to begin your legacy.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="space-y-2">
                            <Label htmlFor="worldName">Farm World Name</Label>
                            <Input 
                                id="worldName"
                                placeholder="E.g., Ramesh's Greenfield"
                                value={state.worldName}
                                onChange={(e) => dispatch({type: 'SET_WORLD_NAME', payload: e.target.value})}
                                className="bg-white border-blue-300"
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button size="lg" className="w-full" disabled={state.worldName.length < 3} onClick={() => dispatch({type: 'START_SETUP'})}>
                            Create World & Begin
                        </Button>
                    </CardFooter>
                </Card>
            )
        case 'setup':
            const isFirstSeason = state.season === 1;
            return (
                <Card className="w-full max-w-4xl bg-white/80 border-blue-200 text-black">
                    <CardHeader className="text-center">
                        <CardTitle className="font-headline text-3xl">Season {state.season}: {isFirstSeason ? "Initial Farm Setup" : "Seasonal Planning"}</CardTitle>
                        <CardDescription className="text-black/80">
                            {isFirstSeason ? "Set the starting conditions for your farm. These values will persist and change over time." : "Set the conditions for the upcoming season."}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Column 1: Sliders */}
                            <div className="space-y-4">
                                <RangeSlider 
                                    label="Temperature (°C)"
                                    description="Suitable temperature range for crop growth."
                                    value={state.temperature[0]}
                                    onValueChange={(v) => dispatch({type: 'SET_FARM_PARAMETER', payload: {key: 'temperature', value: [v[0], v[0]+2]}})}
                                    min={0} max={50} step={1}
                                />
                                <RangeSlider 
                                    label="Humidity (%)"
                                    description="Atmospheric moisture, influencing plant water needs."
                                    value={state.humidity[0]}
                                    onValueChange={(v) => dispatch({type: 'SET_FARM_PARAMETER', payload: {key: 'humidity', value: [v[0], v[0]+4]}})}
                                    min={0} max={100} step={1}
                                />
                                <RangeSlider 
                                    label="Moisture (%)"
                                    description="Water content in the soil."
                                    value={state.moisture[0]}
                                    onValueChange={(v) => dispatch({type: 'SET_FARM_PARAMETER', payload: {key: 'moisture', value: [v[0], v[0]+5]}})}
                                    min={0} max={100} step={1}
                                />
                                {isFirstSeason && (
                                    <>
                                        <RangeSlider 
                                            label="Nitrogen (mg/kg)"
                                            description="Nitrogen content in the soil."
                                            value={state.nitrogen}
                                            onValueChange={(v) => dispatch({type: 'SET_FARM_PARAMETER', payload: {key: 'nitrogen', value: v[0]}})}
                                            min={0} max={50} step={0.5}
                                        />
                                        <RangeSlider 
                                            label="Phosphorus (mg/kg)"
                                            description="Phosphorus content in the soil."
                                            value={state.phosphorus}
                                            onValueChange={(v) => dispatch({type: 'SET_FARM_PARAMETER', payload: {key: 'phosphorus', value: v[0]}})}
                                            min={0} max={50} step={0.5}
                                        />
                                        <RangeSlider 
                                            label="Potassium (mg/kg)"
                                            description="Potassium content in the soil."
                                            value={state.potassium}
                                            onValueChange={(v) => dispatch({type: 'SET_FARM_PARAMETER', payload: {key: 'potassium', value: v[0]}})}
                                            min={0} max={10} step={0.1}
                                        />
                                        <RangeSlider 
                                            label="Soil pH"
                                            description="Acidity or alkalinity of the soil."
                                            value={state.soilPh}
                                            onValueChange={(v) => dispatch({type: 'SET_FARM_PARAMETER', payload: {key: 'soilPh', value: v[0]}})}
                                            min={1} max={14} step={0.1}
                                        />
                                    </>
                                )}
                            </div>
                            {/* Column 2: Selections & Persisting info */}
                            <div className="flex flex-col space-y-4">
                               <div className="p-4 bg-black/5 rounded-lg space-y-2">
                                    <Label>Current Weather</Label>
                                    <Select value={state.weather} onValueChange={(v) => dispatch({type: 'SET_FARM_PARAMETER', payload: {key: 'weather', value: v}})}>
                                        <SelectTrigger className="bg-white border-blue-300"><SelectValue/></SelectTrigger>
                                        <SelectContent>
                                            {(['Sunny', 'Cloudy', 'Rainy', 'Drought-Prone', 'Favorable'] as WeatherType[]).map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="p-4 bg-black/5 rounded-lg space-y-2">
                                    <Label>Market Demand</Label>
                                    <Select value={state.marketDemand} onValueChange={(v) => dispatch({type: 'SET_FARM_PARAMETER', payload: {key: 'marketDemand', value: v}})}>
                                        <SelectTrigger className="bg-white border-blue-300"><SelectValue/></SelectTrigger>
                                        <SelectContent>
                                            {(['High', 'Normal', 'Low'] as MarketDemand[]).map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                               
                               {isFirstSeason ? (
                                    <div className="p-4 bg-black/5 rounded-lg space-y-2">
                                        <Label>Soil Type</Label>
                                        <Select value={state.soilType} onValueChange={(v) => dispatch({type: 'SET_FARM_PARAMETER', payload: {key: 'soilType', value: v}})}>
                                            <SelectTrigger className="bg-white border-blue-300"><SelectValue/></SelectTrigger>
                                            <SelectContent>
                                                {(['Alluvial', 'Black', 'Red', 'Laterite', 'Loamy', 'Clayey'] as SoilType[]).map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </div>
                               ) : (
                                <Card className="p-4 bg-black/5 flex-grow flex flex-col justify-center">
                                    <CardTitle className="text-lg">Persisting Soil Conditions</CardTitle>
                                    <CardDescription>Your soil's health and nutrient levels from last season have carried over. Make your decisions based on the current state of your farm.</CardDescription>
                                    <div className="text-sm space-y-1 text-black/80 mt-4">
                                        <p><strong>Soil Type:</strong> {state.soilType}</p>
                                        <p><strong>Nitrogen:</strong> {state.nitrogen.toFixed(2)} mg/kg</p>
                                        <p><strong>Phosphorus:</strong> {state.phosphorus.toFixed(2)} mg/kg</p>
                                        <p><strong>Potassium:</strong> {state.potassium.toFixed(2)} mg/kg</p>
                                        <p><strong>Soil pH:</strong> {state.soilPh.toFixed(2)}</p>
                                    </div>
                                </Card>
                               )}
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button size="lg" className="w-full" onClick={() => dispatch({type: 'START_DECISION'})}>
                            Continue to Decisions
                        </Button>
                    </CardFooter>
                </Card>
            );

        case 'decision':
            const cropSelected = !!state.cropChoice;
            const fertilizerSelected = state.fertilizerChoices.length > 0;

            const organicFertilizers = Object.entries(fertilizerData).filter(([_, f]) => f.type === 'organic');
            const chemicalFertilizers = Object.entries(fertilizerData).filter(([_, f]) => f.type === 'chemical');
            
            return (
                <div className="w-full max-w-6xl space-y-8">
                    <div>
                        <h3 className="text-2xl font-headline text-center mb-2 text-black">Season {state.season}: Decisions</h3>
                        <p className="text-center text-black/70">Choose a crop and fertilizers for this season.</p>
                    </div>

                    <Card className="bg-white/50 border-blue-200 text-black p-4">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex-1">
                                <CardTitle className="text-blue-600 flex items-center gap-2"><Wand2 /> AI Advisor</CardTitle>
                                <CardDescription className="text-black/80">Get a personalized recommendation based on the farm conditions you provided.</CardDescription>
                            </div>
                            <Button onClick={handleGetRecommendation} disabled={state.isRecommending}>
                                {state.isRecommending ? <Loader2 className="animate-spin mr-2"/> : <Sparkles className="mr-2"/>}
                                {state.isRecommending ? 'Analyzing...' : 'Get Recommendation'}
                            </Button>
                        </div>
                        {state.recommendation && (
                             <Alert className="mt-4 bg-blue-50 border-blue-200 text-black">
                                <Wand2 className="h-4 w-4 text-blue-600" />
                                <AlertTitle className="text-blue-700">AI Recommendation</AlertTitle>
                                <AlertDescription>
                                   Based on your conditions, planting <strong>{cropData[state.recommendation.crop as CropType].name}</strong> with <strong>{state.recommendation.fertilizer} fertilizer</strong> is recommended. {state.recommendation.reason}
                                </AlertDescription>
                            </Alert>
                        )}
                    </Card>


                    {!cropSelected && (
                        <div>
                             <h4 className="text-xl font-bold text-center mb-4 text-black/90">Step 1: Choose Your Crop</h4>
                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {state.unlockedCrops.map(cropKey => {
                                   const crop = cropData[cropKey];
                                   return (
                                     <DecisionCard
                                        key={crop.name}
                                        title={crop.name}
                                        icon={crop.icon}
                                        description={`Est. Revenue: ₹${crop.baseRevenue}`}
                                        cost={crop.baseCost}
                                        isRecommended={state.recommendation?.crop === cropKey}
                                        onClick={() => dispatch({type: 'CHOOSE_CROP', payload: cropKey})}
                                    >
                                        <p>Soil Impact: {crop.soilImpact > 0 ? '+' : ''}{crop.soilImpact}</p>
                                        <p>Water Need: {crop.waterNeed * 100}%</p>
                                    </DecisionCard>
                                   )
                               })}
                            </div>
                        </div>
                    )}

                    {cropSelected && (
                         <div>
                            <h4 className="text-xl font-bold text-center mb-4 text-black/90">Step 2: Choose Your Fertilizers</h4>
                             <p className="text-center text-black/70 mb-6">Select one or more fertilizers. Your total cost will be calculated.</p>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                               <Card className="bg-white/80 border-blue-200 text-black">
                                   <CardHeader>
                                       <CardTitle className="flex items-center gap-2"><Recycle className="text-green-600"/> Organic Fertilizers</CardTitle>
                                   </CardHeader>
                                   <CardContent className="space-y-3">
                                       {organicFertilizers.map(([id, fert]) => (
                                           <div key={id} className={cn("flex items-center space-x-3 p-3 rounded-md bg-black/5", !state.unlockedFertilizers.includes(id as FertilizerId) && 'opacity-50')}>
                                               <Checkbox id={id}
                                                   checked={state.fertilizerChoices.includes(id as FertilizerId)}
                                                   onCheckedChange={() => dispatch({type: 'TOGGLE_FERTILIZER', payload: id as FertilizerId})}
                                                   disabled={!state.unlockedFertilizers.includes(id as FertilizerId)}
                                                />
                                               <Label htmlFor={id} className="w-full grid grid-cols-3 items-center gap-2 cursor-pointer">
                                                    <span className="col-span-2">{fert.name}</span>
                                                    <span className="text-right text-blue-600">₹{fert.cost}</span>
                                                    <span className="col-span-3 text-xs text-black/60 -mt-1">{fert.description}</span>
                                               </Label>
                                           </div>
                                       ))}
                                   </CardContent>
                               </Card>
                               <Card className="bg-white/80 border-blue-200 text-black">
                                   <CardHeader>
                                       <CardTitle className="flex items-center gap-2"><FlaskConical className="text-purple-600"/> Chemical Fertilizers</CardTitle>
                                   </CardHeader>
                                   <CardContent className="space-y-3">
                                       {chemicalFertilizers.map(([id, fert]) => (
                                           <div key={id} className={cn("flex items-center space-x-3 p-3 rounded-md bg-black/5", !state.unlockedFertilizers.includes(id as FertilizerId) && 'opacity-50')}>
                                               <Checkbox id={id}
                                                   checked={state.fertilizerChoices.includes(id as FertilizerId)}
                                                   onCheckedChange={() => dispatch({type: 'TOGGLE_FERTILIZER', payload: id as FertilizerId})}
                                                   disabled={!state.unlockedFertilizers.includes(id as FertilizerId)}
                                                />
                                               <Label htmlFor={id} className="w-full grid grid-cols-3 items-center gap-2 cursor-pointer">
                                                    <span className="col-span-2">{fert.name}</span>
                                                    <span className="text-right text-blue-600">₹{fert.cost}</span>
                                                    <span className="col-span-3 text-xs text-black/60 -mt-1">{fert.description}</span>
                                               </Label>
                                           </div>
                                       ))}
                                   </CardContent>
                               </Card>
                            </div>
                        </div>
                    )}
                    
                    {cropSelected && fertilizerSelected && (
                        <div className="text-center space-y-4 pt-8">
                             <h3 className="text-xl font-bold text-black">Ready to Simulate?</h3>
                             <p className="text-black/80">You've chosen to plant <strong>{cropData[state.cropChoice!].name}</strong> with {state.fertilizerChoices.length} fertilizer(s).</p>
                            <Button size="lg" onClick={() => dispatch({ type: 'RUN_SIMULATION' })}>Run Simulation</Button>
                        </div>
                    )}
                </div>
            );
        
        case 'report':
            if (!state.results || !state.cropChoice || !state.fertilizerChoices) return null;
            const { results } = state;
            const netColor = results.netProfit > 0 ? 'text-green-600' : 'text-red-600';
            
            const NutrientChangeRow = ({ label, before, after }: { label: string, before: number, after: number}) => {
                const change = after - before;
                const changeColor = change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-black/70';
                return (
                    <div className="flex justify-between items-center text-sm p-2 bg-black/5 rounded-md">
                        <span className="font-bold">{label}</span>
                        <div className="flex items-center gap-2">
                           <span className="text-black/70">{before.toFixed(2)}</span>
                           <ArrowRight className="h-4 w-4"/>
                           <span className="font-bold">{after.toFixed(2)}</span>
                           <span className={cn("font-bold text-xs", changeColor)}>({change >= 0 ? '+' : ''}{change.toFixed(2)})</span>
                        </div>
                    </div>
                )
            };

            return (
                <div className="w-full max-w-2xl space-y-6">
                    <h2 className="font-headline text-4xl font-bold text-center text-black">Season {state.season} Report</h2>
                    <Card className="bg-white/80 backdrop-blur-sm border-blue-200 text-black">
                        <CardHeader>
                            <CardTitle>Financial Summary</CardTitle>
                            <CardDescription className="text-black/70">
                                Based on planting {cropData[state.cropChoice].name} with {state.fertilizerChoices.map(id => fertilizerData[id].name).join(', ')}.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="grid grid-cols-2 gap-4 text-center">
                                <div>
                                    <p className="text-sm text-black/70">Gross Revenue</p>
                                    <p className="text-2xl font-bold text-green-600">₹{results.grossRevenue.toLocaleString('en-IN')}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-black/70">Total Costs</p>
                                    <p className="text-2xl font-bold text-red-600">₹{results.totalCost.toLocaleString('en-IN')}</p>
                                </div>
                             </div>
                             <div className="text-center border-t border-blue-200/50 pt-4">
                                <p className="text-lg text-black/70">Net Profit / Loss</p>
                                <p className={cn("text-5xl font-bold", netColor)}>₹{results.netProfit.toLocaleString('en-IN')}</p>
                             </div>
                        </CardContent>
                    </Card>
                     <Card className="bg-white/80 backdrop-blur-sm border-blue-200 text-black">
                        <CardHeader>
                            <CardTitle>Farm Health & Soil Report</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-center mb-4">
                                <div>
                                    <p className="text-sm text-black/70">Soil Health Change</p>
                                    <p className={cn("text-3xl font-bold", results.soilHealthChange >= 0 ? 'text-green-600' : 'text-red-600')}>
                                        {results.soilHealthChange >= 0 ? '+' : ''}{results.soilHealthChange.toFixed(1)}
                                    </p>
                                </div>
                                 <div>
                                    <p className="text-sm text-black/70">New Soil Fertility</p>
                                    <p className={cn("text-3xl font-bold")}>
                                        {Math.round(state.soilFertility)}%
                                    </p>
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <h4 className="font-bold text-center text-black/80">Soil Nutrient Changes (mg/kg)</h4>
                               <NutrientChangeRow label="Nitrogen (N)" before={results.soil.before.n} after={results.soil.after.n} />
                               <NutrientChangeRow label="Phosphorus (P)" before={results.soil.before.p} after={results.soil.after.p} />
                               <NutrientChangeRow label="Potassium (K)" before={results.soil.before.k} after={results.soil.after.k} />
                               <NutrientChangeRow label="Soil pH" before={results.soil.before.ph} after={results.soil.after.ph} />
                            </div>
                            <p className="text-xs text-black/60 mt-2 text-center">Your new soil conditions will carry over to the next season.</p>
                        </CardContent>
                    </Card>

                    <div className="text-center">
                        <Button size="lg" variant="secondary" onClick={() => dispatch({type: 'START_NEW_SEASON'})}>
                            Begin Season {state.season + 1}
                        </Button>
                    </div>
                </div>
            );

        default:
            return null;
    }
  };

  const storeItems: {type: 'crop' | 'fertilizer', id: CropType | FertilizerId}[] = [
    {type: 'crop', id: 'corn'},
    {type: 'crop', id: 'sugarcane'},
    {type: 'crop', id: 'maize'},
    {type: 'fertilizer', id: 'vermicompost'},
    {type: 'fertilizer', id: 'neem_cake'},
    {type: 'fertilizer', id: 'npk_10_26_26'},
    {type: 'fertilizer', id: 'npk_12_32_16'},
  ];

  return (
    <div className="flex min-h-screen bg-[#ffb703] text-black">
       <aside className={cn(
        "flex-shrink-0 transition-all duration-300 ease-in-out bg-[#8ECAE6]",
        isSidebarOpen ? "w-72 p-4" : "w-0 p-0"
       )}>
           <div className={cn("flex flex-col h-full overflow-hidden", !isSidebarOpen && "hidden")}>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="font-headline text-xl font-bold truncate">{state.worldName || "AgroPlay"}</h1>
                        <p className="text-black/70 text-sm">Season {state.season}</p>
                    </div>
                </div>

                <div className="flex items-center justify-between bg-black/10 p-3 rounded-lg mb-6">
                    <div className="flex items-center gap-2">
                        <Banknote className="h-6 w-6 text-green-700"/>
                        <span className="font-bold text-xl">₹{state.capital.toLocaleString('en-IN')}</span>
                    </div>
                    <p className="text-xs text-black/70">Capital</p>
                </div>
                
                {state.stage !== 'setup' && state.stage !== 'world_creation' && (
                     <div className="mb-4">
                        <h3 className="font-headline text-lg mb-2">Current Farm State</h3>
                        <div className="text-sm space-y-1 text-black/80 bg-black/5 p-2 rounded-md">
                            <p><strong>Soil Type:</strong> {state.soilType}</p>
                            <p><strong>Fertility:</strong> {Math.round(state.soilFertility)}%</p>
                            <p><strong>N:</strong> {state.nitrogen.toFixed(2)} | <strong>P:</strong> {state.phosphorus.toFixed(2)} | <strong>K:</strong> {state.potassium.toFixed(2)}</p>
                            <p><strong>pH:</strong> {state.soilPh.toFixed(2)}</p>
                            <hr className="my-1 border-black/10" />
                            <p><strong>Weather:</strong> {state.weather}</p>
                            <p><strong>Market:</strong> {state.marketDemand}</p>
                        </div>
                    </div>
                )}
                
                <div className="flex-grow overflow-y-auto pr-1 space-y-4">
                    <div>
                        <h3 className="font-headline text-lg mb-2 flex items-center gap-2"><History/>Season History</h3>
                        {state.history.length === 0 ? (
                            <p className="text-sm text-black/60">No past seasons to show.</p>
                        ) : (
                            <div className="space-y-2">
                                {state.history.map(h => (
                                    <div key={h.season} className="bg-black/10 p-2 rounded-md text-xs">
                                        <p className="font-bold">Season {h.season}: ₹{h.netProfit.toLocaleString('en-IN')}</p>
                                        <p className="text-black/70">{cropData[h.crop].name}, {h.fertilizers.length} fertilizers</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div>
                        <h3 className="font-headline text-lg mb-2 flex items-center gap-2"><ShoppingCart/>Farm Store</h3>
                        <div className="space-y-2">
                            {storeItems.map(item => {
                                const isUnlocked = item.type === 'crop' 
                                    ? state.unlockedCrops.includes(item.id as CropType) 
                                    : state.unlockedFertilizers.includes(item.id as FertilizerId);
                                const data = item.type === 'crop' ? cropData[item.id as CropType] : fertilizerData[item.id as FertilizerId];
                                const cost = item.type === 'crop' ? data.baseCost * 2 : data.cost * 1.5;
                                const canAfford = state.capital >= cost;
                                return (
                                    <div key={item.id} className="bg-black/10 p-2 rounded-md flex justify-between items-center">
                                        <div>
                                            <p className="font-bold">{data.name}</p>
                                            <p className="text-xs text-black/70">Unlock Cost: ₹{Math.round(cost)}</p>
                                        </div>
                                        <Button size="sm" variant="ghost" disabled={isUnlocked || !canAfford} onClick={() => handleBuyItem(item.type, item.id)}>
                                            {isUnlocked ? "Owned" : "Buy"}
                                        </Button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <Button variant="link" onClick={() => window.location.href = '/dashboard'}>Back to Dashboard</Button>
           </div>
       </aside>

       <div className="relative flex-grow flex flex-col">
            <Button 
                variant="secondary" 
                size="icon" 
                className="absolute top-4 -left-4 z-10 rounded-full"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                <ChevronLeft className={cn("transition-transform", isSidebarOpen && "rotate-180")} />
            </Button>
            <main className="flex-grow flex flex-col items-center justify-center p-4">
                <div className="w-full h-full flex items-center justify-center">
                    {renderContent()}
                </div>
            </main>
       </div>
    </div>
  );
}

    

    

    

    