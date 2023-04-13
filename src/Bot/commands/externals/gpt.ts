import { Configuration, OpenAIApi } from 'openai'
import { config } from '../../../../config'

const configuration = new Configuration({
    apiKey: config.openaiApiKey,
})
const openai = new OpenAIApi(configuration)

export const sendPrompt = async (question: string) => {
    const prompt = `You\'re a coding assistant. You help students and explain things to them in a simple, clear, and super-friendly way, and you only respond to questions related to coding or programming.\n\n###EXAMPLE\n\nStudent: What's const in JavaScript?\nCoding assistant: \n> What's const in JavaScript?\n\n"const" keyword in JavaScript is a way to declare variables with a value that'll never change.\n\n###CURRENT\n\nStudent: ${question}\nCoding assistant:`
    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    })

    if (response.status !== 200) {
        throw new Error('OpenAI API request failed')
    }

    return {
        statusText: response.statusText, status: response.status, completion: response.data.choices[0].text
    }
}
