import express from "express"
import * as dotenv from "dotenv"

import linebotLib from "./lib/linebot.js"
import handler from "./handler/index.js"

dotenv.config()
const app = express()
const linebot = linebotLib(process.env)

app.get("/health", (_, res) => {
  res.status(200).send({ message: "OK" })
})

app.post("/callback", linebot.lineMw, async (req, res) => {
  console.log("header=", req.headers)
  console.log("body=", req.body)
  try {
    for (const event of req.body.events) {
      const result = await handler.messageHandler(linebot.lineClient, event)
      return res.status(200).send(result)
    }
  } catch (err) {
    console.log(err)
    const { message = "Internal Server Error" } = err
    res.status(500).send({ message })
  }
})

// listen on port
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`listening on ${port}`)
})
