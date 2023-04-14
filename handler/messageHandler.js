import { saveChat } from '../utils/chatHistoryUtils.js'

async function evtHandler(gpt, client, event) {
  const { type, message, source, replyToken } = event
  if (type !== 'message' || message.type !== 'text') {
    const err = { message: `Event type error:${event}` }
    throw err
  }

  console.log('Event source=', source)
  const userId = source.type === 'group' ? source.groupId : source.userId
  const content = message.text
  const result = {
    type: 'text',
    text: String(content).toLowerCase().startsWith('line:')
      ? String(content).substring(5)
      : await gpt.chatCompletion({ userId, question: content }),
  }
  console.log('Completion result=', result)

  // save chat history
  saveChat({ userId, content, response: result })

  return await client.replyMessage(replyToken, result)
}

export default async function messageHandler(req, res) {
  const { gpt, linebot } = res.locals
  const { events } = req.body

  try {
    for (const event of events) {
      const result = await evtHandler(gpt, linebot.lineClient, event)
      console.log('evtHandler result=', result)
      return res.json(result)
    }
  } catch (err) {
    const { message = 'Internal Server Error', statusCode = 500 } = err
    res.status(statusCode).json({ message })
  }
}
