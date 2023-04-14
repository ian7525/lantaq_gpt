import * as dotenv from 'dotenv'
dotenv.config()

export default function initMw(_, res, next) {
  res.locals = {}
  res.locals.env = process.env
  next()
}
