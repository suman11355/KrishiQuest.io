
'use server';
/**
 * @fileOverview This file defines a Genkit flow for recommending a crop and fertilizer
 * for the AgroPlay game based on user-provided farm conditions.
 *
 * @exports {
 *   getAgroPlayRecommendation - A function that generates the recommendation.
 *   AgroPlayRecommendationInput - The input type for the flow.
 *   AgroPlayRecommendationOutput - The return type for the flow.
 * }
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

/**
 * Input schema for the AgroPlay recommendation flow.
 */
const AgroPlayRecommendationInputSchema = z.object({
  soil: z.object({
    type: z
      .enum(['Alluvial', 'Black', 'Red', 'Laterite', 'Loamy'])
      .describe('The primary soil type in the region.'),
    fertility: z
      .number()
      .min(0)
      .max(1)
      .describe(
        'A score from 0.0 to 1.0 representing the natural fertility of the soil.'
      ),
  }),
  weather: z.object({
    forecast: z
      .enum([
        'Favorable',
        'Average',
        'Drought-Prone',
        'Excess-Rainfall',
        'Sunny',
        'Cloudy',
        'Rainy',
      ])
      .describe('The predicted weather pattern for the upcoming season.'),
  }),
  market: z.object({
    demand: z
      .enum(['High', 'Normal', 'Low'])
      .describe('The predicted market demand for general produce.'),
  }),
});
export type AgroPlayRecommendationInput = z.infer<
  typeof AgroPlayRecommendationInputSchema
>;

/**
 * Output schema for the AgroPlay recommendation flow.
 */
const AgroPlayRecommendationOutputSchema = z.object({
  crop: z
    .enum(['wheat', 'rice', 'tomato', 'potato'])
    .describe(
      'The recommended crop to plant based on all the provided conditions.'
    ),
  fertilizer: z
    .string()
    .describe(
      'A general recommendation for the type of fertilizer to use (e.g., organic, chemical, nitrogen-rich).'
    ),
  reason: z
    .string()
    .describe(
      'A short explanation for why this crop and fertilizer combination is recommended.'
    ),
});
export type AgroPlayRecommendationOutput = z.infer<
  typeof AgroPlayRecommendationOutputSchema
>;

const prompt = ai.definePrompt({
  name: 'agroPlayRecommendationPrompt',
  input: {schema: AgroPlayRecommendationInputSchema},
  output: {schema: AgroPlayRecommendationOutputSchema},
  prompt: `You are a senior agricultural extension officer in India. A farmer has provided you with their current farm conditions and needs a recommendation for the upcoming season.

    These are the conditions:
    - Soil Type: {{{soil.type}}}
    - Soil Fertility: {{{soil.fertility}}}
    - Weather Forecast: {{{weather.forecast}}}
    - Market Demand: {{{market.demand}}}

    Based on these factors, you must recommend:
    1.  **A Crop**: Choose one from the available options: 'wheat', 'rice', 'tomato', 'potato'.
    2.  **A Fertilizer Type**: Provide a general recommendation for the type of fertilizer to use (e.g., organic, chemical, nitrogen-rich). For example, if soil fertility is low, recommend organic fertilizer. If market demand is high, recommend a high-revenue crop that suits the weather.
    3.  **A Justification**: Provide a brief reason for your recommendation, explaining how the crop and fertilizer choice balances the provided conditions to maximize profit and maintain farm health.

    Your response must strictly follow the provided output schema.`,
});

/**
 * Genkit flow for generating a personalized AgroPlay recommendation.
 */
const recommendationFlow = ai.defineFlow(
  {
    name: 'agroPlayRecommendationFlow',
    inputSchema: AgroPlayRecommendationInputSchema,
    outputSchema: AgroPlayRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

/**
 * Retrieves a personalized AgroPlay recommendation based on user-provided farm conditions.
 * @param input - The user's farm conditions.
 * @returns A detailed recommendation for the game.
 */
export async function getAgroPlayRecommendation(
  input: AgroPlayRecommendationInput
): Promise<AgroPlayRecommendationOutput> {
  return recommendationFlow(input);
}
