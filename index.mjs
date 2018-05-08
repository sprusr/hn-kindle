import dotenv from 'dotenv'
dotenv.config()

import Koa from 'koa'
import serve from 'koa-static'
import keepalive from 'koa-glitch-keepalive'
import schedule from 'node-schedule'

import runner from './src/runner'

const app = new Koa()

app.use(serve('output'))
app.use(keepalive())
app.use(async ctx => {
  ctx.body = 'Hey, hacker!'
})
app.listen(process.env.PORT || 8080)

const sendHour = process.env.SEND_HOUR || 6

schedule.scheduleJob(`0 ${sendHour} * * *`, runner.run)
