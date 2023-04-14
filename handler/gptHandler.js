import { saveChat } from '../utils/chatHistoryUtils.js'

export default async function gptHandler(req, res) {
  const { text } = req.body

  const gpt = res.locals.gpt
  const result = await gpt.chatCompletion({ question: text })

  // save chat history
  saveChat({ userId: 'system', content: text, response: result })

  return res.status(200).json({ result })
}
