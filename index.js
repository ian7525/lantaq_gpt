import express from 'express'
import * as dotenv from 'dotenv'

import linebotLib from './lib/linebot.js'
import handler from './handler/index.js'

dotenv.config()
const app = express()
const linebot = linebotLib(process.env)

app.use(express.json())

app.get('/health', (_, res) => {
  res.status(200).send({ message: 'OK' })
})

app.post('/callback', linebot.lineMw, async (req, res) => {
  try {
    for (const event of req.body.events) {
      const result = await handler.messageHandler(linebot.lineClient, event)
      return res.json(result)
    }
  } catch (err) {
    const { message = 'Internal Server Error' } = err
    console.log(err)
    res.status(500).send({ message })
  }
})

app.post('/gpt', handler.gptHandler)

// listen on port
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`listening on ${port}`)
})
