import openai from "../lib/openai.js"

async function convertMsgFromCompletion(text) {
  const completion = await openai.createCOmpletion({
    model: "gpt-3.5-turbo",
    prompt: text,
    max_tokens: 1024,
  })

  console.log("message from completion=", completion)
  return completion.data.choices[0].text.trim()
}

export default async function messageHandler(client, event) {
  if (event.type !== "message" || event.message.type !== "text") {
    return null
  }

  const text = event.message.text

  const result = {
    type: "text",
    text:
      typeof text === String && toString(text).startsWith("line:")
        ? text
        : await convertMsgFromCompletion(text),
  }

  return await client.replyMessage(event.replyToken, result)
}
