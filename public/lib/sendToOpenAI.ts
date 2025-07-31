import { openai } from "./openaiClient";

export async function getAIResponse(text: string): Promise<string> {
  try {
    const chat = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or "gpt-4" if your key supports it
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: text },
      ],
    });

    const response = chat.choices[0]?.message?.content?.trim();
    return response || "No response received.";
  } catch (error) {
    console.error("OpenAI API error:", error);
    return "Sorry, I couldn't get a response from OpenAI.";
  }
}
