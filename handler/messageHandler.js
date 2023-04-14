import { saveChat } from '../utils/chatHistoryUtils.js'

export default async function messageHandler(gpt, client, event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return null
  }

  console.log('event.source=', event.source)
  const { userId } = event.source

  const content = event.message.text
  const result = {
    type: 'text',
    text: String(content).toLowerCase().startsWith('line:')
      ? String(content).substring(5)
      : await gpt.chatCompletion({ userId, question: content }),
  }
  console.log('result=', result)

  // save chat history
  saveChat({ userId, content, response: result })

  return await client.replyMessage(event.replyToken, result)
}
