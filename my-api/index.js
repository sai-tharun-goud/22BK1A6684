const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000

const logger = require('./middleware/logger')

app.use(cors())
app.use(express.json())
app.use(logger)

const shortLinks = new Map()

function generateShortcode(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < length; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return code
}

app.post('/shorten', (req, res) => {
  const { url, shortcode, validity } = req.body

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'URL must be a string' })
  }

  try {
    new URL(url)
  } catch (err) {
    return res.status(400).json({ error: 'Invalid URL format' })
  }

  let short = shortcode
  if (short) {
    if (!/^[a-zA-Z0-9]{4,10}$/.test(short)) {
      return res.status(400).json({ error: 'Shortcode must be alphanumeric and 4–10 characters' })
    }
    if (shortLinks.has(short)) {
      return res.status(400).json({ error: 'Shortcode already exists' })
    }
  } else {
    short = generateShortcode()
    while (shortLinks.has(short)) {
      short = generateShortcode()
    }
  }

  let minutes = parseInt(validity)
  if (!minutes || isNaN(minutes)) {
    minutes = 30
  }

  const expiresAt = Date.now() + minutes * 60 * 1000

  const linkData = {
    id: Date.now(),
    original: url,
    short: `http://localhost:5000/${short}`,
    expiry: expiresAt
  }

  shortLinks.set(short, linkData)

  req.customLog(`Created shortlink ${short} for ${url} (valid ${minutes} min)`)

  res.status(201).json(linkData)
})

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`)
})
