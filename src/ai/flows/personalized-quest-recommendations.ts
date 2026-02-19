'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing personalized quest recommendations to users.
 *
 * The flow takes into account the user's selected crop, location, and current level to suggest relevant and rewarding quests.
 *
 * @exports {
 *   getPersonalizedQuestRecommendations - A function that retrieves personalized quest recommendations.
 *   PersonalizedQuestRecommendationsInput - The input type for the getPersonalizedQuestRecommendations function.
 *   PersonalizedQuestRecommendationsOutput - The return type for the getPersonalizedQuestRecommendations function.
 * }
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

/**
 * Input schema for personalized quest recommendations.
 */
const PersonalizedQuestRecommendationsInputSchema = z.object({
  crop: z.string().describe('The crop selected by the user.'),
  location: z.string().describe('The location of the user.'),
  level: z.number().describe('The current level of the user.'),
});
export type PersonalizedQuestRecommendationsInput = z.infer<
  typeof PersonalizedQuestRecommendationsInputSchema
>;

/**
 * Output schema for personalized quest recommendations.
 */
const PersonalizedQuestRecommendationsOutputSchema = z.object({
  quests: z
    .array(z.string())
    .describe('A list of personalized quest recommendations.'),
});
export type PersonalizedQuestRecommendationsOutput = z.infer<
  typeof PersonalizedQuestRecommendationsOutputSchema
>;

/**
 * Retrieves personalized quest recommendations based on user input.
 * @param input - The input containing crop, location, and level information.
 * @returns A list of personalized quest recommendations.
 */
export async function getPersonalizedQuestRecommendations(
  input: PersonalizedQuestRecommendationsInput
): Promise<PersonalizedQuestRecommendationsOutput> {
  return personalizedQuestRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedQuestRecommendationsPrompt',
  input: {schema: PersonalizedQuestRecommendationsInputSchema},
  output: {schema: PersonalizedQuestRecommendationsOutputSchema},
  prompt: `You are an AI assistant designed to provide personalized quest recommendations for farmers.

  Based on the farmer's current crop, location, and level, suggest quests that will help them improve their farming skills and increase their earnings.

  Crop: {{{crop}}}
  Location: {{{location}}}
  Level: {{{level}}}

  Provide a list of quest recommendations that are most relevant to the farmer's current situation.
  `,
});

/**
 * Genkit flow for personalized quest recommendations.
 */
const personalizedQuestRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedQuestRecommendationsFlow',
    inputSchema: PersonalizedQuestRecommendationsInputSchema,
    outputSchema: PersonalizedQuestRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
