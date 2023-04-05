async function convertMsgFromCompletion(openai, content) {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content }],
    max_tokens: 1024,
  })

  return completion.data.choices[0].message.content.trim()
}

export default async function messageHandler(client, openai, event) {
  if (event.type !== "message" || event.message.type !== "text") {
    return null
  }

  const text = event.message.text

  const result = {
    type: "text",
    text: String(text).toLowerCase().startsWith("line:")
      ? String(text).substring(5)
      : await convertMsgFromCompletion(openai, text),
  }

  return await client.replyMessage(event.replyToken, result)
}
