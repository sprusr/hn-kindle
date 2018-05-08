import epub from './epub'
import mobi from './mobi'
import mailer from './mailer'
import hn from '../modules/hn'

const run = async () => {
  let content = []
  content.push(...(await hn.fetch(process.env.HN_COUNT || 5)))

  const epubPath = await epub.make(content)
  const mobiPath = await mobi.make(epubPath)

  if (process.env.MAILTO) {
    await mailer.send(mobiPath)
  }

  return mobiPath
}

export default {
  run
}
