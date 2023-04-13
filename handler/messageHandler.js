import { gptRepo } from './gptHandler.js'

export default async function messageHandler(client, event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return null
  }

  const gpt = gptRepo()
  const text = event.message.text
  const result = {
    type: 'text',
    text: String(text).toLowerCase().startsWith('line:')
      ? String(text).substring(5)
      : await gpt.chatCompletion(text),
  }
  console.log('result=', result)

  return await client.replyMessage(event.replyToken, result)
}
