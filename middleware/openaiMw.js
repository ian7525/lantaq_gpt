import gptUtils from '../utils/gptUtils.js'

export default function openaiMw(req, res, next) {
  const openAIApiKey = res.locals.env.OPENAI_API_KEY
  if (!openAIApiKey) {
    res.status(500).json({ message: 'Permission Denied - OpenAI' })
  }

  res.locals = {
    ...res.locals,
    gpt: gptUtils(openAIApiKey),
  }

  next()
}
