
'use server';

import { aiTravelAssistant } from '@/ai/flows/ai-travel-assistant';

export async function getAiResponse(query: string): Promise<{ answer?: string; error?: string }> {
  if (!query || query.trim().length === 0) {
    return { error: 'Please enter a query.' };
  }
  try {
    const response = await aiTravelAssistant({ query });
    return { answer: response.answer };
  } catch (e) {
    console.error('AI Assistant Error:', e);
    return { error: 'Sorry, I was unable to process your request. Please try again later.' };
  }
}
