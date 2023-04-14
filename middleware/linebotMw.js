import linebotLib from '../lib/linebot.js'

export default function linebotMw(req, res, next) {
  const env = res.locals.env
  const [accessToken, secret] = [env.CHANNEL_ACCESSTOKEN, env.CHANNEL_SECRET]
  if (!accessToken || !secret) {
    res.status(500).json({ message: 'Permission Denied - LineBot' })
  }

  res.locals = {
    ...res.locals,
    linebot: linebotLib({
      accessToken: env.CHANNEL_ACCESSTOKEN,
      secret: env.CHANNEL_SECRET,
    }),
  }
  next()
}
