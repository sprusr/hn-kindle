import fs from 'fs'
import mime from 'mime'
import sgMail from '@sendgrid/mail'

const send = async (path) => {
  const { content, type } = await readBase64(path)

  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: process.env.MAILTO,
    from: process.env.MAILFROM,
    subject: 'Hacker News Daily',
    text: 'Please find the .mobi file attached.',
    attachments: [{
      content,
      filename: 'hn-daily.mobi',
      type: type,
      disposition: 'attachment',
      contentId: 'hn-daily.mobi'
    }]
  }
  sgMail.send(msg)
}

const readBase64 = async (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'base64'}, (err, data) => {
      if (err) {
        return reject(err)
      }
      const type = mime.getType(path)
      const content = data
      return resolve({
        content,
        type
      })
    })
  })
}

export default {
  send
}
