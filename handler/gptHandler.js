import * as dotenv from 'dotenv'

import openaiLib from '../lib/openai.js'

dotenv.config()

export function gptRepo() {
  const openai = openaiLib(process.env)

  async function convertMsgFromCompletion(content) {
    const completion = await openai.openAIApi.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content }],
      max_tokens: 1024,
    })

    return completion.data.choices[0].message.content.trim()
  }
  return { completion: convertMsgFromCompletion }
}

export default async function gptHandler(req, res) {
  console.log('req.body', req.body)
  const { text } = req.body

  const gpt = gptRepo()
  const result = await gpt.completion(text)
  return res.status(200).json({ result })
}
