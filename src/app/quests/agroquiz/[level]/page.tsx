
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import { KisanKoinIcon } from '@/components/krishi-quest/icons';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

// In a real app, you would fetch this from a database
const quizData = [
  // Level 1
  {
    level: 1,
    questions: [
      { question: "Which of these is a Kharif crop?", options: ["Wheat", "Mustard", "Rice", "Barley"], answer: "Rice" },
      { question: "What does NPK stand for in fertilizers?", options: ["Nitrogen, Phosphorus, Potassium", "Nickel, Platinum, Krypton", "Nitrogen, Phosphate, Kalium", "Sodium, Phosphorus, Potassium"], answer: "Nitrogen, Phosphorus, Potassium" },
      { question: "Which soil is best for growing cotton?", options: ["Alluvial Soil", "Red Soil", "Black Soil", "Laterite Soil"], answer: "Black Soil" },
    ],
  },
  // Level 2
  {
    level: 2,
    questions: [
        { question: "Which of these is a Rabi crop?", options: ["Maize", "Jowar", "Soybean", "Wheat"], answer: "Wheat" },
        { question: "What is vermicompost?", options: ["Compost made by worms", "Chemical fertilizer", "A type of pesticide", "A mix of vitamins for soil"], answer: "Compost made by worms" },
        { question: "Which government scheme provides soil health cards to farmers?", options: ["PM-KISAN", "PMFBY", "Soil Health Card Scheme", "e-NAM"], answer: "Soil Health Card Scheme" },
    ],
  },
  // Level 3
  {
    level: 3,
    questions: [
      { question: "Drip irrigation is a method of:", options: ["Water conservation", "Pest control", "Soil testing", "Harvesting"], answer: "Water conservation" },
      { question: "What is the primary purpose of a greenhouse?", options: ["To protect from rain", "To control the growing environment", "To store crops", "To keep animals out"], answer: "To control the growing environment" },
      { question: "Which of the following is a leguminous crop that helps in nitrogen fixation?", options: ["Paddy", "Wheat", "Gram (Chickpea)", "Maize"], answer: "Gram (Chickpea)" },
    ],
  },
  // Level 4
  {
    level: 4,
    questions: [
      { question: "What is 'crop rotation'?", options: ["Harvesting crops in a circle", "Growing different crops in succession on the same land", "Watering crops in rotation", "Selling crops at different times"], answer: "Growing different crops in succession on the same land" },
      { question: "The 'Green Revolution' in India is most associated with which crop?", options: ["Rice", "Wheat", "Cotton", "Sugarcane"], answer: "Wheat" },
      { question: "What is a common sign of nitrogen deficiency in plants?", options: ["Yellowing of older, lower leaves", "Purple leaves", "Stunted growth with dark green leaves", "White spots on leaves"], answer: "Yellowing of older, lower leaves" },
    ],
  },
  // Level 5
  {
    level: 5,
    questions: [
      { question: "Which Indian state is the largest producer of sugarcane?", options: ["Maharashtra", "Punjab", "Uttar Pradesh", "Karnataka"], answer: "Uttar Pradesh" },
      { question: "What does the term 'fallow land' mean?", options: ["Land that is very fertile", "Land left uncultivated for a period", "Land used for grazing", "Land with a water source"], answer: "Land left uncultivated for a period" },
      { question: "The agency responsible for procurement, distribution, and storage of food grains in India is:", options: ["NABARD", "FCI (Food Corporation of India)", "ICAR", "NITI Aayog"], answer: "FCI (Food Corporation of India)" },
    ],
  },
  // Level 6
  {
    level: 6,
    questions: [
        { question: "What is the ideal pH range for most agricultural soils?", options: ["4.5 - 5.5", "6.0 - 7.5", "8.0 - 9.0", "9.5 - 10.5"], answer: "6.0 - 7.5" },
        { question: "Which pest is commonly known as the 'farmer's enemy' for cotton crops?", options: ["Aphid", "Whitefly", "Pink Bollworm", "Stem Borer"], answer: "Pink Bollworm" },
        { question: "What is 'zero tillage' farming?", options: ["Farming without any soil", "A method to reduce soil erosion by not plowing the field", "A type of organic farming", "Farming at high altitudes"], answer: "A method to reduce soil erosion by not plowing the field" }
    ]
  },
  // Level 7
  {
    level: 7,
    questions: [
        { question: "The 'White Revolution' is associated with an increase in the production of:", options: ["Milk", "Cotton", "Salt", "Eggs"], answer: "Milk" },
        { question: "Which one of the following is not a cash crop?", options: ["Sugarcane", "Cotton", "Jute", "Bajra"], answer: "Bajra" },
        { question: "What is the main objective of the Pradhan Mantri Fasal Bima Yojana (PMFBY)?", options: ["To provide loans to farmers", "To provide insurance cover against crop failure", "To provide free seeds", "To set Minimum Support Prices"], answer: "To provide insurance cover against crop failure" }
    ]
  },
  // Level 8
  {
    level: 8,
    questions: [
        { question: "What is 'intercropping'?", options: ["Growing two or more crops simultaneously on the same field", "Growing crops indoors", "Growing crops in water", "Growing a single crop over a large area"], answer: "Growing two or more crops simultaneously on the same field" },
        { question: "Which of these is a bio-fertilizer?", options: ["Urea", "DAP", "Rhizobium", "Potash"], answer: "Rhizobium" },
        { question: "Rust is a common disease in which crop?", options: ["Rice", "Wheat", "Maize", "Cotton"], answer: "Wheat" }
    ]
  },
  // Level 9
  {
    level: 9,
    questions: [
        { question: "What is the full form of KCC in the context of Indian agriculture?", options: ["Krishi Credit Card", "Kisan Call Center", "Krishi Cost Calculator", "Kisan Credit Card"], answer: "Kisan Credit Card" },
        { question: "Which element is crucial for root development in plants?", options: ["Nitrogen", "Phosphorus", "Potassium", "Sulphur"], answer: "Phosphorus" },
        { question: "The practice of growing fruits, vegetables, and flowers is known as:", options: ["Apiculture", "Sericulture", "Horticulture", "Pisciculture"], answer: "Horticulture" }
    ]
  },
  // Level 10
  {
    level: 10,
    questions: [
        { question: "What is the Minimum Support Price (MSP)?", options: ["The maximum price at which government buys crops", "The price at which farmers sell in the open market", "A price fixed by the government to protect farmers from sharp falls in prices", "The price of imported agricultural goods"], answer: "A price fixed by the government to protect farmers from sharp falls in prices" },
        { question: "Laterite soil is rich in which minerals?", options: ["Iron and Aluminum", "Calcium and Magnesium", "Sodium and Potassium", "Nitrogen and Phosphorus"], answer: "Iron and Aluminum" },
        { question: "Which type of farming involves the cultivation of grapes?", options: ["Viticulture", "Floriculture", "Olericulture", "Silviculture"], answer: "Viticulture" }
    ]
  },
  { level: 11, questions: [ { question: "What is 'leaching' in soil?", options: ["The addition of nutrients", "The loss of water-soluble plant nutrients from the soil", "The process of soil formation", "A method of plowing"], answer: "The loss of water-soluble plant nutrients from the soil" }, { question: "The 'Golden Revolution' refers to the development of:", options: ["Oilseeds", "Pulses", "Horticulture and Honey", "Jute"], answer: "Horticulture and Honey" }, { question: "Which of these is a common herbicide?", options: ["Malathion", "Glyphosate", "Endosulfan", "Phorate"], answer: "Glyphosate" }] },
  { level: 12, questions: [ { question: "What is a 'seed drill' used for?", options: ["Harvesting seeds", "Sowing seeds at uniform depths", "Watering seeds", "Storing seeds"], answer: "Sowing seeds at uniform depths" }, { question: "Which country is the largest producer of pulses in the world?", options: ["China", "USA", "India", "Brazil"], answer: "India" }, { question: "A 'tensiometer' is used to measure what in agriculture?", options: ["Soil moisture", "Air temperature", "Nutrient level", "Plant growth rate"], answer: "Soil moisture" }] },
  { level: 13, questions: [ { question: "What is 'apiculture'?", options: ["The rearing of silkworms", "The cultivation of fruits", "The science of bee-keeping", "The practice of fish farming"], answer: "The science of bee-keeping" }, { question: "Which micronutrient deficiency causes 'khaira' disease in rice?", options: ["Iron", "Zinc", "Copper", "Boron"], answer: "Zinc" }, { question: "The 'System of Rice Intensification' (SRI) is a method that focuses on:", options: ["Using more seeds and water", "Reducing plant density and using less water", "Using only chemical fertilizers", "Growing rice in dry fields"], answer: "Reducing plant density and using less water" }] },
  { level: 14, questions: [ { question: "What is the primary function of potassium (K) in plants?", options: ["Leaf growth", "Disease resistance and water regulation", "Seed formation", "Photosynthesis"], answer: "Disease resistance and water regulation" }, { question: "Who is known as the Father of the Green Revolution in India?", options: ["Verghese Kurien", "M.S. Swaminathan", "C. Subramaniam", "Norman Borlaug"], answer: "M.S. Swaminathan" }, { question: "What is 'e-NAM'?", options: ["A new variety of seed", "An online trading platform for agricultural commodities", "A type of fertilizer", "A weather forecasting service"], answer: "An online trading platform for agricultural commodities" }] },
  { level: 15, questions: [ { question: "Which soil type covers the largest area in India?", options: ["Black Soil", "Red Soil", "Laterite Soil", "Alluvial Soil"], answer: "Alluvial Soil" }, { question: "What is 'contour ploughing'?", options: ["Ploughing in straight lines", "Ploughing parallel to the contours of a hill slope", "Ploughing very deeply", "Ploughing without turning the soil"], answer: "Ploughing parallel to the contours of a hill slope" }, { question: "Citrus canker is a disease that affects which type of plants?", options: ["Cereals", "Citrus fruits like lemons and oranges", "Root vegetables", "Leafy greens"], answer: "Citrus fruits like lemons and oranges" }] },
  { level: 16, questions: [ { question: "What is the C:N ratio?", options: ["Cost to Nitrogen ratio", "Carbon to Nitrogen ratio in organic matter", "Calcium to Nitrogen ratio", "Crop to Nitrogen ratio"], answer: "Carbon to Nitrogen ratio in organic matter" }, { question: "Which crop is associated with the 'tikka' disease?", options: ["Groundnut", "Soybean", "Mustard", "Sunflower"], answer: "Groundnut" }, { question: "What is 'Integrated Pest Management' (IPM)?", options: ["Using only chemical pesticides", "An eco-friendly approach that combines various methods to control pests", "A method to attract pests", "Using genetically modified pests"], answer: "An eco-friendly approach that combines various methods to control pests" }] },
  { level: 17, questions: [ { question: "The 'Blue Revolution' is related to:", options: ["Space research", "Fish production", "Drinking water", "Indigo cultivation"], answer: "Fish production" }, { question: "What is 'soil salinity'?", options: ["The amount of sand in soil", "The acidity of the soil", "The concentration of salts in the soil", "The color of the soil"], answer: "The concentration of salts in the soil" }, { question: "Which farm implement is used for leveling the soil?", options: ["Harrow", "Cultivator", "Plank/Leveler", "Rotavator"], answer: "Plank/Leveler" }] },
  { level: 18, questions: [ { question: "Gummosis is a disease primarily affecting which trees?", options: ["Mango", "Apple", "Citrus", "Banana"], answer: "Citrus" }, { question: "What is a 'mixed farming' system?", options: ["Growing only mixed vegetables", "Cultivating crops and raising livestock together", "Mixing different fertilizers", "Mixing seeds of different crops before sowing"], answer: "Cultivating crops and raising livestock together" }, { question: "Which organization in India is responsible for agricultural research and education?", options: ["FCI", "NABARD", "ICAR", "APEDA"], answer: "ICAR" }] },
  { level: 19, questions: [ { question: "What is the purpose of 'pruning' in plants?", options: ["To increase water absorption", "To remove dead or overgrown branches to encourage growth", "To protect from pests", "To add nutrients to the plant"], answer: "To remove dead or overgrown branches to encourage growth" }, { question: "The 'Yellow Revolution' was associated with the production of:", options: ["Fruits", "Eggs", "Oilseeds", "Turmeric"], answer: "Oilseeds" }, { question: "What does 'certified seed' guarantee to a farmer?", options: ["High yield", "Genetic purity and quality standards", "Resistance to all diseases", "Early maturity"], answer: "Genetic purity and quality standards" }] },
  { level: 20, questions: [ { question: "Which of the following is a Zaid crop?", options: ["Wheat", "Rice", "Cucumber", "Mustard"], answer: "Cucumber" }, { question: "What is 'furrow irrigation'?", options: ["Watering the entire field", "Watering through sprinklers", "Creating small channels or furrows to carry water", "Watering only the plant roots"], answer: "Creating small channels or furrows to carry water" }, { question: "NABARD is a bank that provides credit for:", options: ["Industrial development", "Urban infrastructure", "Agriculture and rural development", "Export and import"], answer: "Agriculture and rural development" }] },
  { level: 21, questions: [ { question: "What is 'soil structure'?", options: ["The type of minerals in the soil", "The arrangement of soil particles", "The depth of the soil", "The color of the soil"], answer: "The arrangement of soil particles" }, { question: "Which plant hormone is responsible for ripening fruits?", options: ["Auxin", "Gibberellin", "Ethylene", "Cytokinin"], answer: "Ethylene" }, { question: "The term 'ratooning' is associated with which crop?", options: ["Wheat", "Sugarcane", "Rice", "Cotton"], answer: "Sugarcane" }] },
  { level: 22, questions: [ { question: "What is 'mulching'?", options: ["A type of fertilizer", "Covering the soil surface to conserve moisture and control weeds", "A method of harvesting", "A pest control technique"], answer: "Covering the soil surface to conserve moisture and control weeds" }, { question: "Loose smut is a disease that commonly affects which crop?", options: ["Maize", "Barley", "Rice", "Wheat"], answer: "Wheat" }, { question: "What is the main advantage of sprinkler irrigation?", options: ["Low cost", "Suitable for all crop types", "Uniform distribution of water and high efficiency", "Does not require electricity"], answer: "Uniform distribution of water and high efficiency" }] },
  { level: 23, questions: [ { question: "Which is the most widely cultivated fruit crop in India?", options: ["Apple", "Banana", "Mango", "Grapes"], answer: "Mango" }, { question: "What is 'field capacity' of soil?", options: ["The maximum amount of crops a field can hold", "The amount of water held in soil after excess water has drained away", "The number of farmers that can work in a field", "The fertility level of a field"], answer: "The amount of water held in soil after excess water has drained away" }, { question: "The 'Silver Revolution' is associated with:", options: ["Cotton", "Silver mining", "Eggs and Poultry", "Aluminium"], answer: "Eggs and Poultry" }] },
  { level: 24, questions: [ { question: "What is 'green manuring'?", options: ["Using green colored fertilizers", "Plowing under or mixing into the soil undecomposed green plant material", "Painting farm equipment green", "A brand of organic compost"], answer: "Plowing under or mixing into the soil undecomposed green plant material" }, { question: "Which state is the leading producer of spices in India?", options: ["Kerala", "Karnataka", "Andhra Pradesh", "Rajasthan"], answer: "Andhra Pradesh" }, { question: "A 'combine harvester' is a machine that combines which operations?", options: ["Sowing and irrigation", "Ploughing and leveling", "Harvesting, threshing, and winnowing", "Fertilizing and pest control"], answer: "Harvesting, threshing, and winnowing" }] },
  { level: 25, questions: [ { question: "What is the permanent wilting point?", options: ["The point at which a plant starts to flower", "The minimal point of soil moisture the plant requires not to wilt", "The temperature at which a plant wilts", "The point at which a plant cannot recover from wilting"], answer: "The minimal point of soil moisture the plant requires not to wilt" }, { question: "Which of these is a bacterial disease in plants?", options: ["Rust", "Smut", "Bacterial Blight", "Powdery Mildew"], answer: "Bacterial Blight" }, { question: "The Central Rice Research Institute of India is located in:", options: ["New Delhi", "Cuttack", "Chennai", "Kolkata"], answer: "Cuttack" }] },
  { level: 26, questions: [ { question: "What is 'sericulture'?", options: ["Bee-keeping", "Fish farming", "Silk farming", "Forest cultivation"], answer: "Silk farming" }, { question: "What is the ideal temperature for wheat cultivation?", options: ["25-30°C", "10-25°C", "30-35°C", "5-10°C"], answer: "10-25°C" }, { question: "Which nutrient helps in chlorophyll formation?", options: ["Magnesium", "Calcium", "Sulphur", "Zinc"], answer: "Magnesium" }] },
  { level: 27, questions: [ { question: "What is 'agroforestry'?", options: ["Farming only in forests", "A land use management system in which trees are grown around crops", "A government department for forests", "Studying forest soil"], answer: "A land use management system in which trees are grown around crops" }, { question: "The 'Red Revolution' in India is associated with:", options: ["Tomato and Meat production", "Chilli production", "Apple production", "Blood donation camps"], answer: "Tomato and Meat production" }, { question: "What does a hygrometer measure?", options: ["Soil pH", "Wind speed", "Humidity", "Sunlight intensity"], answer: "Humidity" }] },
  { level: 28, questions: [ { question: "What is 'levee' in the context of irrigation?", options: ["A type of crop", "A drainage channel", "An embankment built to prevent overflow of a river", "A water pump"], answer: "An embankment built to prevent overflow of a river" }, { question: "Powdery mildew is a type of what?", options: ["Bacterial disease", "Viral disease", "Fungal disease", "Nutrient deficiency"], answer: "Fungal disease" }, { question: "Which state is the largest producer of coffee in India?", options: ["Kerala", "Tamil Nadu", "Andhra Pradesh", "Karnataka"], answer: "Karnataka" }] },
  { level: 29, questions: [ { question: "What is 'silt'?", options: ["A type of clay", "A type of sand", "Fine sand, clay, or other material carried by running water and deposited as a sediment", "A type of organic matter"], answer: "Fine sand, clay, or other material carried by running water and deposited as a sediment" }, { question: "What is 'transpiration' in plants?", options: ["The process of making food", "The process of water movement through a plant and its evaporation from leaves", "The process of absorbing nutrients", "The process of flowering"], answer: "The process of water movement through a plant and its evaporation from leaves" }, { question: "The 'Round Revolution' is associated with which crop?", options: ["Onion", "Tomato", "Potato", "Cabbage"], answer: "Potato" }] },
  { level: 30, questions: [ { question: "Which instrument is used to measure wind speed?", options: ["Barometer", "Anemometer", "Hygrometer", "Thermometer"], answer: "Anemometer" }, { question: "What is 'vernalization'?", options: ["The process of making vermicompost", "The cooling of seed during germination in order to accelerate flowering", "A type of irrigation", "A method of pest control"], answer: "The cooling of seed during germination in order to accelerate flowering" }, { question: "Which state is known as the 'Soyabean State' of India?", options: ["Maharashtra", "Rajasthan", "Madhya Pradesh", "Gujarat"], answer: "Madhya Pradesh" }] },
  { level: 31, questions: [ { question: "What is 'parthenocarpy'?", options: ["Development of fruit without prior fertilization", "A method of grafting", "A type of crop rotation", "A disease in fruits"], answer: "Development of fruit without prior fertilization" }, { question: "What is the main component of farm yard manure (FYM)?", options: ["Plant leaves", "Dung and urine of farm animals", "Chemical waste", "Wood ash"], answer: "Dung and urine of farm animals" }, { question: "In which type of soil is water logging a common problem?", options: ["Sandy soil", "Clayey soil", "Loamy soil", "Slity soil"], answer: "Clayey soil" }] },
  { level: 32, questions: [ { question: "What is a 'rhizome'?", options: ["A type of flower", "A type of leaf", "A modified subterranean plant stem that sends out roots and shoots", "A type of seed"], answer: "A modified subterranean plant stem that sends out roots and shoots" }, { question: "Which is a major cash crop of the state of Kerala?", options: ["Wheat", "Rubber", "Jute", "Maize"], answer: "Rubber" }, { question: "What is 'cation exchange capacity' (CEC) of a soil?", options: ["The ability of a soil to absorb water", "The total capacity of a soil to hold exchangeable cations", "The soil's resistance to erosion", "The measure of soil's temperature"], answer: "The total capacity of a soil to hold exchangeable cations" }] },
  { level: 33, questions: [ { question: "What is 'allelopathy'?", options: ["A symbiotic relationship between plants", "The chemical inhibition of one plant by another", "A plant disease", "A method of genetic modification"], answer: "The chemical inhibition of one plant by another" }, { question: "Which insect is a vector for the 'tungro' virus in rice?", options: ["Aphid", "Green Leafhopper", "Whitefly", "Thrips"], answer: "Green Leafhopper" }, { question: "What is 'shifting cultivation' also known as?", options: ["Jhum or slash-and-burn", "Intensive farming", "Commercial farming", "Plantation farming"], answer: "Jhum or slash-and-burn" }] },
  { level: 34, questions: [ { question: "What does a 'barometer' measure?", options: ["Humidity", "Atmospheric pressure", "Wind speed", "Rainfall"], answer: "Atmospheric pressure" }, { question: "The 'Grey Revolution' is linked to:", options: ["Cement production", "Fertilizer production", "Wool production", "Leather production"], answer: "Fertilizer production" }, { question: "What is 'photoperiodism'?", options: ["The response of plants to the relative lengths of light and dark periods", "A method of photography for plants", "A disease caused by too much light", "The study of light in agriculture"], answer: "The response of plants to the relative lengths of light and dark periods" }] },
  { level: 35, questions: [ { question: "What are 'arable crops'?", options: ["Crops grown on trees", "Crops that are grown on land that can be used for plowing", "Crops grown in water", "Crops used for animal feed only"], answer: "Crops that are grown on land that can be used for plowing" }, { question: "Black heart disease in potato is caused by:", options: ["Fungus", "Bacteria", "Poor ventilation and oxygen deficiency", "Virus"], answer: "Poor ventilation and oxygen deficiency" }, { question: "Which Indian state is the largest producer of tea?", options: ["West Bengal", "Kerala", "Assam", "Tamil Nadu"], answer: "Assam" }] },
  { level: 36, questions: [ { question: "What is 'guttation'?", options: ["The loss of water in the form of water vapor from the plant", "The exudation of drops of xylem sap on the tips or edges of leaves", "A process of nutrient uptake", "A type of seed dormancy"], answer: "The exudation of drops of xylem sap on the tips or edges of leaves" }, { question: "What is the scientific name for common bread wheat?", options: ["Oryza sativa", "Zea mays", "Hordeum vulgare", "Triticum aestivum"], answer: "Triticum aestivum" }, { question: "What is 'puddling' in rice cultivation?", options: ["Creating puddles for ducks", "The process of churning soil with water to make it impervious", "A method of harvesting rice", "A type of rice disease"], answer: "The process of churning soil with water to make it impervious" }] },
  { level: 37, questions: [ { question: "What is 'apomixis'?", options: ["A type of pollination", "Asexual reproduction in which seeds are produced without fertilization", "A method of weed control", "A plant hormone"], answer: "Asexual reproduction in which seeds are produced without fertilization" }, { question: "Which is the key pest for mango crops in India?", options: ["Fruit fly", "Mango hopper", "Stem borer", "Mealybug"], answer: "Mango hopper" }, { question: "What is 'capillary water' in soil?", options: ["Water that is unavailable to plants", "Water held in the micropores of the soil", "Water that drains away under gravity", "Water in the form of vapor"], answer: "Water held in the micropores of the soil" }] },
  { level: 38, questions: [ { question: "What is the 'harvest index'?", options: ["A measure of how fast a crop is harvested", "The ratio of economic yield to biological yield", "An index of market prices at harvest time", "The number of people required to harvest a field"], answer: "The ratio of economic yield to biological yield" }, { question: "Whip tail disease in cauliflower is caused by the deficiency of which nutrient?", options: ["Boron", "Molybdenum", "Manganese", "Iron"], answer: "Molybdenum" }, { question: "The 'Pink Revolution' is associated with:", options: ["Pharmaceuticals and Onions", "Roses", "Cotton", "Apples"], answer: "Pharmaceuticals and Onions" }] },
  { level: 39, questions: [ { question: "What is 'hydroponics'?", options: ["A method of weather forecasting", "The science of soil management", "A method of growing plants without soil, using mineral nutrient solutions in a water solvent", "A system of water conservation"], answer: "A method of growing plants without soil, using mineral nutrient solutions in a water solvent" }, { question: "The 'blast' disease is commonly found in which crop?", options: ["Wheat", "Sugarcane", "Rice", "Maize"], answer: "Rice" }, { question: "What is the primary purpose of a 'subsoiler' plow?", options: ["To create furrows for seeds", "To break up compacted soil layers deep below the surface", "To level the field", "To remove weeds"], answer: "To break up compacted soil layers deep below the surface" }] },
  { level: 40, questions: [ { question: "What is 'denitrification'?", options: ["The process of converting nitrates into nitrogen gas", "The process of converting nitrogen gas into nitrates", "A type of fertilizer", "A plant's nitrogen uptake process"], answer: "The process of converting nitrates into nitrogen gas" }, { question: "Which is a 'short-day plant'?", options: ["Wheat", "Barley", "Soybean", "Oats"], answer: "Soybean" }, { question: "The Indian Institute of Pulses Research is located at:", options: ["Bhopal", "Hyderabad", "Kanpur", "Ludhiana"], answer: "Kanpur" }] },
  { level: 41, questions: [ { question: "What is 'gene erosion'?", options: ["A disease affecting plant genes", "The loss of genetic diversity between and within populations of the same species", "A method of genetic engineering", "The process of genes becoming stronger"], answer: "The loss of genetic diversity between and within populations of the same species" }, { question: "What is 'boll shedding' in cotton?", options: ["A method of harvesting cotton", "The premature dropping of bolls", "A disease that colors the bolls", "The process of bolls opening"], answer: "The premature dropping of bolls" }, { question: "The 'Evergreen Revolution' term was coined by:", options: ["Varghese Kurien", "M.S. Swaminathan", "Norman Borlaug", "Indira Gandhi"], answer: "M.S. Swaminathan" }] },
  { level: 42, questions: [ { question: "What is a 'bio-pesticide'?", options: ["A very strong chemical pesticide", "Pesticides derived from natural materials like animals, plants, and bacteria", "A pesticide that is safe for all insects", "A pesticide that also acts as a fertilizer"], answer: "Pesticides derived from natural materials like animals, plants, and bacteria" }, { question: "Karnal bunt is a major disease of which crop?", options: ["Rice", "Maize", "Wheat", "Barley"], answer: "Wheat" }, { question: "What does 'in-situ conservation' mean?", options: ["Conserving a species in a laboratory", "Conserving a species in its natural habitat", "Conserving a species in a zoo or botanical garden", "Conserving a species through cryopreservation"], answer: "Conserving a species in its natural habitat" }] },
  { level: 43, questions: [ { question: "What is 'plant tissue culture'?", options: ["A method of studying plant tissues under a microscope", "A collection of techniques used to maintain or grow plant cells under sterile conditions", "A type of cultural practice in farming", "A way to measure plant water content"], answer: "A collection of techniques used to maintain or grow plant cells under sterile conditions" }, { question: "The 'dodder' plant is an example of what?", options: ["A symbiotic plant", "A total stem parasite", "An insectivorous plant", "A saprophytic plant"], answer: "A total stem parasite" }, { question: "What is 'soil tilth'?", options: ["The nutrient content of the soil", "The depth of the topsoil", "The physical condition of soil in relation to plant growth", "The amount of organic matter in the soil"], answer: "The physical condition of soil in relation to plant growth" }] },
  { level: 44, questions: [ { question: "What are 'mycorrhizae'?", options: ["A type of harmful bacteria", "A type of plant virus", "A symbiotic association between a fungus and a plant's roots", "A pest that attacks roots"], answer: "A symbiotic association between a fungus and a plant's roots" }, { question: "What is 'tipping' in tea cultivation?", options: ["The final plucking of tea leaves", "The removal of the apical bud to encourage branching", "A disease of tea leaves", "A method of fertilizing tea plants"], answer: "The removal of the apical bud to encourage branching" }, { question: "What is 'retting' in jute processing?", options: ["Drying the jute fibers", "A microbial process that breaks down the pectin to liberate the fibers", "Weaving the jute fibers", "Coloring the jute fibers"], answer: "A microbial process that breaks down the pectin to liberate the fibers" }] },
  { level: 45, questions: [ { question: "What is a 'refractometer' used for in agriculture?", options: ["To measure soil pH", "To measure the sugar content (Brix) in fruits and juices", "To measure rainfall", "To identify pests"], answer: "To measure the sugar content (Brix) in fruits and juices" }, { question: "Which of the following is a 'C4 plant'?", options: ["Rice", "Wheat", "Sugarcane", "Potato"], answer: "Sugarcane" }, { question: "The Central Institute for CottonResearch (CICR) is headquartered in:", options: ["Mumbai", "Ahmedabad", "Nagpur", "Coimbatore"], answer: "Nagpur" }] },
  { level: 46, questions: [ { question: "What is 'roguing'?", options: ["A method of irrigation", "The act of removing off-type or diseased plants from a field", "A type of pest control", "A method of soil testing"], answer: "The act of removing off-type or diseased plants from a field" }, { question: "Ergot is a serious disease of which crop?", options: ["Bajra (Pearl Millet)", "Maize", "Sorghum", "Wheat"], answer: "Bajra (Pearl Millet)" }, { question: "What is 'gene pyramiding'?", options: ["A type of genetic mutation", "The process of combining multiple resistance genes into a single cultivar", "A structure for storing genetic material", "A statistical method in genetics"], answer: "The process of combining multiple resistance genes into a single cultivar" }] },
  { level: 47, questions: [ { question: "What is the 'base temperature' for a crop?", options: ["The maximum temperature a crop can tolerate", "The ideal temperature for crop growth", "The minimum temperature below which crop growth ceases", "The average temperature during the growing season"], answer: "The minimum temperature below which crop growth ceases" }, { question: "What is a 'nematode'?", options: ["A type of beneficial insect", "A type of microscopic roundworm, many of which are plant parasites", "A soil bacteria", "A fungal species"], answer: "A type of microscopic roundworm, many of which are plant parasites" }, { question: "The process of peeling the bark of sugarcane before planting is called?", options: ["Stripping", "Wrapping", "Trash mulching", "Detrashing"], answer: "Detrashing" }] },
  { level: 48, questions: [ { question: "What is 'CRISPR-Cas9'?", options: ["A type of fertilizer", "A new pesticide", "A gene-editing technology", "A weather satellite"], answer: "A gene-editing technology" }, { question: "Which chemical is used to break potato dormancy?", options: ["Ethylene", "Gibberellic acid", "Auxin", "Cytokinin"], answer: "Gibberellic acid" }, { question: "What is a 'soil colloid'?", options: ["A large rock found in soil", "A tiny clay and humus particle that carries a negative charge", "A type of soil organism", "A pocket of air in the soil"], answer: "A tiny clay and humus particle that carries a negative charge" }] },
  { level: 49, questions: [ { question: "What is 'phyto-remediation'?", options: ["A plant disease remedy", "The use of living green plants for in-situ risk reduction of contaminated soils", "A type of plant nutrient", "A method of pest control using light"], answer: "The use of living green plants for in-situ risk reduction of contaminated soils" }, { question: "Bunchy top is a viral disease of which crop?", options: ["Papaya", "Mango", "Banana", "Grapes"], answer: "Banana" }, { question: "What is the 'law of the minimum' in plant nutrition?", options: ["Plants need a minimum of 16 nutrients", "Growth is dictated not by total resources available, but by the scarcest resource", "Farmers should use the minimum amount of fertilizer", "Pests are a minimum requirement for a healthy ecosystem"], answer: "Growth is dictated not by total resources available, but by the scarcest resource" }] },
  { level: 50, questions: [ { question: "What is 'precision agriculture'?", options: ["A type of organic farming", "A farming management concept using technology to observe, measure, and respond to inter- and intra-field variability in crops", "A method of farming with high precision tools", "Farming on a very small scale"], answer: "A farming management concept using technology to observe, measure, and respond to inter- and intra-field variability in crops" }, { question: "What is 'sex pheromone trap' used for?", options: ["To kill all insects", "To attract and trap specific male insects to monitor or reduce their population", "To fertilize the crop", "To scare away birds"], answer: "To attract and trap specific male insects to monitor or reduce their population" }, { question: "The term 'biofortification' refers to:", options: ["Making forts out of biological materials", "The process of increasing the nutritional value of crops through agronomic practices or conventional plant breeding", "A type of organic pesticide", "Fortifying soil with microbes"], answer: "The process of increasing the nutritional value of crops through agronomic practices or conventional plant breeding" }] }
];


