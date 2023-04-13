const chatHistories = {}

export function saveChat({ userId, content, response }) {
  if (!chatHistories[userId]) {
    chatHistories[userId] = []
  }
  chatHistories[userId].push({ content, response })
  return chatHistories[userId].length
}

export function getLatestChat(userId) {
  if (!chatHistories.hasOwnProperty(userId)) {
    return {}
  }
  return chatHistories[userId][chatHistories[userId].length - 1]
}

export function listChat(userId) {
  if (!chatHistories[userId]) {
    return []
  }
  return chatHistories[userId]
}
