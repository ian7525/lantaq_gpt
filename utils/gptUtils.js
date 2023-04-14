import openaiLib from '../lib/openai.js'

import { getLatestChat } from './chatHistoryUtils.js'

export default function gptUtils(apiKey) {
  const openai = openaiLib(apiKey)

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
