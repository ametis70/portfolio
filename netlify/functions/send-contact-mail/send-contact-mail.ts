import { Handler } from '@netlify/functions'
import nodemailer from 'nodemailer'

const headers = {
  'access-control-allow-origin': 'http://localhost:8000',
}

export const handler: Handler = async ({ body }) => {
  if (!body) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Missing body' }),
      headers,
    }
  }

  const { name, email, subject, message } = JSON.parse(body)

  if (!name || !email || !subject || !message) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Missing fields' }),
      headers,
    }
  }

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  })

  try {
    await transporter.sendMail({
      from: `"Contact Form (${name})" <${process.env.MAIL_USER}>'`,
      to: process.env.MAIL_USER,
      replyTo: email,
      subject: subject,
      text: message,
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Success' }),
      headers,
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: e }),
      headers,
    }
  }
}