export default function QuizLevelPage() {
  const router = useRouter();
  const params = useParams();
  const level = parseInt(params.level as string, 10);
  
  const [quiz, setQuiz] = useState<(typeof quizData)[0] | undefined>(undefined);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isNaN(level)) {
        router.replace('/quests/agroquiz');
        return;
    }
    const foundQuiz = quizData.find(q => q.level === level);
    if (!foundQuiz) {
      console.error("Invalid quiz level, returning to quiz home.");
      router.replace('/quests/agroquiz');
    } else {
      setQuiz(foundQuiz);
      setIsLoading(false);
    }
  }, [level, router]);

  const handleLevelComplete = () => {
    // A level is "passed" if the score is 50% or higher.
    if (score >= quiz!.questions.length / 2) {
      const completedLevels = parseInt(localStorage.getItem('agroquiz-completed-levels') || '0', 10);
      // Only update if this level is higher than what's saved
      if (level > completedLevels) {
        localStorage.setItem('agroquiz-completed-levels', level.toString());
      }
    }
    setShowResultDialog(true);
  };
  
  if (isLoading || !quiz) {
      return <div>Loading Quiz...</div>
  }

  const { questions } = quiz;
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;


  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return;

    setSelectedAnswer(answer);
    setIsAnswered(true);

    if (answer === currentQuestion.answer) {
      setScore(prev => prev + 1);
    }
  };
  
  const handleNextQuestion = () => {
    setIsAnswered(false);
    setSelectedAnswer(null);

    if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
    } else {
        // Now we call a new function before showing the dialog
        // so we can process the final result.
        handleLevelComplete();
    }
  };

  const closeQuiz = () => {
    setShowResultDialog(false);
    router.push('/quests/agroquiz');
  }

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-4xl">
        <Card className="shadow-lg">
            <CardHeader className="text-center">
                <CardTitle className="font-headline text-3xl font-bold text-primary">Level {level}</CardTitle>
                <CardDescription>Question {currentQuestionIndex + 1} of {questions.length}</CardDescription>
            </CardHeader>
            <CardContent>
                <Progress value={progress} className="mb-6"/>

                <h2 className="text-lg md:text-xl font-semibold mb-6 text-center">{currentQuestion.question}</h2>
                
                <RadioGroup onValueChange={handleAnswerSelect} value={selectedAnswer ?? ''} className="space-y-4">
                    {currentQuestion.options.map(option => {
                        const isCorrect = option === currentQuestion.answer;
                        const isSelected = option === selectedAnswer;
                        
                        const getOptionClass = () => {
                            if (!isAnswered) return "border-border";
                            if (isSelected && !isCorrect) return "bg-red-100 border-red-500 text-red-800";
                            if (isCorrect) return "bg-green-100 border-green-500 text-green-800";
                            return "border-border";
                        }

                        return (
                            <Label key={option} htmlFor={`option-${option}`} className={cn(
                                "flex items-center space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-all",
                                getOptionClass()
                                )}>
                                <RadioGroupItem value={option} id={`option-${option}`} className="w-5 h-5" disabled={isAnswered}/>
                                <span className="text-base flex-1">{option}</span>
                                {isAnswered && isCorrect && <CheckCircle className="w-6 h-6 text-green-600"/>}
                                {isAnswered && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-red-600"/>}
                            </Label>
                        )
                    })}
                </RadioGroup>

                <div className="mt-8 text-center">
                    {isAnswered && (
                        <Button onClick={handleNextQuestion}>
                            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Show Results'}
                        </Button>
                    )}
                </div>

            </CardContent>
        </Card>


        <Dialog open={showResultDialog} onOpenChange={closeQuiz}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="font-headline text-2xl text-center">Level {level} Complete!</DialogTitle>
                </DialogHeader>
                <div className="py-4 text-center space-y-4">
                    <p className="text-lg">You scored:</p>
                    <div className="flex justify-center items-baseline gap-2">
                        <p className="text-4xl font-bold text-primary">{score}</p>
                        <p className="text-2xl text-muted-foreground">/ {questions.length}</p>
                    </div>
                    
                    <div className="flex justify-center items-center gap-2">
                        <p className="text-lg font-semibold">You earned:</p>
                        <div className="flex items-center gap-2 rounded-full bg-accent/20 px-3 py-1">
                            <KisanKoinIcon className="h-6 w-6"/>
                            <span className="font-headline text-xl font-bold text-amber-600">{score * 10}</span>
                        </div>
                    </div>
                    {score < questions.length / 2 && (
                        <p className="text-red-600">You need to score at least 50% to pass. Try again!</p>
                    )}
                </div>
                <DialogFooter>
                    <Button onClick={closeQuiz} className="w-full">Back to Quiz Home</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  );
}
