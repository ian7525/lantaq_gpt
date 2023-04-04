import express from "express"
import * as dotenv from "dotenv"

import linebotLib from "./lib/linebot.js"

dotenv.config()
const app = express()

const linebot = linebotLib(process.env)

app.get("/health", (req, res) => {
  res.status(200).send({ message: "OK" })
})

app.post("/callback", linebot.lineMw, (req, res) => {
  console.log(req.body)
  Promise.all(req.body.events.map(handler))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err)
      res.status(500).end()
    })
})

function handler(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null)
  }

  const result = { type: "text", text: event.message.text }

  return linebot.lineClient.replyMessage(event.replyToken, result)
}

// listen on port
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`listening on ${port}`)
})
