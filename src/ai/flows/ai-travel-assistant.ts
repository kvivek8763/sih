'use server';

/**
 * @fileOverview An AI-powered travel assistant flow.
 *
 * - aiTravelAssistant - A function that answers user queries related to train travel.
 * - AiTravelAssistantInput - The input type for the aiTravelAssistant function.
 * - AiTravelAssistantOutput - The return type for the aiTravelAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiTravelAssistantInputSchema = z.object({
  query: z.string().describe('The user query related to train travel.'),
});
export type AiTravelAssistantInput = z.infer<typeof AiTravelAssistantInputSchema>;

const AiTravelAssistantOutputSchema = z.object({
  answer: z.string().describe('The answer to the user query.'),
});
export type AiTravelAssistantOutput = z.infer<typeof AiTravelAssistantOutputSchema>;

export async function aiTravelAssistant(input: AiTravelAssistantInput): Promise<AiTravelAssistantOutput> {
  return aiTravelAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiTravelAssistantPrompt',
  input: {schema: AiTravelAssistantInputSchema},
  output: {schema: AiTravelAssistantOutputSchema},
  prompt: `You are a helpful AI travel assistant for Indian Railways. Answer the user's question about train schedules, delays, platform numbers, and other travel-related queries.

Question: {{{query}}}`,
});

const aiTravelAssistantFlow = ai.defineFlow(
  {
    name: 'aiTravelAssistantFlow',
    inputSchema: AiTravelAssistantInputSchema,
    outputSchema: AiTravelAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
