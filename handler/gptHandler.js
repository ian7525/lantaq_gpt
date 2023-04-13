import * as dotenv from 'dotenv'

import openaiLib from '../lib/openai.js'

dotenv.config()
let previousAns = null
export function gptRepo() {
  const openai = openaiLib(process.env)

  async function chatCompletion(question, role = 'user') {
    const content = !!previousAns ? `${previousAns}\n${question}` : question
    const completion = await openai.openAIApi.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role, content }],
      max_tokens: 1024,
    })

    const responseAns = completion.data.choices[0].message.content.trim()
    previousAns = `${question}\n${responseAns}`
    return responseAns
  }
  return { chatCompletion }
}

export default async function gptHandler(req, res) {
  const { text } = req.body

  const gpt = gptRepo()
  const result = await gpt.chatCompletion(text)
  return res.status(200).json({ result })
}
