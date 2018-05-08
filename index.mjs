// load config from .env
import dotenv from 'dotenv'
dotenv.config()

import Koa from 'koa'
import serve from 'koa-static'
import keepalive from 'koa-glitch-keepalive'
import schedule from 'node-schedule'
import parseArgs from 'minimist'
import runner from './src/runner'

// if the user runs with --now, then do a one-off run
// otherwise start a web server and run on a schedule
const args = parseArgs(process.argv.slice(2))
if (args.now) {
  runner.run()
} else {
  const app = new Koa()
  app.use(serve('output'))
  app.use(keepalive())
  app.use(async ctx => {
    ctx.body = 'Hey, hacker!'
  })
  app.listen(process.env.PORT || 8080)

  const sendHour = process.env.SEND_HOUR || 6

  schedule.scheduleJob(`0 ${sendHour} * * *`, runner.run)
}
