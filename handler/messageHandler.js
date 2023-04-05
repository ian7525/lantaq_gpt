export default async function messageHandler(client, event) {
  if (event.type !== "message" || event.message.type !== "text") {
    return null
  }

  const result = { type: "text", text: event.message.text }

  return await client.replyMessage(event.replyToken, result)
}
