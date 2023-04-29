import express from 'express'

import mw from './middleware/index.js'
import handler from './handler/index.js'

const app = express()

app.use(mw.initMw)
app.use(mw.openAiMw)
app.use(mw.linebotMw)

app.get('/health', (req, res) => {
  res.status(200).send({ message: 'OK' })
})

app.get('/version', (req, res) => {
  res.status(200).send({ message: 'v1.1' })
})

const lineMw = (req, res, next) => {
  const linebot = res.locals.linebot
  linebot.lineMw(req, res, next)
}
app.post('/callback', lineMw, handler.messageHandler)

app.post('/callback-test', lineMw, async (req, res) => {
  const { linebot } = res.locals
  const { events } = req.body
  const client = linebot.lineClient

  console.log('req.headers=', req.headers)
  console.log('req.body=', JSON.stringify(req.body))

  for (const event of events) {
    const { message, replyToken } = event
    const result = {
      type: 'text',
      text: message.text,
    }
    const replyMsg = await client.replyMessage(replyToken, result)
    return res.json(replyMsg)
  }
})

app.post('/gpt', express.json(), handler.gptHandler)

app.post('/history', express.json(), handler.chatHistoryHandler)

// listen on port
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`listening on ${port}`)
})
