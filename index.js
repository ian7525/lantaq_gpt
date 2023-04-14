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

const lineMw = (req, res, next) => {
  const linebot = res.locals.linebot
  linebot.lineMw(req, res, next)
}
app.post('/callback', lineMw, async (req, res) => {
  try {
    const gpt = res.locals.gpt
    const linebot = res.locals.linebot
    for (const event of req.body.events) {
      const result = await handler.messageHandler(
        gpt,
        linebot.lineClient,
        event
      )
      return res.json(result)
    }
  } catch (err) {
    const { message = 'Internal Server Error' } = err
    console.log(err)
    res.status(500).send({ message })
  }
})

app.post('/gpt', express.json(), handler.gptHandler)

app.post('/history', express.json(), handler.chatHistoryHandler)

// listen on port
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`listening on ${port}`)
})
