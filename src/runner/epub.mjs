import fs from 'fs'
import Epub from 'epub-gen'
import moment from 'moment'

const make = async content => {
  const dir = './output/'
  const filename = `HN-${moment().format('YYYY-MM-DD')}.epub`

  let formattedContent = []
  for (let item of content) {
    formattedContent.push({
      title: item.title,
      data: item.content
    })
  }

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }

  await new Epub({
    title: `Hacker News Daily: ${moment().format('dddd, Do MMMM YYYY')}`,
    author: 'Various Authors',
    cover: './res/cover.png',
    tocTitle: 'Contents',
    content: formattedContent
  }, `${dir}${filename}`).promise

  return `${dir}${filename}`
}

export default {
  make
}
