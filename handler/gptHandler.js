import * as dotenv from 'dotenv'

import openaiLib from '../lib/openai.js'

import { saveChat, getLatestChat } from '../utils/chatHistoryUtils.js'

dotenv.config()
export function gptRepo() {
  const openai = openaiLib(process.env)

  async function chatCompletion({
    userId = 'system',
    question,
    role = 'user',
  }) {
    const getLastChatByUserId = getLatestChat(userId)
    const content = !!Object.keys(getLastChatByUserId).length
      ? `${getLastChatByUserId.content}\n${getLastChatByUserId.response}\n${question}`
      : question

    const completion = await openai.openAIApi.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role, content }],
      max_tokens: 1024,
    })

    const responseAns = completion.data.choices[0].message.content.trim()
    return responseAns
  }
  return { chatCompletion }
}

export default async function gptHandler(req, res) {
  const { text } = req.body

  const gpt = gptRepo()
  const result = await gpt.chatCompletion({ question: text })

  // save chat history
  saveChat({ userId: 'system', content: text, response: result })

  return res.status(200).json({ result })
}
