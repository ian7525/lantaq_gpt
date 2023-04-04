import express from "express"
import * as dotenv from "dotenv"

dotenv.config()
const app = express()

app.get("/health", (req, res) => {
  res.status(200).send({ message: "OK" })
})

// listen on port
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`listening on ${port}`)
})
