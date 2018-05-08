# hn-kindle

Create an eBook of the day's Hacker News articles and send it to your Kindle. Inspired by [eink.news](https://github.com/eink-news/eink.news/).

## Setup

This app uses [SendGrid](https://sendgrid.com/) to send created `.mobi` eBooks to the email address for your Kindle - you can get this from the settings on the device. You'll need to set up an account with them (don't worry, it's free).

Next create the file `.env` in the root of this repo, and put the following in it:

```sh
HN_COUNT=10       # how many articles to put in, defaults to 5
SEND_HOUR=6       # what hour of the day to send the email at
TZ=Europe/London  # what timezone is the above hour?
MAILTO=           # your Kindle's email address
MAILFROM=         # what address to send from - this will need to be approved in your Amazon settings
SENDGRID_API_KEY= # SendGrid API key you get when setting up
```

You can optionally omit the email settings and eBooks will still be created, you'll just need to copy them over manually instead. This app also serves books over http using Koa.

If you run the app with `--now`, it will run once and then quit. Useful if you just want some articles to read _right now_.
