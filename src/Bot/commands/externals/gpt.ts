import OpenAI from "openai";
import { config } from "../../../../config";

const openai = new OpenAI({
  apiKey: config.openaiApiKey,
});

export const sendPrompt = async (question: string) => {
  try {
    const instructions = `Your role is to be a coding assistant, offering clear and concise explanations on programming-related topics to students. Your responses should be friendly and easy to understand, and you should only address questions about coding, programming, and jobs.`;
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: [
        { role: "system", content: instructions },
        { role: "user", content: question },
      ],
      temperature: 0.7,
      max_tokens: 4000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const completion = response.choices[0].message?.content;

    return {
      completion,
    };
  } catch (error) {
    throw new Error("OpenAI API request failed");
  }
};
