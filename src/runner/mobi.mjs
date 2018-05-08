import fs from 'fs'
import kindlegen from 'kindlegen'
import moment from 'moment'

const make = async (epubPath) => {
  const dir = './output/'
  const filename = `HN-${moment().format('YYYY-MM-DD')}.mobi`

  const buf = await kgPromise(epubPath)
  await writeFilePromise(`${dir}${filename}`, buf)

  return `${dir}${filename}`
}

const kgPromise = (path) => {
  return new Promise((resolve, reject) => {
    kindlegen(fs.readFileSync(path), (error, mobi) => {
      if (error) {
        return reject(error)
      }
      return resolve(mobi)
    })
  })
}

const writeFilePromise = (path, buf) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, buf, err => {
      if(err) {
        return reject(err)
      }
      return resolve()
    })
  })
}

export default {
  make
}
