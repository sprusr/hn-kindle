import hn from 'node-hn-api'
import jsdom from 'jsdom'
import Readability from 'readability'

const { JSDOM } = jsdom

const fetch = async (num) => {
  num = num || 5

  const stories = await hn.fetchTopStories(num)

  let articles = []
  for (let story of stories) {
    if (story.url) {
      try {
        let dom = await JSDOM.fromURL(story.url, { pretendToBeVisual: true })
        let article = new Readability(dom.window.document).parse()
        articles.push(article)
      } catch (e) {
        console.error(`Could not parse '${story.title}': ${e}`)
      }
    }
  }

  return articles
}

export default {
  fetch
}
