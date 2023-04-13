import { listChat } from '../utils/chatHistoryUtils.js'

export default async function chatHistoryHandler(req, res) {
  const { userId } = req.body

  const result = listChat(userId)
  return res.status(200).json({ result })
}
