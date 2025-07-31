// lib/openaiClient.ts
import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // 🔒 keep private if you move to server
  dangerouslyAllowBrowser: true, // needed for client-side
});
