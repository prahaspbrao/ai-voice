// lib/gpt.ts
import { openai } from "./openaiClient";

export async function getGPTReply(prompt: string) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0].message.content;
}
