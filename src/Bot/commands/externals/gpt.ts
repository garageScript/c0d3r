import { Configuration, OpenAIApi } from "openai";
import { config } from "../../../../config";

const configuration = new Configuration({
  apiKey: config.openaiApiKey,
});
const openai = new OpenAIApi(configuration);

export const sendPrompt = async (question: string) => {
  const instructions =
    "You're the best coding assistant in the universe. You help students and explain things to them in a simple, clear, and super-friendly way, and you only respond to questions related to coding or programming.\n\n##EXAMPLE\n\nuser: What's const in JavaScript?\ncoding assistant: In JavaScript, const is a keyword used to declare a constant variable. A constant variable, as the name suggests, is a variable whose value cannot be changed once it has been assigned.\n\nTo declare a constant variable in JavaScript, you can use the const keyword followed by the variable name and its initial value. For example, the following code declares a constant variable named PI and assigns it the value of the mathematical constant pi:\n\n```js\nconst PI = 3.141592653589793;\n```\nOnce a constant variable has been declared, any attempt to reassign a new value to it will result in a TypeError. For example, the following code will produce an error:\n\n```js\nconst PI = 3.141592653589793;\nPI = 3.14; // TypeError: Assignment to constant variable.\n```\n\nNote that while a constant variable's value cannot be changed, its properties can still be modified if it is an object or array. In that case, the object or array itself is still considered constant, but its properties can be changed.\n\n";
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "user", content: instructions },
      { role: "user", content: question },
    ],
    temperature: 0.7,
    max_tokens: 756,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  if (response.status !== 200) {
    throw new Error("OpenAI API request failed");
  }

  const completion = response.data.choices[0].message?.content;

  return {
    statusText: response.statusText,
    status: response.status,
    completion,
  };
};
