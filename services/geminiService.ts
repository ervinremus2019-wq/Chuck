
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import { ChatMessage } from '../types';

const MODEL_NAME = 'gemini-3-flash-preview'; // Suitable for general chat tasks

/**
 * Generates a response from the Gemini model.
 * @param chatHistory The array of previous chat messages.
 * @param currentQuery The user's current query.
 * @param systemInstruction The system instruction to guide the model's persona.
 * @returns A promise that resolves to the generated text response.
 */
export const generateGeminiResponse = async (
  chatHistory: ChatMessage[],
  currentQuery: string,
  systemInstruction: string
): Promise<string> => {
  // CRITICAL: Create a new GoogleGenAI instance right before making an API call
  // to ensure it always uses the most up-to-date API key from the dialog.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Map chat history and current query to the format expected by Gemini API
  const contents = [
    { role: 'system', parts: [{ text: systemInstruction }] },
    ...chatHistory.map((msg) => ({
      role: msg.type === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    })),
    { role: 'user', parts: [{ text: currentQuery }] },
  ];

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: contents,
    });

    const text = response.text; // Direct access to text property
    if (!text) {
      throw new Error('Gemini API returned an empty response.');
    }
    return text;
  } catch (error) {
    console.error('Error generating Gemini response:', error);
    // Propagate the error to App.tsx to handle API key selection or display a message
    throw error;
  }
};
